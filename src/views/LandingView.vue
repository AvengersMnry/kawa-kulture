<template>
  <ion-page>
    <div class="bg-img">
      <ion-content class="ion-margin-top">
        <img
          src="../assets/logos/logo_transparent_background.webp"
          alt="Logo"
        />
        <ion-text class="ion-margin" color="light">
          <h2>Une bonne journée commence avec un bon café</h2>
        </ion-text>
        <ion-row class="ion-margin ion-justify-content-center">
          <ion-button class="ion-margin" @click="goSignUpPage()"
            >Je crée mon compte</ion-button
          >
          <ion-button class="ion-margin" @click="goLoginPage()"
            >Je me connecte</ion-button
          >
        </ion-row>
      </ion-content>
    </div>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import router from "@/router";
export default defineComponent({
  name: "LandingView",
  components: {},
  setup() {
    function goLoginPage() {
      router.push("/login");
    }

    function goSignUpPage() {
      router.push("/signup");
    }

    return {
      goLoginPage,
      goSignUpPage,
    };
  },
});
</script>

<style scoped>
img {
  margin-top: 2rem;
}

.bg-img {
  height: 100vh;
  background-image: url("../assets/img/cup_landing.webp");
  background-repeat: no-repeat;
  background-size: cover;
}

ion-button {
  --background: #da7f2b;
  font-weight: 500;
  font-size: 1.1em;
  color: #f5f5f5;
  width: 100%;
}

ion-content {
  --background: transparent;
}

ion-row {
  margin-top: 18rem;
}
</style>
