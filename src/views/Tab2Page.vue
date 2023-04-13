<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Trouver mon coffee shop</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
          <!-- <ion-toolbar>
            <ion-title size="large">Accueil</ion-title>
          </ion-toolbar> -->
        <p>Les cafés à Bordeaux</p>
        <!-- <ExploreContainer name="Tab 1 page" /> -->
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
export default {
    name: 'Tab2Page',
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
  