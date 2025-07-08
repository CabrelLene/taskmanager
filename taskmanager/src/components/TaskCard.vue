<template>
    <ion-card class="task-card animate__animated animate__fadeInUp">
      <ion-card-header>
        <ion-card-title>{{ task.title }}</ion-card-title>
        <ion-card-subtitle v-if="task.date">
          {{ new Date(task.date).toLocaleDateString() }}
        </ion-card-subtitle>
      </ion-card-header>
  
      <ion-card-content>
        <p class="description">
          {{ task.description || 'Aucune description' }}
        </p>
  
        <div class="actions">
          <ion-button
            fill="clear"
            color="success"
            @click="marquerCommeFaite"
          >
            <ion-icon :icon="checkmarkOutline" slot="icon-only" />
          </ion-button>
  
          <ion-button
            fill="clear"
            color="medium"
            @click="modifier = !modifier"
          >
            <ion-icon :icon="createOutline" slot="icon-only" />
          </ion-button>
  
          <ion-button
            fill="clear"
            color="danger"
            @click="supprimerTache"
          >
            <ion-icon :icon="trashOutline" slot="icon-only" />
          </ion-button>
        </div>
  
        <div v-if="modifier" class="edit-zone">
          <ion-item lines="none">
            <ion-input
              v-model="editedTitle"
              label="Titre"
              label-placement="floating"
            />
          </ion-item>
          <ion-item lines="none">
            <ion-textarea
              v-model="editedDescription"
              label="Description"
              label-placement="floating"
            />
          </ion-item>
          <ion-button expand="block" color="primary" @click="mettreAJour">
            Enregistrer
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
    IonIcon,
    IonItem,
    IonInput,
    IonTextarea,
    toastController,
  } from '@ionic/vue'
  
  import { ref } from 'vue'
  import {
    checkmarkOutline,
    trashOutline,
    createOutline,
  } from 'ionicons/icons'
  import { deleteTask, updateTask } from '@/services/api'
  import { useUserStore } from '@/store/state'
  
  const props = defineProps<{
    task: any
  }>()
  
  const emit = defineEmits(['updated', 'deleted'])
  
  const store = useUserStore()
  const modifier = ref(false)
  const editedTitle = ref(props.task.title)
  const editedDescription = ref(props.task.description)
  
  const supprimerTache = async () => {
    await deleteTask({
      userId: store.userId,
      taskId: props.task.taskId,
    })
    emit('deleted')
  }
  
  const marquerCommeFaite = async () => {
    await updateTask({
      userId: store.userId,
      taskId: props.task.taskId,
      isDone: true,
    })
    emit('updated')
  }
  
  const mettreAJour = async () => {
    if (!editedTitle.value.trim()) {
      const toast = await toastController.create({
        message: 'Le titre ne peut pas être vide.',
        duration: 2000,
        color: 'warning',
      })
      toast.present()
      return
    }
  
    await updateTask({
      userId: store.userId,
      taskId: props.task.taskId,
      title: editedTitle.value,
      description: editedDescription.value,
    })
    modifier.value = false
    emit('updated')
  }
  </script>
  
  <style scoped>
  .task-card {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.72);
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease;
    margin-bottom: 20px;
  }
  
  .task-card:hover {
    transform: translateY(-2px);
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
  }
  
  .description {
    font-size: 15px;
    line-height: 1.5;
    margin-top: 6px;
    color: #333;
  }
  
  .edit-zone {
    margin-top: 16px;
    background: rgba(255, 255, 255, 0.6);
    padding: 12px;
    border-radius: 12px;
    backdrop-filter: blur(6px);
  }
  </style>
  