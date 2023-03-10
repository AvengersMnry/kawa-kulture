<template>
  <ion-button expand="block" @click="goLoginPage()">Je crée mon compte</ion-button>
  <ion-button expand="block" @click="goSignUpPage()">Je me connecte</ion-button>
</template>

<script>
import router from '@/router';
import { IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: { IonButton },

  setup() {
    function goLoginPage() {
      router.push('/login')
    }

    function goSignUpPage() {
      router.push('/signup')
    }

    return {
      goLoginPage,
      goSignUpPage,
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
