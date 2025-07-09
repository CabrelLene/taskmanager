<template>
  <ion-card
    class="task-card animate__animated animate__fadeInUp"
    :class="{ urgent: task.priority === 'Haute' }"
  >
    <ion-card-header class="header">
      <ion-card-title>
        {{ task.title }}
        <span v-if="isDueToday" class="badge-warning" title="Échéance aujourd’hui">⚠️</span>
      </ion-card-title>

      <div class="priority-icon">
        <span v-if="task.priority === 'Haute'" title="Haute priorité">🔴</span>
        <span v-else-if="task.priority === 'Normale'" title="Priorité normale">🟡</span>
        <span v-else title="Basse priorité">🟢</span>
      </div>
    </ion-card-header>

    <ion-card-content>
      <p v-if="task.description">{{ task.description }}</p>
      <p v-if="task.dueDate" class="date-info">
        📅 Échéance : {{ formatDate(task.dueDate) }}
      </p>
      <p v-if="!task.isOwner && task.firstName && task.lastName" class="assigned-user">
        👤 Assignée par : <strong>{{ task.firstName }} {{ task.lastName }}</strong>
      </p>
    </ion-card-content>

    <ion-row class="ion-justify-content-between ion-padding-horizontal">
      <template v-if="task.isOwner">
        <ion-button
          v-if="task.isDone"
          size="small"
          fill="outline"
          color="warning"
          @click="desarchiverTache"
        >
          ♻️ Désarchiver
        </ion-button>
        <ion-button
          v-else
          size="small"
          fill="outline"
          color="success"
          @click="marquerCommeFait"
        >
          ✅ Terminé
        </ion-button>

        <ion-button size="small" fill="outline" color="medium" @click="openEditModal">
          ✏️ Modifier
        </ion-button>

        <ion-button size="small" fill="outline" color="danger" @click="supprimerTache">
          🗑️ Supprimer
        </ion-button>
      </template>
      <template v-else>
        <ion-badge color="light" class="readonly-badge">👀 Lecture seule</ion-badge>
      </template>
    </ion-row>

    <!-- 🌟 Modal moderne -->
    <ion-modal :is-open="showModal" @did-dismiss="closeModal" class="custom-modal">
      <ion-content class="modal-glass animate__animated animate__fadeIn">
        <div class="modal-wrapper">
          <h3 class="modal-title">✏️ Modifier la tâche</h3>

          <ion-item lines="none" class="modal-item">
            <ion-input v-model="editTitle" label="Titre" label-placement="floating" />
          </ion-item>

          <ion-item lines="none" class="modal-item">
            <ion-textarea v-model="editDescription" label="Description" label-placement="floating" />
          </ion-item>

          <ion-item lines="none" class="modal-item">
            <ion-select v-model="editPriority" label="Priorité" label-placement="floating">
              <ion-select-option value="Haute">🔴 Haute</ion-select-option>
              <ion-select-option value="Normale">🟡 Normale</ion-select-option>
              <ion-select-option value="Basse">🟢 Basse</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none" class="modal-item">
            <ion-datetime
              v-model="editDueDate"
              label="Échéance"
              label-placement="floating"
              presentation="date-time"
              hour-cycle="h23"
            />
          </ion-item>

          <ion-button expand="block" color="success" class="modal-btn" @click="validerEdition">
            💾 Enregistrer
          </ion-button>
          <ion-button expand="block" fill="clear" color="danger" @click="closeModal">
            ❌ Annuler
          </ion-button>
        </div>
      </ion-content>
    </ion-modal>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonButton,
  IonModal,
  IonInput,
  IonTextarea,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonBadge,
  IonContent,
} from '@ionic/vue'
import { ref, computed } from 'vue'
import { deleteTask, updateTask } from '@/services/api'
import { useUserStore } from '@/store/state'

const emit = defineEmits(['updated', 'deleted'])
const store = useUserStore()

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const isDueToday = computed(() => {
  if (!props.task.dueDate) return false
  const today = new Date().toISOString().slice(0, 10)
  return props.task.dueDate.startsWith(today)
})

const formatDate = (iso: string) => {
  const date = new Date(iso)
  return `${date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })} à ${date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })}`
}

// ✅ Marquer comme terminé
const marquerCommeFait = async () => {
  await updateTask({
    userId: store.userId,
    taskId: props.task.taskId,
    isDone: true,
  })
  emit('updated')
}

// ♻️ Désarchiver
const desarchiverTache = async () => {
  await updateTask({
    userId: store.userId,
    taskId: props.task.taskId,
    isDone: false,
  })
  emit('updated')
}

// ❌ Supprimer
const supprimerTache = async () => {
  await deleteTask({
    userId: store.userId,
    taskId: props.task.taskId,
  })
  emit('deleted')
}

// ✏️ Édition
const showModal = ref(false)
const editTitle = ref(props.task.title)
const editDescription = ref(props.task.description)
const editPriority = ref(props.task.priority || 'Normale')
const editDueDate = ref(props.task.dueDate || '')

const openEditModal = () => {
  editTitle.value = props.task.title
  editDescription.value = props.task.description
  editPriority.value = props.task.priority || 'Normale'
  editDueDate.value = props.task.dueDate || ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const validerEdition = async () => {
  await updateTask({
    userId: store.userId,
    taskId: props.task.taskId,
    title: editTitle.value,
    description: editDescription.value,
    priority: editPriority.value,
    dueDate: editDueDate.value,
  })
  closeModal()
  emit('updated')
}
</script>

<style scoped>
.task-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  transition: all 0.3s ease;
}
.task-card.urgent {
  box-shadow: 0 0 10px 2px rgba(255, 0, 0, 0.4);
  border: 1px solid rgba(255, 0, 0, 0.2);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.priority-icon {
  font-size: 1.3rem;
}
.date-info {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #333;
}
.assigned-user {
  margin-top: 10px;
  font-size: 0.85rem;
  color: #555;
}
.badge-warning {
  margin-left: 8px;
  font-size: 1rem;
  color: #e74c3c;
  animation: pulse 1.5s infinite;
}
.readonly-badge {
  font-size: 0.8rem;
  margin: 4px auto;
  padding: 6px;
  background-color: rgba(200, 200, 200, 0.3);
  border-radius: 12px;
}
@keyframes pulse {
  0% { transform: scale(1); }
  70% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.custom-modal::part(backdrop) {
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.25);
}
.modal-glass {
  --background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 20px;
}
.modal-wrapper {
  max-width: 420px;
  margin: auto;
  padding: 16px;
}
.modal-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 18px;
  text-align: center;
  color: #333;
}
.modal-item {
  margin-bottom: 14px;
  --border-radius: 12px;
  --background: #fff;
}
.modal-btn {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 12px;
}
</style>
