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
        <ion-button class="ion-margin btn" type="submit">Se connecter</ion-button>
      </form>
      <p class="ion-margin">Pas encore inscrit ? <a href="/signup">Inscription</a></p>
      <ion-button class="ion-margin btn" @click="openModal">Mot de passe oublié ?</ion-button>
      
      <!-- Modal for reset password -->
      <ion-modal class="" :is-open="showModal" @dismiss="showModal.valueOf = false">
        <ion-header>
          <ion-toolbar>
            <ion-title>Réinitialiser</ion-title>
            <ion-buttons>
              <ion-button @click="showModal = false">Fermer</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p class="ion-margin">
            Entrez l'adresse e-mail associée à votre compte.
          </p>
          <ion-item class="ion-margin">
            <ion-input :clear-input="true" label="Adresse email" fill="outline" placeholder="example@domain.com" type="email" name="email" v-model="handleConnexion.email"></ion-input>
          </ion-item>
          <ion-button class="ion-margin btn" id="sendSuccess" @click="resetPassword(handleConnexion.email)">Envoyer un e-mail de réinitialisation</ion-button>
          <ion-toast :is-open="showToast" duration="4000" message="Un email contenant un lien a été envoyé." position="top" color="dark"></ion-toast>
        </ion-content>
      </ion-modal>
      
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { IonPage, IonInput, IonItem, IonLabel, IonButton, IonContent, IonModal, IonToolbar, IonHeader, IonTitle, IonButtons, IonToast } from '@ionic/vue';

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
    IonHeader,
    IonTitle,
    IonButtons,
    IonToast
  },
  setup() {
    const store = useStore();

    const handleConnexion = ref({});
    const showModal = ref(false);
    const showToast = ref(false);
    const modalTimeout = ref(null);
    
    const login = () => {
      store.dispatch('login', handleConnexion.value)
    }
    
    const openModal = () => {
      showModal.value = true;
    }
    
    const resetPassword = () => {
      store.dispatch('resetPassword', handleConnexion.value.email)
        .then(() => {
          showToast.value = true;
          modalTimeout.value = setTimeout(() => {
            showModal.value = false;
          }, 4000);
        })
        .catch(error => {
          alert(error)
        })
    }
    
    const closeModal = () => {
      clearTimeout(modalTimeout.value);
      showModal.value = false;
    }

    return {
      handleConnexion,
      login,
      resetPassword,
      showModal,
      openModal,
      closeModal,
      showToast,
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

.btn {
  --background: #436a31;
}
</style>
