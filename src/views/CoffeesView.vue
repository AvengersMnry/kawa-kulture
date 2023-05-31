<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Coffee Shop</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="map"></div>
    </ion-content>
  </ion-page>
</template>

<script>
import { onMounted, ref } from "vue";
// import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "CoffeesView",
  components: {},
  setup() {

    const map = ref(null);
    // const coffees = [
    //   {
    //     address: "29 Rue Notre-Dame, 33000 Bordeaux",
    //     title: "La Pelle Café",
    //     position: {
    //       lat: 44.850514,
    //       lng: -0.5721549,
    //     },
    //   },
    //   {
    //     address: "24 Rue des Ayres, 33000 Bordeaux",
    //     title: "Verde Nero",
    //     position: {
    //       lat: 44.8368604,
    //       lng: -0.5732729,
    //     },
    //   },
    // ]

    const initMap = () => {
      const mapElement = document.getElementById("map");
      const mapOptions = {
        center: { lat: 44.845814, lng: -0.570154 },
        zoom: 13,
      };

      map.value = new window.google.maps.Map(mapElement, mapOptions);

      addMarker();
    };

    const addMarker = () => {
      const marker = new window.google.maps.Marker({
        position: { lat: 44.8412201, lng: -0.5794961 },
        map,
        title: "Coffee Test",
      });
      marker.setMap(map.value);
    };

    onMounted(() => {
      initMap();
    });
    return {};
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 400px;
  background: #d6d6d6;
}
</style>
