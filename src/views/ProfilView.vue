<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mon profil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-row class="ion-justify-content-center">
      <ion-avatar class="">
        <img alt="Silhouette of a person's head" src="../assets/jebena.png" />
      </ion-avatar>
      </ion-row>
      <p>{{ username }}</p>
      <br />
      <ion-list :inset="true">
        <ion-item>
          <ion-label>Modifier mon profil</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>3 recettes favoris</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>4 Coffees Shop</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Mentions légales</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>contact@kawa-kulture.com</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-button class="ion-margin" @click="logout()">Me déconnecter</ion-button>
  </ion-page>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useStore, mapGetters } from "vuex";
import { toastController } from "@ionic/vue";

export default defineComponent({
  name: "ProfilView",
  components: {},
  computed: {
    ...mapGetters(["getUsername"]),
    username() {
      return this.getUsername;
    },
    user() {
      return this.$store.state.user;
    },
  },
  setup() {
    const store = useStore();
    const state = reactive({
      defaultImageUrl: "../assets/jebena.png",
    });

    const presentToast = async (position) => {
      const toast = await toastController.create({
        message: "Tu es bien déconnecté(e)",
        duration: 1500,
        position,
      });

      await toast.present();
    };

    const logout = () => {
      presentToast("top");
      store.dispatch("logout");
    };

    const onFileSelected = (event) => {
      state.selectedFile = event.target.files[0];
    };

    return {
      logout,
      presentToast,
      state,
      onFileSelected,
      userProfileImageUrl: state.userProfileImageUrl,
      defaultImageUrl: state.defaultImageUrl,
    };
  },
});
</script>

<style>
ion-avatar {
  border: 1px solid orange;
  width: 6em;
  height: 6em;
}
ion-button {
  --background: #da7f2b;
  color: #f5f5f5;
  font-weight: 500;
  font-size: 1.1em;
}
</style>
