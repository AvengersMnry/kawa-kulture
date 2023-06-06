import { createStore } from "vuex";
import router from "../router";
import { auth, db } from "../firebase/firebaseConfig";
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
  doc,
  where,
  query,
  getDocs,
} from "firebase/firestore";

// Constants for Mutations
const SET_USER = "SET_USER";
const SET_USERNAME = "SET_USERNAME";
const CLEAR_USER = "CLEAR_USER";
const ADD_FAVORITE_RECIPE = "ADD_FAVORITE_RECIPE";
const REMOVE_RECIPE_TO_FAVORITE = "REMOVE_RECIPE_TO_FAVORITE";
const RESET_PASSWORD_SUCCESS = "resetPasswordSuccess";
const ADD_RECIPE_SUCCESS = "ADD_RECIPE_SUCCESS";
const ADD_RECIPE_FAILURE = "ADD_RECIPE_FAILURE";

// Constants for error codes
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
    addRecipeStatus: null,
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

    [ADD_FAVORITE_RECIPE](state, recipe) {
      state.user.favoriteRecipes.push(recipe.id);
    },

    updateRecipeFavoriteStatus(state, { recipeId, isFavorite }) {
      const favoriteRecipesFound = state.user.favoriteRecipes;

      for (let i = 0; i < favoriteRecipesFound.length; i++) {
        const recipe = favoriteRecipesFound[i];
        if (recipe && recipe.id === recipeId) {
          recipe.isFavorite = isFavorite;
          break;
        }
      }
    },

    [REMOVE_RECIPE_TO_FAVORITE](state, recipe) {
      const index = state.user.favoriteRecipes.findIndex(
        (r) => r === recipe.id
      );
      if (index !== -1) {
        state.user.favoriteRecipes.splice(index, 1);
      }
    },

    [ADD_RECIPE_SUCCESS](state) {
      state.addRecipeStatus = "success";
    },

    [ADD_RECIPE_FAILURE](state) {
      state.addRecipeStatus = "failure";
    },

    [RESET_PASSWORD_SUCCESS](state) {
      state.passwordResetSuccess = true;
      state.resetPasswordError = null;
    },
  },

  actions: {
    async login({ commit, state, dispatch }, details) {
      const { email, password } = details;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case ERROR_USER_NOT_FOUND:
            alert("Uitilisateur inconnu");
            break;
          case ERROR_WRONG_PASSWORD:
            alert("Oops ! Mot de passe incorrect");
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

        // Call action to retrieve favorite recipes
        await dispatch("fetchFavoriteRecipes");

        const userDocRef = collection(db, "users");
        // Create a query to filter documents by uid
        const querySnapshot = await getDocs(
          query(userDocRef, where("uid", "==", uid))
        );

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          // const docId = docSnap.id;
          const username = docSnap.data().username;

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
          // Adding the empty table
          favoriteRecipes: [],
        });

        await updateDoc(doc(db, "users", docRef.id), { uid: uid });
      } catch (error) {
        console.error("Error adding document: ", error);

        switch (error.code) {
          case ERROR_EMAIL_ALREADY_IN_USE:
            alert("Email déjà utilisé. Connectez-vous");
            break;
          case ERROR_INVALID_EMAIL:
            alert("Email invalide");
            break;
          case ERROR_OPERATION_NOT_ALLOWED:
            alert("Operation not allowed");
            break;
          case ERROR_WEAK_PASSWORD:
            alert("Mot de passe trop simple");
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

    async toggleRecipeToFavorite({ commit, state }, recipe) {
      const user = state.user;

      if (user) {
        const userDocRef = collection(db, "users");
        const querySnapshot = await getDocs(
          query(userDocRef, where("uid", "==", auth.currentUser.uid))
        );

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const docId = docSnap.id;

          try {
            const favoriteRecipes = docSnap.data().favoriteRecipes || [];
            if (!favoriteRecipes.includes(recipe.id)) {
              favoriteRecipes.push(recipe.id);
              await updateDoc(doc(db, "users", docId), {
                favoriteRecipes: favoriteRecipes,
              });
              alert("Ajoutée aux favoris ✅");
              commit(ADD_RECIPE_SUCCESS);
              commit(ADD_FAVORITE_RECIPE, recipe.id);
              commit("updateRecipeFavoriteStatus", {
                recipeId: recipe.id,
                isFavorite: true,
              });
            } else {
              const index = favoriteRecipes.indexOf(recipe.id);
              if (index !== -1) {
                alert("Retiré des favoris  ❌");
                favoriteRecipes.splice(index, 1);
                await updateDoc(doc(db, "users", docId), {
                  favoriteRecipes: favoriteRecipes,
                });
                commit(ADD_RECIPE_SUCCESS);
                commit(REMOVE_RECIPE_TO_FAVORITE, recipe.id);
                commit("updateRecipeFavoriteStatus", {
                  recipeId: recipe.id,
                  isFavorite: false,
                });
              }
            }
          } catch (error) {
            console.error(
              "Erreur lors de l'ajout de la recette aux favoris :",
              error
            );
            commit(ADD_RECIPE_FAILURE);
          }
        } else {
          console.log("Aucun document ne correspond à la requête !");
        }
      }
    },

    async fetchFavoriteRecipes({ commit, state }) {
      const user = state.user;

      if (user) {
        const userDocRef = collection(db, "users");
        const querySnapshot = await getDocs(
          query(userDocRef, where("uid", "==", auth.currentUser.uid))
        );

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          // const docId = docSnap.id;

          const favoriteRecipes = docSnap.data().favoriteRecipes || [];

          // Assign favorite recipes to user status
          commit(SET_USER, { ...user, favoriteRecipes });
        } else {
          console.log("Aucun document ne correspond à la requête !");
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
