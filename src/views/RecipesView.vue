<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title type="ios">Idées recettes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-toolbar>
        <ion-buttons class="ion-justify-content-center">
          <ion-button
            :fill="currentCategory === 'Meal' ? 'outline' : 'clear'"
            @click="setCurrentCategory('Meal')"
            :color="currentCategory === 'Meal' ? 'favorite' : 'medium'"
            >Plat</ion-button
          >
          <ion-button
            :fill="currentCategory === 'Dessert' ? 'outline' : 'clear'"
            @click="setCurrentCategory('Dessert')"
            :color="currentCategory === 'Dessert' ? 'favorite' : 'medium'"
            >Dessert</ion-button
          >
          <ion-button
            :fill="currentCategory === 'Drink' ? 'outline' : 'clear'"
            @click="setCurrentCategory('Drink')"
            :color="currentCategory === 'Drink' ? 'favorite' : 'medium'"
            >Boisson</ion-button
          >
          <ion-button
            :fill="currentCategory === 'All' ? 'outline' : 'clear'"
            @click="setCurrentCategory('All')"
            :color="currentCategory === 'All' ? 'favorite' : 'medium'"
            >Toutes</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
      <ion-card
        :button="true"
        v-for="recipe in getFilteredRecipes"
        :key="recipe.id"
      >
        <img class="recipe-img" alt="Recipe's image" :src="recipe.image" />
        <ion-card-header class="ion-padding ion-text-center">
          <ion-card-title>{{ recipe.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-padding ion-text-center">
          <ion-text>{{ recipe.description }}</ion-text>
          <br />
          <ion-button fill="outline" color="favorite">
            <ion-icon :icon="heartOutline"></ion-icon>
            <ion-text>+</ion-text>
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script>
import { ref, computed } from "vue";
import recipesData from "../recipes.json";
import { heartOutline } from "ionicons/icons";

export default {
  name: "RecipesView",
  components: {},
  setup() {
    const allRecipes = ref(recipesData);

    const currentCategory = ref("Meal");

    const getFilteredRecipes = computed(() => {
      let filteredRecipes = allRecipes.value;

      if (currentCategory.value !== "All") {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe.categories.includes(currentCategory.value)
        );
      }

      filteredRecipes.sort(() => Math.random() - 0.5);
      return filteredRecipes;
    });

    const setCurrentCategory = (category) => {
      currentCategory.value = category;
    };

    const getCategories = () => {
      const categories = new Set();
      allRecipes.value.forEach((recipe) => {
        recipe.categories.forEach((category) => {
          categories.add(category);
        });
      });
      return Array.from(categories);
    };
    return {
      allRecipes,
      currentCategory,
      setCurrentCategory,
      getFilteredRecipes,
      getCategories,
      heartOutline,
    };
  },
};
</script>

<style scoped>
.recipe-img {
  min-width: 100%;
  max-height: 300px;
  object-fit: cover;
}
</style>
