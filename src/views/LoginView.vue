<template>
  <ion-page>
    <ion-content class="bg-orange">
      <img src="../../public/img/arabica.png" alt="Branche de caféier">
      <ion-button fill="outline" shape="round" color="light" class="back-arrow" @click="$router.back()">
        <i class="fa-solid fa-chevron-left"></i>
      </ion-button>
      <h1>Ravi de vous revoir</h1>
      <h2>Un café ? ☕️</h2>
      
      <form class="ion-margin" method="post" @submit.prevent="login">
        <ion-item class="ion-margin">
          <ion-label position="stacked">Email</ion-label>
          <ion-input :clear-input="true" placeholder="john.doe@exemple.com" type="email" name="email" v-model="handleConnexion.email"></ion-input>
        </ion-item>
        <br>
        <ion-item class="ion-margin">
          <ion-label position="stacked">Mot de passe</ion-label>
          <ion-input :clear-input="true" placeholder="Mot de passe" type="password" name="password" v-model="handleConnexion.password"></ion-input>
        </ion-item>
        <br>
        <ion-button class="ion-margin" type="submit">Se connecter</ion-button>
      </form>
      <p class="ion-margin">Pas encore inscrit ? <a href="/signup">Inscription</a></p>
      <ion-button class="ion-margin" @click="openModal">Mot de passe oublié ?</ion-button>
      
      <!-- Modal open when the user click on button for his reset password -->
      <ion-modal class="ion-margin ion-padding" :is-open="showModal" @dismiss="showModal.valueOf = false">
        <ion-header>
          <ion-toolbar>
            <ion-button @click="showModal = false">
              <ion-icon name="close-outline"></ion-icon>
            </ion-button>
            <ion-title>Réinitialiser</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <ion-item class="ion-margin">
            <ion-label position="stacked">Adresse email</ion-label>
            <ion-input :clear-input="true" placeholder="example@domain.com" type="email" name="email" v-model="handleConnexion.email"></ion-input>
          </ion-item>
          <ion-button class="ion-margin" @click="sendPasswordResetEmail(handleConnexion.email)">Envoyer un e-mail de réinitialisation</ion-button>
        </ion-content>
      </ion-modal>
      
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { IonPage, IonInput, IonItem, IonLabel, IonButton, IonContent, IonModal, IonToolbar, IonIcon, IonHeader, IonTitle } from '@ionic/vue';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default defineComponent ({
  name: 'LoginView',
  components: {
    IonPage,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonContent,
    IonModal,
    IonToolbar,
    IonIcon,
    IonHeader,
    IonTitle,
  },
  setup() {
    const auth = getAuth();
    const store = useStore()

    const handleConnexion = ref({})
    const showModal = ref(false);
    
    const login = () => {
      store.dispatch('login', handleConnexion.value)
    }
    
    const openModal = () => {
      showModal.value = true;
    }
    
    const sendResetPasswordEmail = (email) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log('success');
        })
        .catch((error) => {
          alert(error);
        });
    }

    return {
      handleConnexion,
      login,
      sendResetPasswordEmail,
      showModal,
      openModal,
    }
  }
})
</script>

<style scoped>
.transparent {
  --background: transparent;
}

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

ion-button {
  --background: #436a31;
}
</style>
