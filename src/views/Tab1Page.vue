<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Mes recettes</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <p>Le café s'invite en cuisine</p>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
export default {
    name: 'Tab1Page',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
    },
    setup() {
    }
}
  </script>
  