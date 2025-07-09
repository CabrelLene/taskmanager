<template>
  <ion-page>
    <ion-content class="register-content animate__animated animate__fadeIn" :scroll-y="false">
      <div class="register-container glass-card animate__animated animate__zoomIn">
        <!-- 🎞 Lottie Animation -->
        <lottie-player
          src="https://assets4.lottiefiles.com/packages/lf20_1pxqjqps.json"
          background="transparent"
          speed="1"
          style="width: 180px; height: 180px; margin-bottom: 20px"
          loop
          autoplay
        ></lottie-player>

        <h2 class="title">Créer un compte ✨</h2>
        <p class="subtitle">Inscris-toi pour commencer à organiser tes tâches</p>

        <ion-item lines="none" class="input">
          <ion-input
            v-model="firstName"
            label="Prénom"
            label-placement="floating"
            required
          />
        </ion-item>

        <ion-item lines="none" class="input">
          <ion-input
            v-model="lastName"
            label="Nom"
            label-placement="floating"
            required
          />
        </ion-item>

        <ion-item lines="none" class="input">
          <ion-input
            v-model="email"
            type="email"
            label="Email"
            label-placement="floating"
            required
          />
        </ion-item>

        <ion-item lines="none" class="input">
          <ion-input
            v-model="password"
            type="password"
            label="Mot de passe"
            label-placement="floating"
            required
          />
        </ion-item>

        <ion-button
          expand="block"
          class="register-btn animate__animated animate__pulse animate__infinite"
          @click="register"
        >
          ✅ S'inscrire
        </ion-button>

        <ion-button fill="clear" @click="goToLogin" class="link">
          Déjà inscrit ? Se connecter
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  toastController,
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '@/services/api'

// ⏯ Lottie as Web Component
onMounted(() => {
  import('@lottiefiles/lottie-player')
})

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

const register = async () => {
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    const toast = await toastController.create({
      message: 'Tous les champs sont requis.',
      duration: 2000,
      color: 'warning',
    })
    toast.present()
    return
  }

  try {
    await registerUser({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    })

    const toast = await toastController.create({
      message: 'Inscription réussie 🎉',
      duration: 2000,
      color: 'success',
    })
    toast.present()

    document.activeElement instanceof HTMLElement && document.activeElement.blur()
    router.push('/login')
  } catch (error: any) {
    const toast = await toastController.create({
      message: 'Erreur lors de l’inscription 😢',
      duration: 2000,
      color: 'danger',
    })
    toast.present()
    console.error('Erreur inscription :', error)
  }
}

const goToLogin = () => {
  document.activeElement instanceof HTMLElement && document.activeElement.blur()
  router.push('/login')
}
</script>

<style scoped>
.register-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--ion-color-step-50, #f3f4f6);
  padding: env(safe-area-inset);
}

.register-container {
  width: 90%;
  max-width: 400px;
  padding: 32px 24px;
  text-align: center;
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  position: relative;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 6px;
  font-weight: 700;
}

.subtitle {
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 24px;
}

.input {
  margin-bottom: 14px;
  --border-radius: 12px;
}

.register-btn {
  margin-top: 16px;
  font-size: 1.1rem;
  font-weight: bold;
  --box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.link {
  margin-top: 12px;
  font-size: 0.95rem;
}
</style>
