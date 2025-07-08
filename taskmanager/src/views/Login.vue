<template>
    <ion-page>
      <ion-header translucent>
        <ion-toolbar color="primary">
          <ion-title>Connexion</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding animate__animated animate__fadeIn">
        <div class="form-wrapper">
          <ion-item>
            <ion-input
              v-model="email"
              type="email"
              label="Email"
              label-placement="floating"
              required
            ></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-input
              v-model="password"
              type="password"
              label="Mot de passe"
              label-placement="floating"
              required
            ></ion-input>
          </ion-item>
  
          <ion-button expand="block" @click="login" class="ion-margin-top" color="primary">
            Se connecter
          </ion-button>
  
          <ion-button fill="clear" @click="goToRegister" class="ion-text-center">
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
      store.setUser(user) // ✅ Appel à l'action du store
  
      const toast = await toastController.create({
        message: `Bienvenue ${user.firstName} !`,
        duration: 2500,
        color: 'success',
      })
      toast.present()
  
      router.push('/tabs')
    } catch (error: any) {
      console.error('Erreur login :', error)
      const toast = await toastController.create({
        message: 'Identifiants invalides ou erreur serveur.',
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
  .form-wrapper {
    max-width: 400px;
    margin: auto;
    padding-top: 30px;
  }
  </style>
  