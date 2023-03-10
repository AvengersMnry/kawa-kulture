<template>
    <ion-button @click="$router.back()"><i class="fa-solid fa-chevron-left"></i></ion-button>
    <h1>BIENVENUE</h1>
    <h1>S'inscrire</h1>
    <form method="post" @submit.prevent="register">
        <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input placeholder="Enter text" type="email" name="email" v-model="register_form.email"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input placeholder="Enter text" type="password" name="password"
                v-model="register_form.password"></ion-input>
        </ion-item>
        <ion-button type="submit">Créer mon compte</ion-button>
    </form>
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

<style scoped></style>
