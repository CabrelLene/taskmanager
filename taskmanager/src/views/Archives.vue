<template>
    <ion-page>
      <ion-header translucent>
        <ion-toolbar color="primary">
          <ion-title>Archivées</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding animate__animated animate__fadeIn">
        <div v-if="archives.length === 0" class="ion-text-center">
          <p>Aucune tâche archivée.</p>
        </div>
  
        <ion-card
          v-for="t in archives"
          :key="t.taskId"
          class="task-card animate__animated animate__fadeInUp"
        >
          <ion-card-header>
            <ion-card-title>{{ t.title }}</ion-card-title>
            <ion-card-subtitle>{{ formatDate(t.date) }}</ion-card-subtitle>
          </ion-card-header>
  
          <ion-card-content>
            <p>{{ t.description }}</p>
            <p class="proprio">✔️ {{ t.firstName }} {{ t.lastName }}</p>
          </ion-card-content>
        </ion-card>
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  } from '@ionic/vue'
  
  import { onIonViewWillEnter } from '@ionic/vue'
  import { ref } from 'vue'
  import { getTasksByUserId } from '@/services/api'
  import { useUserStore } from '@/store/state'
  
  const archives = ref<any[]>([])
  const store = useUserStore()
  
  const chargerTaches = async () => {
    const res = await getTasksByUserId(store.userId)
    archives.value = res.data.tasks
      .filter((t: any) => t.isDone)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString()
  }
  
  onIonViewWillEnter(() => {
    chargerTaches()
  })
  </script>
  
  <style scoped>
  .task-card {
    backdrop-filter: blur(10px);
    background: rgba(240, 240, 240, 0.9);
    border-radius: 16px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    margin-bottom: 16px;
  }
  .proprio {
    margin-top: 10px;
    font-weight: 500;
    color: #222;
  }
  </style>
  