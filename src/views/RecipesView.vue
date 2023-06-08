<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="ion-text-center">Idées recettes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-segment value="meal">
        <ion-segment-button value="drink" @click="setCurrentCategory('Drink')">
          <ion-label>Boisson</ion-label>
        </ion-segment-button>
        <ion-segment-button value="meal" @click="setCurrentCategory('Meal')">
          <ion-label>Plat</ion-label>
        </ion-segment-button>
        <ion-segment-button
          value="dessert"
          @click="setCurrentCategory('Dessert')"
        >
          <ion-label>Dessert</ion-label>
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
import { toastController } from "@ionic/vue";

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

    const toggleFavorite = async (recipe) => {
      try {
        const result = await store.dispatch("toggleRecipeToFavorite", recipe);

        const message =
          result === "added"
            ? "Recette ajoutée aux favoris ✅"
            : "Recette retirée des favoris ☑️";
        const color = result === "added" ? "success" : "danger";

        const toast = await toastController.create({
          message: message,
          duration: 2500,
          position: "middle",
          color: color,
        });

        await toast.present();
      } catch (error) {
        console.error("Erreur lors de la gestion des favoris :", error);

        const toast = await toastController.create({
          message: "Une erreur s'est produite",
          duration: 2500,
          position: "middle",
          color: "danger",
        });

        await toast.present();
      }
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
ion-card {
  width: 90%;
  margin: 10px auto;
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
  /* width: 90%; */
  margin: 10px auto;
  justify-content: flex-start;
}
</style>
