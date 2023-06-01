<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Coffee Shop</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- <img src="./marker.png" alt="" style="width: 50px; height: 50px" /> -->
      <ion-list>
        <ion-item>
          <ion-select
            aria-label="City"
            interface="popover"
            placeholder="Sélectionne ta ville"
          >
            <ion-select-option value="bordeaux">Bordeaux</ion-select-option>
            <ion-select-option disabled value="paris"
              >Paris (bientôt 😃)</ion-select-option
            >
            <ion-select-option disabled value="lyon"
              >Lyon (bientôt 😃)</ion-select-option
            >
          </ion-select>
        </ion-item>
      </ion-list>
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
    onMounted(() => {
      let map;
      const mapOptions = {
        center: { lat: 44.83873554192924, lng: -0.5620387918467384 },
        zoom: 13,
      };
      map = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );
      console.log(map);

      const coffees = [
        {
          address: "29 Rue Notre-Dame, 33000 Bordeaux",
          name: "La Pelle Café",
          position: {
            lat: 44.850514,
            lng: -0.5721549,
          },
        },
        {
          address: "12 Rue de la Vieille Tour, 33000 Bordeaux",
          name: "L'Alchimiste",
          position: {
            lat: 44.84139584905551,
            lng: -0.579492231780917
          },
        },
        {
          address: "24 Rue des Ayres, 33000 Bordeaux",
          name: "Verde Nero",
          position: {
            lat: 44.83686469923543,
            lng: -0.5733389759595543
          }
        },
        {
          address: "69 Rue des Ayres, 33000 Bordeaux",
          name: "Café Piha",
          position: {
            lat: 44.83702021490446,
            lng: -0.574952702945452
          }
        },
        {
          address: "15 Rue des Argentiers, 33000 Bordeaux",
          name: "Cafeincup",
          position: {
            lat: 44.839425416870775, 
            lng: -0.5701111452739607
          }
        },
        {
          address: "16 Av. Thiers, 33100 Bordeaux",
          name: "Matsa Café",
          position: {
            lat: 44.84146775624686,
            lng: -0.5586462876025271
          }
        },
        {
          address: "51 Cr. de la Marne, 33800 Bordeaux",
          name: "Oven Heaven",
          position: { lat: 44.83253943733222, lng: -0.5697165628224697}
        },
        {
          address: "33 Rue Gaspard Philippe, 33800 Bordeaux",
          name: "Michel MaBelle",
          position: { lat: 44.83311957528115, lng: -0.5670210029456424}
        }
      ];
    
      coffees.forEach((coffee) => {
        const marker = new window.google.maps.Marker({
          position: coffee.position,
          map,
          title: coffee.name,
          icon: {
            url: "https://apollotrails.com/staridas-geography-2019/css/icons/Coffee.png",
            scaledSize: new window.google.maps.Size(35,50), // scaled size
            origin: new window.google.maps.Point(0, 0), // origin
            anchor: new window.google.maps.Point(0, 0), // anchor
          },
        });

        marker.addListener("click", () => {
          // Afficher la carte de présentation du restaurant avec son nom
          // Vous pouvez utiliser une librairie de modals, telles que 'ionic-modal' pour afficher le contenu souhaité.
          alert(coffee.name);
        });
      });
    });

    return {};
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 700px;
  background: #d6d6d6;
}
</style>
