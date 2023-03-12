<template>
  <div class="bg-img">
    <ion-content class="ion-margin-top">
      <img src="../assets/logos/white_logo_transparent_background.png" alt="Logo">
      <ion-text class="ion-margin" color="light">
        <h2>Une bonne journée commence avec un bon café</h2>
      </ion-text>
      <ion-row class="ion-margin ion-justify-content-center">
        <ion-button class="ion-margin" @click="goSignUpPage()">Je crée mon compte</ion-button>
        <ion-button class="ion-margin" @click="goLoginPage()">Je me connecte</ion-button>
      </ion-row>
    </ion-content>
  </div>
</template>

<script>
import router from '@/router';
import { IonButton, IonRow, IonContent, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LandingView',
  components: {
    IonButton,
    IonRow,
    IonContent,
    IonText,
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
  --background: #da7f2b;
  --background-hover: #41240b;
  color: #f5f5f5;
  width: 100%;
}

ion-content {
  --background: transparent;
}

ion-row {
  margin-top: 18rem;
}

ion-text {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
