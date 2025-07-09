<template>
  <ion-page>
    <ion-content class="login-content animate__animated animate__fadeIn" :scroll-y="false">
      
      <!-- Loader -->
      <div v-if="isLoading" class="loader-wrapper">
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_usmfx6bp.json"
          background="transparent"
          speed="1"
          style="width: 200px; height: 200px"
          loop
          autoplay
        ></lottie-player>
        <p class="loading-text">Chargement...</p>
      </div>

      <!-- Contenu complet -->
      <div v-else>
        <!-- 🎈 Bulles flottantes -->
        <div class="bubbles">
          <span v-for="n in 15" :key="n" class="bubble" :style="`--i:${n}`"></span>
        </div>

        <!-- 🎵 Musique douce à activer -->
        <audio ref="audio" loop>
          <source src="https://www.bensound.com/bensound-music/bensound-sunny.mp3" type="audio/mpeg" />
        </audio>

        <!-- 🔘 Bouton Activer la musique -->
        <ion-button class="music-btn" @click="playMusic" color="light">
          🎵 Activer la musique
        </ion-button>

        <!-- 📦 Formulaire centré -->
        <div class="login-wrapper">
          <div class="login-container glass-card animate__animated animate__zoomIn">

            <!-- 🎞 Lottie Animation principale -->
            <lottie-player
              src="https://assets4.lottiefiles.com/packages/lf20_1pxqjqps.json"
              background="transparent"
              speed="1"
              style="width: 180px; height: 180px; margin-bottom: 10px"
              loop
              autoplay
            ></lottie-player>

            <h2 class="title">Bienvenue 👋</h2>
            <p class="subtitle">Connecte-toi pour gérer tes tâches</p>

            <ion-item lines="none" class="input">
              <ion-input v-model="email" type="email" label="Email" label-placement="floating" required />
            </ion-item>

            <ion-item lines="none" class="input">
              <ion-input v-model="password" type="password" label="Mot de passe" label-placement="floating" required />
            </ion-item>

            <ion-button
              expand="block"
              class="login-btn animate__animated animate__pulse animate__infinite"
              @click="login"
            >
              🔐 Connexion
            </ion-button>

            <ion-button fill="clear" @click="goToRegister" class="link">
              Pas encore inscrit ? Créer un compte
            </ion-button>

            <!-- ✨ Deuxième Lottie décoratif -->
            <lottie-player
              src="https://assets1.lottiefiles.com/packages/lf20_ktwnwv5m.json"
              background="transparent"
              speed="1"
              style="width: 120px; height: 120px; margin-top: 15px"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
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
import { loginUser } from '@/services/api'
import { useUserStore } from '@/store/state'

onMounted(() => {
  import('@lottiefiles/lottie-player')

  setTimeout(() => {
    isLoading.value = false
  }, 2500)
})

const router = useRouter()
const store = useUserStore()

const email = ref('')
const password = ref('')
const audio = ref<HTMLAudioElement | null>(null)
const isLoading = ref(true)

const playMusic = () => {
  if (audio.value) {
    audio.value.volume = 0.4
    audio.value.play().catch((err) => {
      console.warn('Lecture audio refusée :', err)
    })
  }
}

const login = async () => {
  if (!email.value || !password.value) {
    const toast = await toastController.create({
      message: 'Veuillez remplir tous les champs.',
      duration: 2000,
      color: 'warning',
    })
    toast.present()
    return
  }

  try {
    const response = await loginUser({ email: email.value, password: password.value })
    store.setUser(response.data)
    localStorage.setItem('token', response.data.token)

    const toast = await toastController.create({
      message: 'Connexion réussie 🎉',
      duration: 2000,
      color: 'success',
    })
    toast.present()

    document.activeElement instanceof HTMLElement && document.activeElement.blur()
    router.push('/tabs/mes-taches')
  } catch (error: any) {
    const toast = await toastController.create({
      message: 'Identifiants incorrects 😢',
      duration: 2000,
      color: 'danger',
    })
    toast.present()
    console.error('Erreur login :', error)
  }
}

const goToRegister = () => {
  document.activeElement instanceof HTMLElement && document.activeElement.blur()
  router.push('/register')
}
</script>

<style scoped>
.login-content {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(-45deg, #dbeafe, #e0f2f1, #e9d5ff, #f0fdfa);
  background-size: 400% 400%;
  animation: gradientFlow 15s ease infinite;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 1;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 32px 24px;
  text-align: center;
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.35);
}

.title {
  font-size: 1.6rem;
  margin-bottom: 6px;
  font-weight: 700;
}

.subtitle {
  font-size: 1rem;
  color: #555;
  margin-bottom: 24px;
}

.input {
  margin-bottom: 14px;
  --border-radius: 12px;
}

.login-btn {
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

.music-btn {
  z-index: 2;
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 0.85rem;
  opacity: 0.8;
}

/* Bulles animées */
.bubbles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.bubble {
  position: absolute;
  bottom: -100px;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  animation: floatBubble 15s infinite ease-in;
  left: calc(100% * var(--i) / 15);
  animation-delay: calc(var(--i) * 0.3s);
}

@keyframes floatBubble {
  0% { transform: translateY(0); opacity: 0.4; }
  50% { opacity: 1; }
  100% { transform: translateY(-120vh); opacity: 0; }
}

/* Loader */
.loader-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #dbeafe, #f0fdfa);
  animation: gradientFlow 15s ease infinite;
  z-index: 10;
}

.loading-text {
  margin-top: 16px;
  font-size: 1.1rem;
  color: #444;
  font-style: italic;
}
</style>
