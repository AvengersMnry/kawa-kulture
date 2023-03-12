<template>
    <ion-content>
        <img src="../../public/img/arabica.png" alt="Branche de caféier">
        <ion-button fill="outline" shape="round" color="light" class="back-arrow" @click="$router.push('/')"><i
                class="fa-solid fa-chevron-left"></i></ion-button>
        <form class="ion-margin" method="post" @submit.prevent="register">
            <h1>Bienvenue sur <strong>Kawa !</strong></h1>
            <h2>Commençons votre inscription</h2>
            <ion-item fill="outline">
                <ion-label position="floating">Adresse mail</ion-label>
                <ion-input required placeholder="john.doe@email.com"></ion-input>
            </ion-item>
            <br>
            <ion-item fill="outline">
                <ion-label position="floating">Mot de passe</ion-label>
                <ion-input required placeholder="Saisissez un mot de passe"></ion-input>
            </ion-item>
            <br>
            <ion-button class="ion-margin" color="tertiary" type="submit">Créer mon compte</ion-button>
            <p>J'ai déjà un compte ! <a href="/login">Connexion</a></p>
        </form>
    </ion-content>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex';
import { IonInput, IonItem, IonLabel, IonButton } from '@ionic/vue';
export default {
    name: 'SignupView',
    components: {
        IonInput,
        IonItem,
        IonLabel,
        IonButton
    },
    setup() {
        const register_form = ref({});
        const store = useStore();
        const register = () => {
            store.dispatch('register', register_form.value);
        }
        return {
            register_form,
            register
        }
    },
}
</script>

<style scoped>
ion-content {
    --background: transparent;
    background-color: #ff9017;
}

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
