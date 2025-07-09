<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="glass-toolbar">
        <ion-title>📝 Mes tâches</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-bg animate__animated animate__fadeIn" :scroll-y="true">
      <div class="ion-padding">
        <ion-button
          expand="block"
          @click="toggleForm = !toggleForm"
          color="success"
          class="animate__animated animate__fadeInUp"
        >
          {{ toggleForm ? 'Annuler' : '➕ Nouvelle tâche' }}
        </ion-button>

        <!-- 🧊 Formulaire -->
        <div v-if="toggleForm" class="form-zone animate__animated animate__zoomIn">
          <ion-item lines="none">
            <ion-input
              v-model="newTitle"
              label="Titre"
              label-placement="floating"
              required
            />
          </ion-item>

          <ion-item lines="none">
            <ion-textarea
              v-model="newDescription"
              label="Description"
              label-placement="floating"
            />
          </ion-item>

          <ion-item lines="none">
            <ion-select
              v-model="newPriority"
              label="Priorité"
              label-placement="floating"
            >
              <ion-select-option value="Haute">🔴 Haute</ion-select-option>
              <ion-select-option value="Normale">🟡 Normale</ion-select-option>
              <ion-select-option value="Basse">🟢 Basse</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none">
            <ion-datetime
              v-model="newDueDate"
              label="Échéance"
              label-placement="floating"
              presentation="date-time"
              hour-cycle="h23"
              show-default-buttons
            />
          </ion-item>

          <ion-button expand="block" color="primary" @click="ajouterTache">
            ✅ Ajouter
          </ion-button>
        </div>

        <!-- 📭 Liste tâches -->
        <div v-if="mesTaches.length === 0" class="empty-state">
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_1pxqjqps.json"
            background="transparent"
            speed="1"
            style="width: 180px; height: 180px; margin-bottom: 20px"
            loop
            autoplay
          ></lottie-player>
          <p>Aucune tâche active pour l’instant</p>
        </div>

        <div class="task-list">
          <TaskCard
            v-for="task in mesTaches"
            :key="task.taskId"
            :task="task"
            @updated="chargerTaches"
            @deleted="chargerTaches"
          />
        </div>
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
  IonSelect,
  IonSelectOption,
  IonDatetime,
  toastController,
} from '@ionic/vue'

import { ref, onMounted } from 'vue'
import { onIonViewWillEnter } from '@ionic/vue'
import { getTasksByUserId, addTask } from '@/services/api'
import { useUserStore } from '@/store/state'
import TaskCard from '@/components/TaskCard.vue'

const store = useUserStore()

const mesTaches = ref<any[]>([])
const toggleForm = ref(false)
const newTitle = ref('')
const newDescription = ref('')
const newPriority = ref('Normale')
const newDueDate = ref('')

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
    priority: newPriority.value,
    dueDate: newDueDate.value || null,
  })

  newTitle.value = ''
  newDescription.value = ''
  newPriority.value = 'Normale'
  newDueDate.value = ''
  toggleForm.value = false
  await chargerTaches()
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
  --background: linear-gradient(to right top, #fceabb, #f8b500);
}

.glass-toolbar {
  --background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  --box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 0 0 16px 16px;
}

.form-zone {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 18px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  margin-top: 14px;
  margin-bottom: 20px;
}

ion-input,
ion-textarea,
ion-select,
ion-datetime {
  --border-radius: 12px;
  --background: #fff;
  --padding-start: 12px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
  color: #444;
  text-align: center;
}

.empty-state p {
  font-size: 1rem;
  margin-top: 10px;
  font-style: italic;
}
</style>
