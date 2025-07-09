<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-title>Autres tâches</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding animate__animated animate__fadeIn fond-degrade">
      <div v-if="autresTaches.length === 0" class="zone-vide">
        <!-- 🎞 Lottie d’illustration -->
        <lottie-player
          src="https://assets4.lottiefiles.com/packages/lf20_fp7svyno.json"
          background="transparent"
          speed="1"
          style="width: 220px; height: 220px"
          loop
          autoplay
        ></lottie-player>
        <p>Aucune tâche à afficher pour le moment.</p>
      </div>

      <div class="zone-taches">
        <TaskCard
          v-for="task in autresTaches"
          :key="task.taskId"
          :task="task"
          :editable="false"
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
  toastController
} from '@ionic/vue'

import { ref, onMounted } from 'vue'
import { onIonViewWillEnter } from '@ionic/vue'
import { getTasksByUserId } from '@/services/api'
import { useUserStore } from '@/store/state'
import TaskCard from '@/components/TaskCard.vue'

// ✅ Lottie
onMounted(() => {
  import('@lottiefiles/lottie-player')
})

const autresTaches = ref<any[]>([])
const store = useUserStore()

const chargerTaches = async () => {
  try {
    const res = await getTasksByUserId(store.userId)
    autresTaches.value = res.data.tasks
      .filter((t: any) => !t.isOwner && !t.isDone)
      .map((t: any) => ({
        ...t,
        priority: t.priority || 'Normale',
      }))
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

onIonViewWillEnter(() => {
  chargerTaches()
})
</script>

<style scoped>
.fond-degrade {
  --background: none;
  background: linear-gradient(145deg, #e0eafc, #cfdef3);
  min-height: 100%;
}

.zone-vide {
  text-align: center;
  padding-top: 40px;
  color: #555;
  font-style: italic;
}

.zone-taches {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
}
</style>
