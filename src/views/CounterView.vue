<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Compteur de caféine</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="color-background">
      <h5 class="ion-text-center">
        L'OMS recommande 400mg /jour de caféine<br />🤓🧑🏻‍⚕️
      </h5>
      <h4>1 espresso = 80 mg de caféine</h4>

      <div class="coffee-counter">
        <img src="../assets/img/cup_coffee.png" alt="Cup of coffee" />
        <h3>{{ coffeeCount }} mg de café</h3>
        <ion-button @click="incrementCoffee" expand="block" class="addButton"
          >Ajouter une tasse</ion-button
        >
        <ion-range v-model="coffeeCount" :min="0" :max="400"></ion-range>
        <ion-button @click="resetCoffee" expand="block" class="resetButton"
          >Réinitialiser</ion-button
        >
      </div>
      <ion-toast
        v-if="showToast"
        :message="toastMessage"
        duration="3000"
        position="middle"
        @ionToastDidDismiss="showToast = false"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "CounterView",
  components: {},
  setup() {
    const coffeeCount = ref(0);
    const showToast = ref(false);
    const toastMessage = ref("Limite de caféine atteinte !");

    const incrementCoffee = () => {
      coffeeCount.value += 80;
    };

    const resetCoffee = () => {
      coffeeCount.value = 0;
      showToast.value = false;
    };

    watch(
      () => coffeeCount.value,
      (newValue) => {
        if (newValue >= 400) {
          showToast.value = true;
        }
      }
    );

    return {
      coffeeCount,
      incrementCoffee,
      resetCoffee,
      toastMessage,
      showToast,
    };
  },
};
</script>

<style scoped>
.color-background {
  --ion-background-color: #80623e;
}
h5 {
  background-color: #da7f2b;
  font-weight: 600;
  border-radius: 30px;
  border-top-left-radius: 0px;
  padding: 5px;
  margin: 15px 30px;
  color: white;
  text-align: center;
}
h4 {
  background-color: #da7f2b;
  font-weight: 400;
  border-radius: 30px;
  border-top-right-radius: 0px;
  padding: 10px;
  margin: 15px 30px;
  color: white;
  text-align: center;
}
h3 {
  color: white;
}
.addButton {
  --background: #da7f2b;
}
.resetButton {
  --background: rgb(185, 25, 25);
}
ion-range {
  width: 85%;
  margin: auto;
  --bar-background-active: #332010;
  --knob-size: 26px;
  --bar-height: 4px;
  --bar-background: white;
}

.coffee-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.coffee-image {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}
img {
  width: 70%;
}
</style>
