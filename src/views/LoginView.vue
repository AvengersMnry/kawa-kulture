<template>
    <ion-button @click="$router.back()"><i class="fa-solid fa-chevron-left"></i></ion-button>
    <h1>Welcome back !</h1>
    <h1>Connexion</h1>
    <form method="post" @submit.prevent="login">
        <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input placeholder="Enter text" type="email" name="email" v-model="login_form.email"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input placeholder="Enter text" type="password" name="password" v-model="login_form.password"></ion-input>
        </ion-item>
        <ion-button type="submit">Se connecter</ion-button>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { IonInput, IonItem, IonLabel, IonButton } from '@ionic/vue';

export default {
    name: 'LoginView',
    components: {
        IonInput,
        IonItem,
        IonLabel,
        IonButton
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

<style scoped></style>
