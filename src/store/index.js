import { createStore } from "vuex";
import router from "../router";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  where,
  query,
  getDocs,
} from "firebase/firestore";

export default createStore({
  state: {
    user: {
      username: "",
      docId: null,
    },
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    SET_USERNAME(state, username) {
      if (state.user) {
        state.user.username = username;
      } else {
        state.user = {
          username: username,
          docId: null,
        };
      }
      localStorage.setItem("username", username);
    },

    CLEAR_USER(state) {
      state.user = null;
    },

    resetPasswordSuccess(state) {
      state.passwordResetSuccess = true;
      state.resetPasswordError = null;
    },
  },
  actions: {
    async login({ commit, state }, details) {
      const { email, password } = details;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;
          default:
            alert("Something went wrong");
        }
        return;
      }
      try {
        // Retrieve User ID
        const uid = auth.currentUser.uid;

        // Retrieve the user's docId
        const userDocRef = collection(db, "users");

        // Create a query to filter documents by uid
        const querySnapshot = await getDocs(
          query(userDocRef, where("uid", "==", uid))
        );

        if (!querySnapshot.empty) {
          // Retrieve the username of the first matching document
          const docSnap = querySnapshot.docs[0].data().username;
          commit("SET_USERNAME", docSnap);
          if (state.user) {
            // Add this line to update the state with the retrieved username
            state.user.username = docSnap;
          }
        } else {
          console.log("Aucun document ne correspond à la requête!");
        }
      } catch (err) {
        console.log(err);
      }

      // Update user status in store
      commit("SET_USER", state.user);
      router.push("/tabs/tab4");
    },

    async register({ commit, state }, details) {
      const { email, password, username } = details;
      let uid;

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        uid = userCredential.user.uid;

        // Register username in Firestore
        const docRef = await addDoc(collection(db, "users"), {
          username: username,
        });
        console.log("Document written with ID: ", docRef.id);

        // Update Firestore Document with Firebase Auth User ID
        await updateDoc(doc(db, "users", docRef.id), { uid: uid });
      } catch (error) {
        console.error("Error adding document: ", error);

        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          default:
            alert("Something went wrong");
        }

        return;
      }

      // Update user status in store
      commit("SET_USER", state.user);
      commit("SET_USERNAME", username);

      router.push("/tabs/tab4");
    },

    init({ commit }) {
      const username = localStorage.getItem("username");
      if (username) {
        commit("SET_USERNAME", username);
      }
    },

    async resetPassword({ commit }, email) {
      try {
        await sendPasswordResetEmail(auth, email);
        commit("resetPasswordSuccess");
      } catch (error) {
        commit("resetPasswordFailure", error);
        throw error;
      }
    },

    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");
      router.push("/login");
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);

          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
  getters: {
    getUsername: (state) => {
      return state.user ? state.user.username : null;
    },
  },
});
