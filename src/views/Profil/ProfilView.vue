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
          <img alt="Profil picture" src="../../assets/jebena.png" />
        </ion-avatar>
      </ion-row>
      <ion-row class="ion-justify-content-center">
        <h2>{{ username }}</h2>
      </ion-row>
      <br />
      <ion-list :inset="true">
        <ion-item href="./tab4/favorite" class="ion-margin">
          <ion-label>Mes recettes favorites</ion-label>
          <ion-badge>3</ion-badge>
        </ion-item>

        <ion-item href="#" class="ion-margin">
          <ion-label>Mes cafés favoris</ion-label>
        </ion-item>
        <ion-item href="./tab4/terms" class="ion-margin">
          <ion-label>Informations légales</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-button id="logout-button" class="ion-margin" @click="logout()"
      >Déconnexion</ion-button
    >
    <ion-alert v-if="isAlertShown" :buttons="alertButtons"></ion-alert>
  </ion-page>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useStore, mapGetters } from "vuex";
import { toastController, alertController } from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";

export default defineComponent({
  name: "ProfilView",
  mounted() {
    this.$store.dispatch("init");
  },
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
    const showAlert = reactive({
      isAlertShown: false,
    });

    const presentToast = async (position) => {
      const toast = await toastController.create({
        message: "Tu es bien déconnecté(e)",
        duration: 1500,
        position,
      });

      await toast.present();
    };

    const logout = async () => {
      const alert = await alertController.create({
        header: "Déconnexion",
        message: "Êtes-vous sûr ?",
        buttons: [
          {
            text: "Annuler",
            role: "cancel",
          },
          {
            text: "OK",
            role: "confirm",
            handler: async () => {
              presentToast("top");
              await store.dispatch("logout");
              localStorage.removeItem("username");
            },
          },
        ],
      });
      await alert.present();
    };

    return {
      logout,
      presentToast,
      isAlertShown: showAlert.isAlertShown,
      logOutOutline,
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
ion-badge {
  --background: #da7f2b;
  --color: white;
}
</style>
