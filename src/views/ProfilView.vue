<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mon profil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="onSubmit" class="ion-row">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-avatar class="ion-margin">
                  <img :src="userProfileImageUrl || defaultImageUrl" />
                </ion-avatar>
                <ion-input
                  type="file"
                  @change="onFileSelected"
                  accept="image/*"
                ></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button type="submit" class="ion-margin-top"
                >Enregistrer</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-content>
    <ion-button class="ion-margin" @click="logout()">Déconnexion</ion-button>
  </ion-page>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import {
  IonPage,
  IonButton,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonContent,
  IonAvatar,
  toastController,
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/vue";

// Importer le SDK Firebase Storage pour JavaScript
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default defineComponent({
  name: "ProfilView",
  components: {
    IonPage,
    IonButton,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonAvatar,
    IonRow,
    IonCol,
    IonGrid,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      userProfileImageUrl: null,
      selectedFile: null,
      defaultImageUrl: "https://ionicframework.com/docs/img/demos/avatar.svg",
    });

    async function uploadImage(file) {
      try {
        // Initialiser le stockage Firebase
        const storage = getStorage();

        // Générer un nom de fichier unique pour l'image
        const fileName = `${Date.now()}-${file.name}`;

        // Référence de l'emplacement de stockage dans Firebase Storage
        const storageRef = ref(storage, `user-profile-images/${fileName}`);

        // Télécharger le fichier vers Firebase Storage
        await uploadBytes(storageRef, file);

        // Retourner l'URL de l'image dans Firebase Storage
        const downloadUrl = await getDownloadURL(storageRef);

        console.log("inside TRY");
        return downloadUrl;
      } catch (error) {
        console.error(error);
        console.log("ERROOOOR");
      }
    }

    async function onSubmit() {
      try {
        if (state.selectedFile) {
          const downloadUrl = await uploadImage(state.selectedFile);
          console.log("FIX ET OK ?");
          if (downloadUrl) {
            state.userProfileImageUrl = downloadUrl;
            console.log("ON SUBMIIT");
          }
        }

        // Enregistrer les autres données du profil de l'utilisateur dans la base de données Firestore
        // await updateUserProfile(userId, { ... });

        // Rediriger l'utilisateur vers la page de profil
        // router.push("/profile");
      } catch (error) {
        console.error(error);
      }
    }

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
      onSubmit,
      onFileSelected,
      userProfileImageUrl: state.userProfileImageUrl,
      defaultImageUrl: state.defaultImageUrl,
    };
  },
});
</script>

<style>
ion-avatar {
  width: 5em;
  height: 5em;
}
</style>
