/** Framework IONIC **/
import { IonicVue } from '@ionic/vue';
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
/** END Framework IONIC **/

import { getAuth } from 'firebase/auth'
import { app } from '../src/firebase'
import router from './router'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import { createApp } from 'vue'

let appInstance;

const auth = getAuth(app);

auth.onAuthStateChanged(() => {
    if (!appInstance) {
      appInstance = createApp(App)
        .use(IonicVue)
        .use(store)
        .use(router)
        .mount('#app');
    }
});