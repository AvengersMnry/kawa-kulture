<template>
    <ion-page>
        <ion-content class="bg-orange">
            <img src="../../public/img/arabica.png" alt="Branche de caféier">
            <ion-button fill="outline" shape="round" color="light" class="back-arrow" @click="$router.back()"><i
                    class="fa-solid fa-chevron-left"></i></ion-button>
            <form class="ion-margin" method="post" @submit.prevent="register">
                <h1>Bienvenue sur <strong>Kawa !</strong></h1>
                <h2>Commençons votre inscription</h2>
                <ion-item fill="outline">
                    <ion-label position="floating">Email</ion-label>
                    <ion-input required placeholder="john.doe@email.com" v-model="registerForm.email"></ion-input>
                </ion-item>
                <br>
                <ion-item fill="outline">
                    <ion-label position="floating">Mot de passe</ion-label>
                    <ion-input required type="password" placeholder="Saisissez un mot de passe" v-model="registerForm.password"></ion-input>
                </ion-item>
                <br>
                <ion-button class="ion-margin" color="tertiary" type="submit">Créer mon compte</ion-button>
            </form>
            <p>J'ai déjà un compte ! <router-link to="login">Connexion</router-link></p>
        </ion-content>
    </ion-page>
</template>

<script>
import { ref } from 'vue' 
import { useStore } from 'vuex';
import { IonPage, IonContent, IonInput, IonItem, IonLabel, IonButton } from '@ionic/vue';
export default {
    name: 'SignupView',
    components: {
        IonPage,
        IonContent,
        IonInput,
        IonItem,
        IonLabel,
        IonButton
    },
    setup() {
        const registerForm = ref({});
        const store = useStore();
        const register = () => {
            store.dispatch('register', registerForm.value);
        }
        return {
            registerForm,
            register
        }
    },
}
</script>

<style scoped>
ion-item {
    width: 75%;
    margin: 0 auto;
}

img {
    width: 70%;
    display: flex;
    margin: auto;
}

h1,
h2 {
    color: white;
    margin: 1rem 0;
}
</style>
