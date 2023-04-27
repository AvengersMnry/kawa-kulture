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
import { IonPage, IonButton, toastController } from '@ionic/vue';

export default defineComponent({
    name: 'ProfilView',
    components: {
        IonPage,
        IonButton,
    },
    setup() {
        const store = useStore();
        
        const presentToast = async (position) => {
            const toast = await toastController.create({
                message: 'Tu es bien déconnecté(e)',
                duration: 1500,
                position: position
            });
            
            await toast.present();
        };
        
        const logout = () => {
            presentToast('top');
            store.dispatch('logout');
        };
        
        return {
            logout,
            presentToast
        }
    }
})
</script>