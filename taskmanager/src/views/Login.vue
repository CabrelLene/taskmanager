<template>
    <ion-page>
      <ion-header translucent>
        <ion-toolbar color="primary">
          <ion-title>Connexion</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding login-bg">
        <div class="login-wrapper animate__animated animate__zoomIn animate__delay-0_3s">
          <h2 class="animate__animated animate__fadeInDown animate__faster">Bienvenue 👋</h2>
  
          <ion-item lines="none" class="input-item animate__animated animate__fadeInLeft animate__delay-0_6s">
            <ion-input
              v-model="email"
              type="email"
              label="Email"
              label-placement="floating"
              required
            />
          </ion-item>
  
          <ion-item lines="none" class="input-item animate__animated animate__fadeInLeft animate__delay-0_9s">
            <ion-input
              v-model="password"
              type="password"
              label="Mot de passe"
              label-placement="floating"
              required
            />
          </ion-item>
  
          <ion-button expand="block" @click="login" color="primary" class="login-btn animate__animated animate__bounceIn animate__delay-1_2s">
            🚀 Se connecter
          </ion-button>
  
          <ion-button fill="clear" @click="goToRegister" class="ion-text-center animate__animated animate__fadeInUp animate__delay-1_5s">
            Pas encore inscrit ? Créer un compte
          </ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    toastController,
  } from '@ionic/vue'
  
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/state'
  import { loginUser } from '@/services/api'
  
  const router = useRouter()
  const store = useUserStore()
  
  const email = ref('')
  const password = ref('')
  
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
      const response = await loginUser({
        email: email.value,
        password: password.value,
      })
  
      const user = response.data
      store.setUser(user)
  
      const toast = await toastController.create({
        message: `Bienvenue ${user.firstName} !`,
        duration: 2500,
        color: 'success',
      })
      toast.present()
      setTimeout(() => {
        (document.activeElement as HTMLElement)?.blur()
      }, 100)
  
      router.push('/tabs')
    } catch (error: any) {
      const message =
        error?.response?.status === 401
          ? 'Email ou mot de passe incorrect.'
          : error?.response?.data || 'Erreur lors de la connexion.'
  
      const toast = await toastController.create({
        message,
        duration: 2500,
        color: 'danger',
      })
      toast.present()
    }
  }
  
  const goToRegister = () => {
    router.push('/register')
  }
  </script>
  
  <style scoped>
  .login-bg {
    background: linear-gradient(135deg, #e0eaff, #f3f7ff);
    min-height: 100%;
  }
  
  .login-wrapper {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    padding: 30px 20px;
    max-width: 420px;
    margin: 60px auto;
    transition: all 0.3s ease-in-out;
    text-align: center;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    font-weight: 600;
    color: #333;
  }
  
  .input-item {
    margin-bottom: 16px;
  }
  
  ion-input {
    --background: white;
    --padding-start: 12px;
    --border-radius: 12px;
    --highlight-color-focused: var(--ion-color-primary);
  }
  
  .login-btn {
    --border-radius: 14px;
    font-weight: bold;
    letter-spacing: 0.5px;
    transform: scale(1);
    transition: transform 0.2s ease;
  }
  
  .login-btn:active {
    transform: scale(0.96);
  }
  </style>
  