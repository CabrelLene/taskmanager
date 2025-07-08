<template>
    <ion-card class="task-card animate__animated animate__fadeInUp">
      <ion-card-header>
        <ion-card-title>{{ task.title }}</ion-card-title>
        <ion-card-subtitle>{{ formatDate(task.date) }}</ion-card-subtitle>
      </ion-card-header>
  
      <ion-card-content>
        <p>{{ task.description }}</p>
        <div class="btn-zone">
          <ion-button
            size="small"
            fill="outline"
            color="medium"
            @click="toggleIsDone"
            v-if="task.isOwner"
          >
            Terminer
          </ion-button>
          <ion-button
            size="small"
            fill="outline"
            color="danger"
            @click="supprimer"
            v-if="task.isOwner"
          >
            Supprimer
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script setup lang="ts">
  import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    toastController,
  } from '@ionic/vue'
  import { updateTask, deleteTask } from '@/services/api'
  import { useUserStore } from '@/store/state'
  
  const props = defineProps<{ task: any }>()
  const emit = defineEmits(['updated', 'deleted'])
  const store = useUserStore()
  
  const toggleIsDone = async () => {
    try {
      await updateTask({
        userId: store.userId,
        taskId: props.task.taskId,
        isDone: true,
      })
      const toast = await toastController.create({
        message: 'Tâche terminée !',
        duration: 1500,
        color: 'success',
      })
      toast.present()
      emit('updated')
    } catch (e) {
      const toast = await toastController.create({
        message: 'Erreur lors de la mise à jour.',
        duration: 2000,
        color: 'danger',
      })
      toast.present()
    }
  }
  
  const supprimer = async () => {
    try {
      await deleteTask({
        userId: store.userId,
        taskId: props.task.taskId,
      })
      const toast = await toastController.create({
        message: 'Tâche supprimée.',
        duration: 1500,
        color: 'danger',
      })
      toast.present()
      emit('deleted')
    } catch (e) {
      const toast = await toastController.create({
        message: 'Erreur lors de la suppression.',
        duration: 2000,
        color: 'danger',
      })
      toast.present()
    }
  }
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString()
  }
  </script>
  
  <style scoped>
  .task-card {
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
    transition: transform 0.2s ease;
  }
  .task-card:hover {
    transform: scale(1.01);
  }
  .btn-zone {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  </style>
  