<template>
    <ion-page>
        <h1>Page Profil</h1>
        <h2>Tu es bien connecté !</h2>
        <ion-button class="ion-margin" @click="logout()">Déconnexion</ion-button>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

import { IonPage, IonButton } from '@ionic/vue';
export default defineComponent({
    name: 'ProfilView',
    components: {
        IonPage,
        IonButton,
    },
    setup() {
        const store = useStore();
        const logout = () => {
            store.dispatch('logout');
        }
        return {
            logout,
        }
    }
})
</script>