<template>
    <ion-page>
      <ion-header translucent>
        <ion-toolbar color="primary">
          <ion-title>Archives</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding animate__animated animate__fadeIn">
        <div v-if="tachesArchivees.length === 0" class="ion-text-center ion-padding-top">
          <p>Aucune tâche archivée pour le moment.</p>
        </div>
  
        <div>
          <TaskCard
            v-for="task in tachesArchivees"
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
  const tachesArchivees = ref<any[]>([])
  
  const chargerTaches = async () => {
    try {
      const res = await getTasksByUserId(store.userId)
      tachesArchivees.value = res.data.tasks
        .filter((t: any) => t.isDone)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (e) {
      const toast = await toastController.create({
        message: 'Erreur lors du chargement.',
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
  /* style hérité de la base : clean & moderne */
  </style>
  