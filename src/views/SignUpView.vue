<template>
  <ion-page>
    <ion-content class="bg-orange">
      <img src="../../public/img/arabica.png" alt="Branche de caféier" />
      <ion-button
        fill="outline"
        shape="round"
        color="light"
        class="back-arrow"
        @click="$router.back()"
        ><i class="fa-solid fa-chevron-left"></i
      ></ion-button>
      <h1>Bienvenue sur <strong>Kawa !</strong></h1>
      <h2>Commençons votre inscription</h2>

      <form class="ion-margin" method="post" @submit.prevent="register">
        <ion-item class="ion-margin">
          <ion-label position="stacked">Prénom</ion-label>
          <ion-input
            required
            :clear-input="true"
            placeholder="George"
            v-model="handleRegistration.username"
          ></ion-input>
        </ion-item>
        <br />
        
        <ion-item class="ion-margin">
          <ion-label position="stacked">Email</ion-label>
          <ion-input
            required
            :clear-input="true"
            placeholder="john.doe@email.com"
            type="email"
            v-model="handleRegistration.email"
          ></ion-input>
        </ion-item>
        <br />

        <ion-item class="ion-margin">
          <ion-label position="stacked">Mot de passe</ion-label>
          <ion-input
            required
            :clear-input="true"
            type="password"
            placeholder="Mot de passe"
            v-model="handleRegistration.password"
          ></ion-input>
        </ion-item>
        <br />

        <ion-item class="transparent">
          <ion-checkbox
            v-model="handleRegistration.accepted_terms"
          ></ion-checkbox>
          <ion-label
            >J'accepte les <a class="linkTerms" href="/terms">CGU</a></ion-label
          >
        </ion-item>
        <br />

        <ion-button
          class="ion-margin"
          type="submit"
          :disabled="!handleRegistration.accepted_terms"
          >Créer mon compte</ion-button
        >
      </form>
      <p>J'ai déjà un compte ! <a href="/login">Connexion</a></p>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "SignupView",
  components: {},
  setup() {
    const store = useStore();

    const handleRegistration = ref({
      accepted_terms: false,
      remember_me: false,
    });

    const register = () => {
      store.dispatch("register", handleRegistration.value);
    };

    return {
      handleRegistration,
      register,
    };
  },
});
</script>

<style scoped>
ion-item {
  width: 75%;
  margin: 0 auto;
  border-radius: 10px;
}

img {
  width: 70%;
  display: flex;
  margin: auto;
}

h1,
h2 {
  color: white;
  margin: 1rem 0;
}

a {
  color: #ffffff;
}

.linkTerms {
  color: #436a31;
}

ion-checkbox {
  --size: 25px;
  --background-checked: #436a31;
  margin-right: 6px;
}

ion-checkbox::part(container) {
  border-radius: 10px;
  border: 2px solid #436a31;
}

ion-button {
  --background: #436a31;
}
</style>
