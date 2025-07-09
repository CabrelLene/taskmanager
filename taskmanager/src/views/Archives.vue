<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="glass-toolbar">
        <ion-title>📦 Tâches archivées</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding page-bg animate__animated animate__fadeIn">
      <div v-if="tachesArchivees.length === 0" class="empty-state">
        <lottie-player
          src="https://assets2.lottiefiles.com/packages/lf20_jtbfg2nb.json"
          background="transparent"
          speed="1"
          style="width: 180px; height: 180px; margin: 0 auto"
          loop
          autoplay
        ></lottie-player>
        <p>Aucune tâche archivée pour le moment.</p>
      </div>

      <div class="task-list">
        <TaskCard
          v-for="task in tachesArchivees"
          :key="task.taskId"
          :task="task"
          @updated="retirerTache(task.taskId)"
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
import { ref, onMounted } from 'vue'
import { getTasksByUserId } from '@/services/api'
import { useUserStore } from '@/store/state'
import TaskCard from '@/components/TaskCard.vue'

const store = useUserStore()
const tachesArchivees = ref<any[]>([])

// 🔁 Charger toutes les tâches archivées (isDone = true)
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

// ✅ Supprimer une tâche désarchivée de la liste locale
const retirerTache = (taskId: string) => {
  tachesArchivees.value = tachesArchivees.value.filter(t => t.taskId !== taskId)
}

onIonViewWillEnter(() => {
  chargerTaches()
})

onMounted(() => {
  import('@lottiefiles/lottie-player')
})
</script>

<style scoped>
.page-bg {
  --background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
}

.glass-toolbar {
  --background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  color: #666;
  text-align: center;
}

.empty-state p {
  margin-top: 12px;
  font-size: 1rem;
  color: #888;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}
</style>
