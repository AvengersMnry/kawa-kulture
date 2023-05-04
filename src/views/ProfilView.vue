<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Mon profil</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <h2>Tu es bien connecté(e) !</h2>
        </ion-content>
        <ion-button class="ion-margin" @click="logout()">Déconnexion</ion-button>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { IonPage, IonButton, toastController, IonTitle, IonToolbar, IonHeader, IonContent } from '@ionic/vue';

export default defineComponent({
    name: 'ProfilView',
    components: {
        IonPage,
        IonButton,
        IonTitle,
        IonToolbar,
        IonHeader,
        IonContent
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