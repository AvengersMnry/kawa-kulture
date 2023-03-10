<template>
  <ion-content class="ion-margin-top">
    <img src="../assets/logos/logo_transparent_background.png" alt="Logo">
    <ion-row class="ion-margin ion-justify-content-center">
      <ion-button class="ion-margin" @click="goSignUpPage()">Je crée mon compte</ion-button>
      <ion-button class="ion-margin" @click="goLoginPage()">Je me connecte</ion-button>
    </ion-row>
  </ion-content>
</template>

<script>
import router from '@/router';
import { IonButton, IonRow, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LandingView',
  components: {
    IonButton,
    IonRow,
    IonContent,
  },
  setup() {
    function goLoginPage() {
      router.push('/login')
    }

    function goSignUpPage() {
      router.push('/signup')
    }

    return {
      goLoginPage,
      goSignUpPage,
    }
  }
})
</script>

<style scoped>
img {
  margin-top: 2rem;
}

ion-button {
  --background: #c27b3a;
  --background-hover: #41240b;
  color: #f5f5f5;
  width: 100%;
}
</style>
