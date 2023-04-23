<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title type="ios">Mes recettes</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-button :fill="currentCategory === 'All' ? 'outline' : 'clear'" @click="updateCategory('All')" :color="currentCategory === 'All' ? 'primary' : 'medium'">Toutes</ion-button>
          <ion-button :fill="currentCategory === 'Dessert' ? 'outline' : 'clear'" @click="updateCategory('Dessert')" :color="currentCategory === 'Dessert' ? 'primary' : 'medium'">Dessert</ion-button>
          <ion-button :fill="currentCategory === 'Drink' ? 'outline' : 'clear'" @click="updateCategory('Drink')" :color="currentCategory === 'Drink' ? 'primary' : 'medium'">Boisson</ion-button>
          <ion-button :fill="currentCategory === 'Meal' ? 'outline' : 'clear'" @click="updateCategory('Meal')" :color="currentCategory === 'Meal' ? 'primary' : 'medium'">Plat</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-card :button="true" v-for="receipe in getFilteredReceipes()" :key="receipe.id">
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButtons, IonButton } from '@ionic/vue';
import { ref } from 'vue'
import receipesData from '../receipes.json'

export default {
  name: 'ReceipesView',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButtons,
    IonButton,
  },
  setup() {
    const receipes = ref(receipesData)
    
    const currentCategory = ref('All')
    
    const updateCategory = (category) => {
      currentCategory.value = category
    }
    
    const getFilteredReceipes = () => {
      if (currentCategory.value === 'All') {
        return receipes.value
      } else {
        return receipes.value.filter(receipe => receipe.categories.includes(currentCategory.value))
      }
    }
    
    const getCategories = () => {
      const categories = new Set()
      receipes.value.forEach(receipe => {
        receipe.categories.forEach(category => {
          categories.add(category)
        })
      })
      return Array.from(categories)
    }
    return {
      receipes,
      currentCategory,
      updateCategory,
      getFilteredReceipes,
      getCategories
    }
  }
};
</script>