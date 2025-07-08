<template>
    <ion-page>
      <ion-header translucent>
        <ion-toolbar color="primary">
          <ion-title>Créer un compte</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding animate__animated animate__fadeIn">
        <div class="form-wrapper animate__animated animate__fadeInUp">
          <ion-item lines="none">
            <ion-input
              v-model="firstName"
              label="Prénom"
              label-placement="floating"
              required
            />
          </ion-item>
  
          <ion-item lines="none">
            <ion-input
              v-model="lastName"
              label="Nom"
              label-placement="floating"
              required
            />
          </ion-item>
  
          <ion-item lines="none">
            <ion-input
              v-model="email"
              type="email"
              label="Email"
              label-placement="floating"
              required
            />
          </ion-item>
  
          <ion-item lines="none">
            <ion-input
              v-model="password"
              type="password"
              label="Mot de passe"
              label-placement="floating"
              required
            />
          </ion-item>
  
          <ion-button expand="block" @click="register" class="ion-margin-top" color="success">
            S'inscrire
          </ion-button>
  
          <ion-button fill="clear" @click="goToLogin" class="ion-text-center">
            Déjà un compte ? Se connecter
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
  import { registerUser } from '@/services/api'
  
  const router = useRouter()
  
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const password = ref('')
  
  const register = async () => {
    if (!firstName.value || !lastName.value || !email.value || !password.value) {
      const toast = await toastController.create({
        message: 'Veuillez remplir tous les champs.',
        duration: 2000,
        color: 'warning',
      })
      toast.present()
      return
    }
  
    try {
      const response = await registerUser({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      })
  
      const toast = await toastController.create({
        message: 'Inscription réussie ! Veuillez vous connecter.',
        duration: 2500,
        color: 'success',
      })
      toast.present()
  
      // Blurer pour éviter les erreurs aria
      setTimeout(() => {
        (document.activeElement as HTMLElement)?.blur()
      }, 100)
  
      router.push('/login')
    } catch (error: any) {
      console.error('❌ Erreur register :', error)
  
      const toast = await toastController.create({
        message:
          error?.response?.data || 'Erreur lors de l’inscription.',
        duration: 2500,
        color: 'danger',
      })
      toast.present()
    }
  }
  
  const goToLogin = () => {
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .form-wrapper {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(10px);
    padding: 24px;
    border-radius: 18px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    max-width: 420px;
    margin: 60px auto;
    transition: all 0.3s ease;
  }
  
  ion-input {
    --highlight-color-focused: var(--ion-color-primary);
    --border-radius: 12px;
    --box-shadow: none;
    --background: #ffffff;
  }
  </style>
  