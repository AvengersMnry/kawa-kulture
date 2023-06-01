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
import { onMounted } from "vue";

export default {
  name: "CoffeesView",
  components: {},
  setup() {
    let mapRef;

    const initializeMap = () => {
      const mapElement = document.getElementById("map");
      const mapOptions = {
        center: { lat: 44.845814, lng: -0.570154 },
        zoom: 13,
      };
      mapRef = new window.google.maps.Map(mapElement, mapOptions);
      // addMarker();
    };

    // const addMarker = () => {
    //   const marker = new window.google.maps.Marker({
    //     position: { lat: 44.8412201, lng: -0.5794961 },
    //     map,
    //     title: "Coffee Test",
    //   });
    //   marker.setMap(map.value);
    // };

    const coffees = [
      {
        address: "29 Rue Notre-Dame, 33000 Bordeaux",
        title: "La Pelle Café",
        position: {
          lat: 44.850514,
          lng: -0.5721549,
        },
      },
      {
        address: "24 Rue des Ayres, 33000 Bordeaux",
        title: "Verde Nero",
        position: {
          lat: 44.8368604,
          lng: -0.5732729,
        },
      },
    ];

    for (const coffee of coffees) {
      const advancedMarkerView = new window.google.maps.Marker({
        map: mapRef,
        content: buildContent(coffee),
        position: coffee.position,
        title: coffee.title,
      });
      const content = buildContent(coffee);
      const element = content.firstChild;

      element.addEventListener("focus", () => {
        highlight(advancedMarkerView);
      });
      element.addEventListener("pointerenter", () => {
        highlight(advancedMarkerView);
      });
      element.addEventListener("blur", () => {
        unhighlight(advancedMarkerView);
      });
      element.addEventListener("pointerleave", () => {
        unhighlight(advancedMarkerView);
      });
      advancedMarkerView.addListener("click", () => {
        unhighlight(advancedMarkerView);
      });
    }

    function highlight(markerView) {
      markerView.content.classList.add("highlight");
      markerView.element.style.zIndex = 1;
      console.log('highlight');
    }

    function unhighlight(markerView) {
      markerView.content.classList.remove("highlight");
      markerView.element.style.zIndex = "";
      console.log('unhighlight');
    }

    function buildContent(coffee) {
      const content = document.createElement("div");

      content.classList.add("coffee");
      content.innerHTML = `<div class="title">${coffee.title}</div> `;
      console.log("buildContent");
      return content;
    }

    onMounted(() => {
      initializeMap();
      console.log("hellll");
    });

    return {};
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 900px;
  background: #d6d6d6;
}
</style>
