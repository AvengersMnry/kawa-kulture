<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Trouver mon coffee shop</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <p>Les cafés à Bordeaux</p>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
export default {
    name: 'CoffeesView',
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
  