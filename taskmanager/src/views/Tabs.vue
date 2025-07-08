<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet class="animate__animated animate__fadeIn" />
  
        <ion-tab-bar slot="bottom" color="light" class="tab-bar-custom">
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
    --background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.05);
    padding-bottom: env(safe-area-inset-bottom);
    border-radius: 16px 16px 0 0;
  }
  
  ion-tab-button {
    transition: transform 0.2s ease;
  }
  
  ion-tab-button:active {
    transform: scale(0.95);
  }
  </style>
  