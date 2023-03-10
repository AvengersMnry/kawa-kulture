<template>
    <h1>Page home</h1>
    <h2>Tu es bien connecté !</h2>
    <ion-button class="ion-margin" @click="logout()">Déconnexion</ion-button>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

import { IonButton } from '@ionic/vue';
export default defineComponent({
    name: 'HomeView',
    components: {
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