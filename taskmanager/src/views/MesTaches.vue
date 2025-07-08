<template>
    <ion-page>
      <ion-header translucent>
        <ion-toolbar color="primary">
          <ion-title>Mes tâches</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding animate__animated animate__fadeIn">
        <ion-button expand="block" @click="toggleForm = !toggleForm" color="success" class="ion-margin-bottom animate__animated animate__fadeInUp">
          {{ toggleForm ? 'Annuler' : 'Nouvelle tâche' }}
        </ion-button>
  
        <div v-if="toggleForm" class="form-zone animate__animated animate__fadeInUp">
          <ion-item lines="none">
            <ion-input v-model="newTitle" label="Titre" label-placement="floating" required />
          </ion-item>
          <ion-item lines="none">
            <ion-textarea v-model="newDescription" label="Description" label-placement="floating" />
          </ion-item>
          <ion-button expand="block" color="primary" @click="ajouterTache">
            Ajouter
          </ion-button>
        </div>
  
        <div v-if="mesTaches.length === 0" class="ion-text-center ion-padding-top">
          <p>Aucune tâche active</p>
        </div>
  
        <div>
          <TaskCard
            v-for="task in mesTaches"
            :key="task.taskId"
            :task="task"
            @updated="chargerTaches"
            @deleted="chargerTaches"
          />
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
    IonButton,
    IonItem,
    IonInput,
    IonTextarea,
    toastController,
  } from '@ionic/vue'
  
  import { onIonViewWillEnter } from '@ionic/vue'
  import { ref } from 'vue'
  import { getTasksByUserId, addTask } from '@/services/api'
  import { useUserStore } from '@/store/state'
  import TaskCard from '@/components/TaskCard.vue'
  
  const store = useUserStore()
  
  const mesTaches = ref<any[]>([])
  const toggleForm = ref(false)
  const newTitle = ref('')
  const newDescription = ref('')
  
  const chargerTaches = async () => {
    try {
      const res = await getTasksByUserId(store.userId)
      mesTaches.value = res.data.tasks
        .filter((t: any) => t.isOwner && !t.isDone)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (e) {
      const toast = await toastController.create({
        message: 'Erreur de chargement des tâches.',
        duration: 2000,
        color: 'danger',
      })
      toast.present()
    }
  }
  
  const ajouterTache = async () => {
    if (!newTitle.value.trim()) return
  
    await addTask({
      userId: store.userId,
      title: newTitle.value,
      description: newDescription.value,
    })
  
    newTitle.value = ''
    newDescription.value = ''
    toggleForm.value = false
    await chargerTaches()
  }
  
  onIonViewWillEnter(() => {
    chargerTaches()
  })
  </script>
  
  <style scoped>
  .form-zone {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 18px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;
  }
  
  ion-input,
  ion-textarea {
    --border-radius: 12px;
    --background: #fff;
    --padding-start: 12px;
  }
  </style>
  