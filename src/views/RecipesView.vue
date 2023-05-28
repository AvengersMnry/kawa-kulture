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
            :color="currentCategory === 'Meal' ? 'base' : 'medium'"
            >Plat</ion-button
          >
          <ion-button
            :fill="currentCategory === 'Dessert' ? 'outline' : 'clear'"
            @click="setCurrentCategory('Dessert')"
            :color="currentCategory === 'Dessert' ? 'base' : 'medium'"
            >Dessert</ion-button
          >
          <ion-button
            :fill="currentCategory === 'Drink' ? 'outline' : 'clear'"
            @click="setCurrentCategory('Drink')"
            :color="currentCategory === 'Drink' ? 'base' : 'medium'"
            >Boisson</ion-button
          >
          <ion-button
            :fill="currentCategory === 'All' ? 'outline' : 'clear'"
            @click="setCurrentCategory('All')"
            :color="currentCategory === 'All' ? 'base' : 'medium'"
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
          <ion-button
            fill="outline"
            color="base"
            @click="toggleFavorite(recipe)"
          >
            <ion-icon :icon="heart"></ion-icon>
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import recipesData from "../recipes.json";
import { heartOutline, heart } from "ionicons/icons";

export default {
  name: "RecipesView",
  components: {},
  setup() {
    const store = useStore();
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

    const toggleFavorite = (recipe) => {
      store.dispatch("toggleRecipeToFavorite", recipe);
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
      toggleFavorite,
      getFilteredRecipes,
      getCategories,
      heartOutline,
      heart,
    };
  },
};
</script>

<style scoped>
:root {
  --ion-color-base: #ff9017;
}

.ion-color-base {
  --ion-color-base: var(--ion-color-base);
}

.recipe-img {
  min-width: 100%;
  max-height: 300px;
  object-fit: cover;
}
ion-button {
  color: #ff9017;
}
</style>
