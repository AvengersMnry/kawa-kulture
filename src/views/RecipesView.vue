<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title type="ios">Mes recettes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-toolbar>
        <ion-buttons class="ion-justify-content-center">
          <ion-button
            :fill="currentCategory === 'All' ? 'outline' : 'clear'"
            @click="setCurrentCategory('All')"
            :color="currentCategory === 'All' ? 'primary' : 'medium'"
            >Toutes</ion-button
          >
          <ion-button
            :fill="currentCategory === 'Dessert' ? 'outline' : 'clear'"
            @click="setCurrentCategory('Dessert')"
            :color="currentCategory === 'Dessert' ? 'primary' : 'medium'"
            >Dessert</ion-button
          >
          <ion-button
            :fill="currentCategory === 'Drink' ? 'outline' : 'clear'"
            @click="setCurrentCategory('Drink')"
            :color="currentCategory === 'Drink' ? 'primary' : 'medium'"
            >Boisson</ion-button
          >
          <ion-button
            :fill="currentCategory === 'Meal' ? 'outline' : 'clear'"
            @click="setCurrentCategory('Meal')"
            :color="currentCategory === 'Meal' ? 'primary' : 'medium'"
            >Plat</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
      <ion-card
        class="recipe-card"
        :button="true"
        v-for="recipe in getFilteredRecipes(recipes)"
        :key="recipe.id"
      >
        <img class="recipe-img" alt="Recipe's image" :src="recipe.image" />
        <ion-card-header>
          <ion-card-title>{{ recipe.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>{{ recipe.description }}</ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script>
import { ref } from "vue";
import recipesData from "../recipes.json";

export default {
  name: "RecipesView",
  components: {},
  setup() {
    const recipes = ref(recipesData);

    const currentCategory = ref("All");

    const setCurrentCategory = (category) => {
      currentCategory.value = category;
    };

    const getFilteredRecipes = (recipes) => {
      if (currentCategory.value === "All") {
        return recipes;
      } else {
        return recipes.filter((recipe) =>
          recipe.categories.includes(currentCategory.value)
        );
      }
    };

    const getCategories = () => {
      const categories = new Set();
      recipes.value.forEach((recipe) => {
        recipe.categories.forEach((category) => {
          categories.add(category);
        });
      });
      return Array.from(categories);
    };
    return {
      recipes,
      currentCategory,
      setCurrentCategory,
      getFilteredRecipes,
      getCategories,
    };
  },
};
</script>

<style>
.recipe-card {
  max-width: 350px;
  height: 300px; /* Hauteur fixe pour toutes les images */
}

.recipe-img {
  max-width: 50%;
  height: 100%;
  /* object-fit: cover; Permet de redimensionner l'image pour qu'elle remplisse la hauteur et la largeur de son conteneur */
}
</style>
