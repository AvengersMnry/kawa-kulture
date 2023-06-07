<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button default-href="/tabs/tab4"></ion-back-button>
        </ion-buttons>
        <ion-title>Mes favorites</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list lines="none">
        <ion-item
          v-for="recipeDetails in favoriteRecipeDetails"
          :key="recipeDetails.id"
          class="ion-margin"
        >
          <ion-thumbnail>
            <img alt="Food image" :src="recipeDetails.image" />
          </ion-thumbnail>
          <ion-label>{{ recipeDetails.title }}</ion-label>
        </ion-item>
      </ion-list>
      <img
        src="../../assets/img/coffee_bean.webp"
        alt="Illustration of coffee bean"
        class="illustration"
      />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import recipesData from "../../recipes.json";

export default defineComponent({
  name: "FavoriteRecipeView",
  mounted() {
    this.$store.dispatch("fetchFavoriteRecipes");
  },
  components: {},
  setup() {
    const store = useStore();
    const favoriteRecipes = computed(() => {
      return store.state.user.favoriteRecipes;
    });

    const getRecipeDetails = (recipeId) => {
      const recipe = recipesData.find((r) => r.id === recipeId);
      if (recipe) {
        return {
          title: recipe.title,
          description: recipe.description,
          image: recipe.image,
        };
      }
      return null;
    };

    const favoriteRecipeDetails = computed(() => {
      return favoriteRecipes.value.map((recipeId) =>
        getRecipeDetails(recipeId)
      );
    });

    return {
      favoriteRecipes,
      favoriteRecipeDetails,
    };
  },
});
</script>

<style>
.illustration {
  position: fixed;
  bottom: 0;
  z-index: 1;
}
ion-list {
  z-index: 999;
  position: relative;
}
.list-ios {
  background: transparent;
}
</style>
