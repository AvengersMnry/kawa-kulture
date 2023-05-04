<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Compteur de caféine</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>Combien de café bu aujourd'hui ☕️ ?</h1>
    </ion-content>
  </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
export default {
    name: 'CounterView',
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
  