<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Compteur de caféine</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <!-- <ion-toolbar>
          <ion-title size="large">Accueil</ion-title>
        </ion-toolbar> -->
      <h1>Combien de café bu aujourd'hui ☕️ ?</h1>
      <!-- <ExploreContainer name="Tab 1 page" /> -->
    </ion-content>
  </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
export default {
    name: 'Tab3Page',
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
  