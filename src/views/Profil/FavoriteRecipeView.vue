<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button default-href="/tabs/tab4"></ion-back-button>
        </ion-buttons>
        <ion-title>Mes recette favorites</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>Hello world</h1>
      <ul>
        <li>Recettes :</li>
        <li v-for="recipeId in favoriteRecipes" :key="recipeId">
          {{ recipeId }}
        </li>
      </ul>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from 'vuex';

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

    return {
      favoriteRecipes,
    };
  },
});
</script>
