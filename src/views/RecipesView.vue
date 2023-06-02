<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title type="ios">Idées recettes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <ion-segment value="meal" class="ion-margin-horizontal">
          <ion-segment-button value="meal" @click="setCurrentCategory('Meal')">
            <ion-label>Plat</ion-label>
          </ion-segment-button>
          <ion-segment-button
            value="dessert"
            @click="setCurrentCategory('Dessert')"
          >
            <ion-label>Dessert</ion-label>
          </ion-segment-button>
          <ion-segment-button
            value="drink"
            @click="setCurrentCategory('Drink')"
          >
            <ion-label>Boisson</ion-label>
          </ion-segment-button>
          <ion-segment-button value="all" @click="setCurrentCategory('All')">
            <ion-label>Toutes</ion-label>
          </ion-segment-button>
        </ion-segment>
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
import { heart } from "ionicons/icons";

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
ion-segment {
  --background: rgb(255, 144, 23, 0.5);
  width: 90%;
}
</style>
