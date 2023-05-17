import { createStore } from "vuex";
import router from "../router";
import { auth, db } from "../firebase";
import "firebase/firestore";
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
  arrayUnion,
  doc,
  setDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";

// Constantes pour les mutations
const SET_USER = "SET_USER";
const SET_USERNAME = "SET_USERNAME";
const CLEAR_USER = "CLEAR_USER";
const ADD_FAVORITE_RECIPE = "ADD_FAVORITE_RECIPE";
const RESET_PASSWORD_SUCCESS = "resetPasswordSuccess";

// Constantes pour les codes d'erreur
const ERROR_USER_NOT_FOUND = "auth/user-not-found";
const ERROR_WRONG_PASSWORD = "auth/wrong-password";
const ERROR_EMAIL_ALREADY_IN_USE = "auth/email-already-in-use";
const ERROR_INVALID_EMAIL = "auth/invalid-email";
const ERROR_OPERATION_NOT_ALLOWED = "auth/operation-not-allowed";
const ERROR_WEAK_PASSWORD = "auth/weak-password";

export default createStore({
  state: {
    user: {
      username: "",
      docId: null,
      uid: null,
      favoriteRecipes: [],
    },
  },

  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },

    [SET_USERNAME](state, username) {
      if (state.user) {
        state.user.username = username;
      } else {
        state.user = {
          username: username,
          uid: null,
          docId: null,
          favoriteRecipes: [],
        };
      }
      localStorage.setItem("username", username);
    },

    [CLEAR_USER](state) {
      state.user = {
        username: "",
        docId: null,
        uid: null,
        favoriteRecipes: [],
      };
    },

    [ADD_FAVORITE_RECIPE](state, recipeId) {
      state.user.favoriteRecipes.push(recipeId);
    },

    [RESET_PASSWORD_SUCCESS](state) {
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
          case ERROR_USER_NOT_FOUND:
            alert("User not found");
            break;
          case ERROR_WRONG_PASSWORD:
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
        commit(SET_USER, { ...state.user, uid });

        const userDocRef = collection(db, "users");
        // Create a query to filter documents by uid
        const querySnapshot = await getDocs(
          query(userDocRef, where("uid", "==", uid))
        );

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const docId = docSnap.id;
          const username = docSnap.data().username;

          console.log(docId + " & " + username);

          commit(SET_USERNAME, docSnap);
          commit(SET_USERNAME, username);
        } else {
          console.log("Aucun document ne correspond à la requête !");
        }
      } catch (err) {
        console.log(err);
      }

      commit(SET_USER, state.user);
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
        commit(SET_USER, { ...state.user, uid });

        const docRef = await addDoc(collection(db, "users"), {
          username: username,
        });

        await updateDoc(doc(db, "users", docRef.id), { uid: uid });
      } catch (error) {
        console.error("Error adding document: ", error);

        switch (error.code) {
          case ERROR_EMAIL_ALREADY_IN_USE:
            alert("Email already in use");
            break;
          case ERROR_INVALID_EMAIL:
            alert("Invalid email");
            break;
          case ERROR_OPERATION_NOT_ALLOWED:
            alert("Operation not allowed");
            break;
          case ERROR_WEAK_PASSWORD:
            alert("Weak password");
            break;
          default:
            alert("Something went wrong");
        }

        return;
      }
      commit(SET_USER, state.user);
      commit(SET_USERNAME, username);

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

    async addRecipeToFavorite({ commit, state }, recipeId) {
      const user = state.user;
      console.log(recipeId);

      if (user && user.docId) {
        const userDocRef = doc(db, "users", user.docId);
        try {
          const docSnapshot = await userDocRef.get();
          if (docSnapshot.exists() && docSnapshot.data().favoriteRecipes) {
            await updateDoc(userDocRef, {
              favoriteRecipes: arrayUnion(recipeId),
            });
          } else {
            await setDoc(
              userDocRef,
              {
                favoriteRecipes: [recipeId],
              },
              { merge: true }
            );
          }

          console.log("Recette ajoutée avec succès aux favoris !");
          commit(ADD_FAVORITE_RECIPE, recipeId);
        } catch (error) {
          console.error(
            "Erreur lors de l'ajout de la recette aux favoris :",
            error
          );
        }
      }
    },
  },

  getters: {
    getUsername: (state) => {
      return state.user ? state.user.username : null;
    },
  },
});
