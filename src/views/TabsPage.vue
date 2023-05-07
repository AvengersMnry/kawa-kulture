<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar>
          <ion-tab-button tab="tab1" href="/tabs/tab1">
            <ion-icon aria-hidden="true" :icon="cafeOutline" />
            <ion-label>Recettes</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab2" href="/tabs/tab2">
            <ion-icon aria-hidden="true" :icon="navigateOutline" />
            <ion-label>Trouver un coffee</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab3" href="/tabs/tab3">
            <ion-icon aria-hidden="true" :icon="speedometerOutline" />
            <ion-label>Compteur caféine</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab4" href="/tabs/tab4">
            <ion-icon aria-hidden="true" :icon="personOutline" />
            <ion-label>Profil</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  navigateOutline,
  mapOutline,
  speedometerOutline,
  bookOutline,
  cafeOutline,
  personOutline,
} from "ionicons/icons";
export default {
  name: "TabsPage",
  components: {},
  setup() {
    return {
      mapOutline,
      speedometerOutline,
      navigateOutline,
      bookOutline,
      cafeOutline,
      personOutline,
    };
  },
};
</script>
