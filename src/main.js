/*** FRAMEWORK IONIC ***/
import { IonicVue } from "@ionic/vue";
import "@ionic/vue/css/core.css";
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
/*** END FRAMEWORK IONIC ***/

import { getAuth } from "firebase/auth";
import { app } from "../src/firebase";
import router from "./router";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import { createApp } from "vue";

/*** IMPORT THE COMPONENTS IONIC ***/
import {
  IonApp,
  IonAlert,
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenu,
  IonModal,
  IonPage,
  IonPopover,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRouterOutlet,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar,
} from "@ionic/vue";

let appInstance;
const auth = getAuth(app);

auth.onAuthStateChanged(() => {
  if (!appInstance) {
    appInstance = createApp(App).use(IonicVue).use(store).use(router);

    /*** GLOBAL REGISTRATION OF ALL IONIC COMPONENTS ***/
    appInstance.component("ion-app", IonApp);
    appInstance.component("ion-alert", IonAlert);
    appInstance.component("ion-avatar", IonAvatar);
    appInstance.component("ion-grid", IonGrid);
    appInstance.component("ion-row", IonRow);
    appInstance.component("ion-col", IonCol);
    appInstance.component("ion-select", IonSelect);
    appInstance.component("ion-select-option", IonSelectOption);
    appInstance.component("ion-text", IonText);
    appInstance.component("ion-label", IonLabel);
    appInstance.component("ion-button", IonButton);
    appInstance.component("ion-loading", IonLoading);
    appInstance.component("ion-textarea", IonTextarea);
    appInstance.component("ion-radio", IonRadio);
    appInstance.component("ion-radio-group", IonRadioGroup);
    appInstance.component("ion-router-outlet", IonRouterOutlet);
    appInstance.component("ion-input", IonInput);
    appInstance.component("ion-modal", IonModal);
    appInstance.component("ion-img", IonImg);
    appInstance.component("ion-item", IonItem);
    appInstance.component("ion-datetime", IonDatetime);
    appInstance.component("ion-searchbar", IonSearchbar);
    appInstance.component("ion-chip", IonChip);
    appInstance.component("ion-segment-button", IonSegmentButton);
    appInstance.component("ion-segment", IonSegment);
    appInstance.component("ion-progress-bar", IonProgressBar);
    appInstance.component("ion-toolbar", IonToolbar);
    appInstance.component("ion-title", IonTitle);
    appInstance.component("ion-content", IonContent);
    appInstance.component("ion-buttons", IonButtons);
    appInstance.component("ion-header", IonHeader);
    appInstance.component("ion-toggle", IonToggle);
    appInstance.component("ion-list", IonList);
    appInstance.component("ion-list-header", IonListHeader);
    appInstance.component("ion-page", IonPage);
    appInstance.component("ion-menu", IonMenu);
    appInstance.component("ion-infinite-scroll", IonInfiniteScroll);
    appInstance.component(
      "ion-infinite-scroll-content",
      IonInfiniteScrollContent
    );
    appInstance.component("ion-checkbox", IonCheckbox);
    appInstance.component("ion-popover", IonPopover);
    appInstance.component("ion-spinner", IonSpinner);
    appInstance.component("ion-icon", IonIcon);
    appInstance.component("ion-card", IonCard);
    appInstance.component("ion-card-title", IonCardTitle);
    appInstance.component("ion-card-header", IonCardHeader);
        appInstance.component("ion-card-content", IonCardContent);

    appInstance.component("ion-tabs", IonTabs);
    appInstance.component("ion-tab-bar", IonTabBar);
    appInstance.component("ion-tab-button", IonTabButton);
    appInstance
      .component("ion-toast", IonToast)

      .mount("#app");
  }
});
