<template>
  <ion-card class="card-container">
    <img alt="Image de l'établissement" :src="coffee.img_url" />
    <ion-card-header class="ion-no-padding">
      <ion-card-title>{{ coffee.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ coffee.address }}</p>
      <p>
        <em>{{ coffee.hours }}</em>
      </p>
      <a :href="'tel:' + coffee.phone">{{ coffee.phone }}</a>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";

export default {
  props: ["coffee"],
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
};
</script>

<style>
.card-container {
  text-align: center;
  margin: 0px 16px;
}
.card-container img {
  min-width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin: 0px;
}
.gm-ui-hover-effect {
  background-color: #da7f2b !important;
  top: 0px !important;
  right: 16px !important;
  opacity: 1;
}
.gm-ui-hover-effect > span {
  background-color: white !important;
  height: 25px;
  width: 25px;
}
</style>
