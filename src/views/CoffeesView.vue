<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Coffee Shop</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="map"></div>
      <div id="select-input">
        <ion-list class="ion-no-padding">
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
      </div>
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
        disableDefaultUI: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      };
      map = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );

      map.setOptions({
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
      });

      const coffees = [
        {
          address: "29 Rue Notre-Dame, 33000 Bordeaux",
          name: "La Pelle Café",
          position: { lat: 44.850514, lng: -0.5721549 },
          hours: "Du mardi au dimanche",
          phone: "05 56 81 69 24",
        },
        {
          address: "12 Rue de la Vieille Tour, 33000 Bordeaux",
          name: "L'Alchimiste",
          position: { lat: 44.84139584905551, lng: -0.579492231780917 },
          hours: "Du mardi au samedi",
          phone: "09 86 48 37 93",
        },
        {
          address: "24 Rue des Ayres, 33000 Bordeaux",
          name: "Verde Nero",
          position: { lat: 44.83686469923543, lng: -0.5733389759595543 },
          hours: "Tous les jours",
          phone: "05 57 34 46 41",
        },
        {
          address: "69 Rue des Ayres, 33000 Bordeaux",
          name: "Café Piha",
          position: { lat: 44.83702021490446, lng: -0.574952702945452 },
          hours: "Du mardi au samedi",
          phone: "/",
        },
        {
          address: "15 Rue des Argentiers, 33000 Bordeaux",
          name: "Cafeincup",
          position: { lat: 44.839425416870775, lng: -0.5701111452739607 },
          hours: "Tous les jours",
          phone: "09 86 23 69 34",
        },
        {
          address: "16 Av. Thiers, 33100 Bordeaux",
          name: "Matsa Café",
          position: { lat: 44.84146775624686, lng: -0.5586462876025271 },
          hours: "Du lundi au vendredi",
          phone: "09 73 88 42 49",
        },
        {
          address: "51 Cr. de la Marne, 33800 Bordeaux",
          name: "Oven Heaven",
          position: { lat: 44.83253943733222, lng: -0.5697165628224697 },
          hours: "Du mardi au dimanche",
          phone: "05 56 91 81 37",
        },
        {
          address: "69 Bis Rue des Trois-Conils, 33000 Bordeaux",
          name: "SIP Coffee Bar",
          position: { lat: 44.83987019827774, lng: -0.5783888595009294 },
          hours: "Du lundi au samedi",
          phone: "09 81 91 91 80",
        },
        {
          address: "33 Rue Gaspard Philippe, 33800 Bordeaux",
          name: "Michel MaBelle",
          position: { lat: 44.83311957528115, lng: -0.5670210029456424 },
          hours: "Du mercredi au dimanche",
          phone: "05 57 67 34 39",
        },
        {
          address: "5 Rue Mautrec, 33000 Bordeaux",
          name: "KURO Espresso Bar",
          position: { lat: 44.84328977981884, lng: -0.5750728726661507 },
          hours: "Du mardi au samedi",
          phone: "/",
        },
      ];

      const initializeMarkers = () => {
        coffees.forEach((coffee) => {
          const marker = new window.google.maps.Marker({
            position: coffee.position,
            map,
            title: coffee.name,
            icon: {
              url: "https://apollotrails.com/staridas-geography-2019/css/icons/Coffee.png",
              scaledSize: new window.google.maps.Size(35, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(0, 0),
            },
          });

          const infoWindow = new window.google.maps.InfoWindow();

          marker.addListener("click", () => {
            const content = `
              <div style="width: 150px;height: 100px;padding: 2px">
                <h2>${coffee.name}</h2>
                <p>${coffee.address}</p>
                <p><em>${coffee.hours}</em></p>
                <a href="tel:${coffee.phone}">${coffee.phone}</a>
              </div>
            `;

            infoWindow.close();
            infoWindow.setContent(content);
            infoWindow.open(marker.map, marker);
          });
        });
      };

      initializeMarkers();
    });

    return {};
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
  background: #d6d6d6;
}
#select-input {
  position: absolute;
  top: 5rem;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
}
ion-list {
  border-radius: 10px;
  border: 1px solid orange;
  /* padding-top: 0; */
}
</style>
