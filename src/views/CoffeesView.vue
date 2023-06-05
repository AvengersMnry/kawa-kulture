<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Coffee Shop</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="map"></div>
      <div id="user-marker"></div>
      <div id="select-input">
        <ion-list class="ion-no-padding">
          <ion-item>
            <ion-select
              aria-label="City"
              interface="popover"
              placeholder="Sélectionne ta ville"
              value="bordeaux"
              class="ion-padding-right"
            >
              <ion-select-option value="bordeaux">Bordeaux</ion-select-option>
              <ion-select-option disabled value="paris"
                >Paris bientôt 😃</ion-select-option
              >
              <ion-select-option disabled value="lyon"
                >Lyon bientôt 😃</ion-select-option
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
      let map; // Variable to store the Google Maps map object
      let userMarker; // Variable to store the marker for the user's position

      const initializeMap = () => {
        // Function to initialize the map with options
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

        const initializeMarkers = () => {
          // Function to initialize the coffee markers on the map
          const coffees = [
            {
              address: "29 Rue Notre-Dame",
              name: "La Pelle Café",
              position: { lat: 44.850514, lng: -0.5721549 },
              hours: "Du mardi au dimanche",
              phone: "05 56 81 69 24",
              img_url:
                "https://europeancoffeetrip.com/wp-content/uploads/2017/09/La_Pelle_Cafe_outside-1024x682.jpg",
            },
            {
              address: "12 Rue de la Vieille Tour",
              name: "L'Alchimiste",
              position: { lat: 44.84139584905551, lng: -0.579492231780917 },
              hours: "Du mardi au samedi",
              phone: "09 86 48 37 93",
              img_url:
                "https://lh3.googleusercontent.com/-VW0cXdWBG_s/X22N7I5oWnI/AAAAAAAC34s/Y1Jl--Mqzbk55VWnsU6ZJWz-JHiAX92UQCLcBGAsYHQ/s1600/1601015275717302-1.png",
            },
            {
              address: "24 Rue des Ayres",
              name: "Verde Nero",
              position: { lat: 44.83686469923543, lng: -0.5733389759595543 },
              hours: "Tous les jours",
              phone: "05 57 34 46 41",
              img_url:
                "https://toquedechoc.com/wp-content/uploads/2017/07/WP_20170702_12_31_02_Pro-1024x575.jpg",
            },
            {
              address: "69 Rue des Ayres",
              name: "Café Piha",
              position: { lat: 44.83702021490446, lng: -0.574952702945452 },
              hours: "Du mardi au samedi",
              phone: "09 08 27 78 54",
              img_url:
                "https://fastly.4sqi.net/img/general/600x600/1481766_8msGuoz-C1hOfVQlw1WIV5HCeSddygN6j5IdEGzfrd4.jpg",
            },
            {
              address: "15 Rue des Argentiers",
              name: "Cafeincup",
              position: { lat: 44.839425416870775, lng: -0.5701111452739607 },
              hours: "Tous les jours",
              phone: "09 86 23 69 34",
              img_url:
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f1/f0/bc/coffee-house-dans-le.jpg?w=800&h=600&s=1",
            },
            {
              address: "16 Av. Thiers",
              name: "Matsa Café",
              position: { lat: 44.84146775624686, lng: -0.5586462876025271 },
              hours: "Du lundi au vendredi",
              phone: "09 73 88 42 49",
              img_url:
                "https://media-cdn.tripadvisor.com/media/photo-s/23/f1/81/cb/notre-terrasse-ensoleillee.jpg",
            },
            {
              address: "51 Cr. de la Marne",
              name: "Oven Heaven",
              position: { lat: 44.83253943733222, lng: -0.5697165628224697 },
              hours: "Du mardi au dimanche",
              phone: "05 56 91 81 37",
              img_url:
                "https://lh3.googleusercontent.com/places/AM5lPC9ZyQuM2XWY_OUDxWlqTr6QmJZTZQmORR596FV6ASWLFjhel6XzR2QeefiTjX1b-Y7D_V8-FsH0FsqDgPVnd1SUri5ZplErBB0=s1600-w640",
            },
            {
              address: "69 Bis Rue des Trois-Conils",
              name: "SIP Coffee Bar",
              position: { lat: 44.83987019827774, lng: -0.5783888595009294 },
              hours: "Du lundi au samedi",
              phone: "09 81 91 91 80",
              img_url:
                "https://www.pagesjaunes.fr/media/ugc/sip_coffee_bar_03306300_112518698?w=400&h=300",
            },
            {
              address: "33 Rue Gaspard Philippe",
              name: "Michel MaBelle",
              position: { lat: 44.83311957528115, lng: -0.5670210029456424 },
              hours: "Du mercredi au dimanche",
              phone: "05 57 67 34 39",
              img_url:
                "https://images.happycow.net/venues/200x200/21/85/hcmp218559_1786516.jpeg",
            },
            {
              address: "5 Rue Mautrec",
              name: "KURO Espresso Bar",
              position: { lat: 44.84328977981884, lng: -0.5750728726661507 },
              hours: "Du mardi au samedi",
              phone: "05 57 83 40 89",
              img_url:
                "https://www.dish.guide/ir/restaurant/751/75179e0dca9fd5afb263d168c9b3f315.jpg",
            },
          ];

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
                <style>
                  .card-container {
                    max-width: 200px;
                  }

                  .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                </style>
                <ion-card class="card-container">
                  <img class="card-image" alt="Image de l'établissement" src="${coffee.img_url}" />
                  <ion-card-header>
                    <ion-card-title>${coffee.name}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <p>${coffee.address}</p>
                    <p><em>${coffee.hours}</em></p>
                    <a href="tel:${coffee.phone}">${coffee.phone}</a>
                    <button @click="openDirections('${coffee.position.lat}', '${coffee.position.lng}')">Go</button>
                  </ion-card-content>
                </ion-card>
              `;

              infoWindow.close();
              infoWindow.setContent(content);
              infoWindow.open(marker.map, marker);
            });
          });
        };

        initializeMarkers();
      };

      const handleGeolocationError = (error) => {
        // Function to handle geolocation error
        console.error("Erreur de géolocalisation :", error);
        initializeMap(); // Initialize map without user marker
      };

      const handleGeolocationSuccess = (position) => {
        // Function to handle geolocation success
        const userLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        initializeMap();

        userMarker = new window.google.maps.Marker({
          // Show the user marker on the map
          position: userLatLng,
          map,
          title: "Votre position",
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 50),
          },
        });
        userMarker.setMap(map);
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          handleGeolocationSuccess,
          handleGeolocationError
        );
      } else {
        initializeMap();
      }
    });

    const openDirections = (lat, lng) => {
      const destination = `${lat},${lng}`;
      const platform = navigator.platform.toLowerCase();

      if (platform.includes("iphone") || platform.includes("ipad")) {
        window.open(
          `maps://maps.google.com/maps?daddr=${destination}`,
          "_blank"
        );
      } else {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
          "_blank"
        );
      }
    };

    return {
      openDirections,
    };
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
}
</style>
