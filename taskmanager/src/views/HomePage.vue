<template>
  <ion-page>
    <ion-content class="home-content animate__animated animate__fadeIn">
      <div class="home-container glass-card">
        <!-- Animation Lottie -->
        <lottie-player
          src="https://assets2.lottiefiles.com/packages/lf20_bhw1ul4g.json"
          background="transparent"
          speed="1"
          style="width: 220px; height: 220px"
          loop
          autoplay
        ></lottie-player>

        <h1 class="title">Bienvenue 👋</h1>
        <p class="subtitle">Votre assistant de productivité personnel</p>

        <ion-button
          expand="block"
          color="primary"
          class="action-btn"
          @click="goToLogin"
        >
          🔑 Connexion
        </ion-button>

        <ion-button
          expand="block"
          fill="outline"
          color="success"
          class="action-btn"
          @click="goToRegister"
        >
          📝 Créer un compte
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton
} from '@ionic/vue'

import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

onMounted(() => {
  import('@lottiefiles/lottie-player')
})

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.home-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: var(--ion-color-step-50, #f2f2f7);
}

.home-container {
  width: 90%;
  max-width: 400px;
  padding: 40px 24px;
  border-radius: 22px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(12px);
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 10px;
  color: #333;
}

.subtitle {
  font-size: 1rem;
  margin-bottom: 24px;
  color: #666;
}

.action-btn {
  margin-top: 14px;
  font-size: 1.1rem;
  font-weight: 600;
  --border-radius: 14px;
  --box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}
</style>
