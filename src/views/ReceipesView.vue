<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title type="ios">Mes recettes</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-card :button="true" v-for="receipe in receipes" :key="receipe.id">
        <img alt="Receipe's image" :src=receipe.image />
        <ion-card-header>
          <ion-card-title>{{ receipe.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>{{ receipe.description }}</ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/vue';
import { ref } from 'vue'
import receipesData from '../receipes.json'

export default {
  name: 'RecipesView',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
  },
  setup() {
    const receipes = ref(receipesData)
    
    return {
      receipes
    }
  }
};
</script>