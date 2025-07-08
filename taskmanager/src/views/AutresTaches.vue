<template>
    <ion-page>
      <ion-header translucent>
        <ion-toolbar color="primary">
          <ion-title>Autres tâches</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding animate__animated animate__fadeIn">
        <div v-if="autresTaches.length === 0" class="ion-text-center ion-padding-top">
          <p>Aucune tâche partagée par d'autres utilisateurs.</p>
        </div>
  
        <div>
          <TaskCard
            v-for="task in autresTaches"
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
    toastController,
  } from '@ionic/vue'
  
  import { onIonViewWillEnter } from '@ionic/vue'
  import { ref } from 'vue'
  import { getTasksByUserId } from '@/services/api'
  import { useUserStore } from '@/store/state'
  import TaskCard from '@/components/TaskCard.vue'
  
  const store = useUserStore()
  const autresTaches = ref<any[]>([])
  
  const chargerTaches = async () => {
    try {
      const res = await getTasksByUserId(store.userId)
      autresTaches.value = res.data.tasks
        .filter((t: any) => !t.isOwner && !t.isDone)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (e) {
      const toast = await toastController.create({
        message: 'Erreur de chargement.',
        duration: 2000,
        color: 'danger',
      })
      toast.present()
    }
  }
  
  onIonViewWillEnter(() => {
    chargerTaches()
  })
  </script>
  
  <style scoped>
  /* rien de spécial ici : le design est hérité du layout global */
  </style>
  