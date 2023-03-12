<template>
    <ion-content>
        <img src="../../public/img/arabica.png" alt="Branche de caféier">
        <ion-button fill="outline" shape="round" color="light" class="back-arrow" @click="$router.push('/')"><i
                class="fa-solid fa-chevron-left"></i></ion-button>
        <h1>Ravi de vous revoir</h1>
        <h2>Un café ? ☕️</h2>
        <form method="post" @submit.prevent="login">
            <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input placeholder="Enter text" type="email" name="email" v-model="login_form.email"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input placeholder="Enter text" type="password" name="password"
                    v-model="login_form.password"></ion-input>
            </ion-item>
            <br>
            <ion-item class="transparent">
                <ion-checkbox></ion-checkbox>
                <ion-label>Se souvenir de moi</ion-label>
            </ion-item>
            <br>
            <ion-button class="ion-margin" color="tertiary" type="submit">Se connecter</ion-button>
            <p>Pas encore inscrit ? <a href="/signup">Inscription</a></p>
        </form>
    </ion-content>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { IonInput, IonItem, IonLabel, IonButton, IonContent, IonCheckbox } from '@ionic/vue';

export default {
    name: 'LoginView',
    components: {
        IonInput,
        IonItem,
        IonLabel,
        IonButton,
        IonContent,
        IonCheckbox,
    },
    setup() {
        const store = useStore();
        const login_form = ref({});

        const login = () => {
            store.dispatch('login', login_form.value);
        }

        return {
            login_form,
            login,
        }
    }
}
</script>

<style scoped>
ion-content {
    --background: transparent;
    background-color: #ff9017;
}

.transparent {
    --background: transparent;
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

ion-checkbox {
    --size: 32px;
    --background-checked: #4415ec;
    margin-right: 6px;
}

ion-checkbox::part(container) {
    border-radius: 6px;
    border: 2px solid #4415ec;
}
</style>
