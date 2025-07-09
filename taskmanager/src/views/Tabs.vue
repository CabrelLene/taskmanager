<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet class="animate__animated animate__fadeIn" />

      <ion-tab-bar slot="bottom" class="tab-bar-custom glassy">
        <ion-tab-button tab="mes-taches" href="/tabs/mes-taches">
          <ion-icon :icon="checkmarkCircleOutline" />
          <ion-label>Mes tâches</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="autres" href="/tabs/autres">
          <ion-icon :icon="peopleOutline" />
          <ion-label>Autres</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="archives" href="/tabs/archives">
          <ion-icon :icon="archiveOutline" />
          <ion-label>Archivées</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/vue'

import {
  checkmarkCircleOutline,
  peopleOutline,
  archiveOutline,
} from 'ionicons/icons'
</script>

<style scoped>
.tab-bar-custom {
  --background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.1);
  padding: 8px 12px env(safe-area-inset-bottom);
  margin: 0 16px 16px;
  border-radius: 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  transition: all 0.3s ease;
}

/* Tab Button Style */
ion-tab-button {
  --color-selected: var(--ion-color-primary);
  color: #444;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  padding: 6px 4px;
}

ion-tab-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

ion-tab-button.tab-selected {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 8px rgba(100, 100, 255, 0.3);
}

/* Responsive icônes + texte */
ion-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

ion-label {
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
