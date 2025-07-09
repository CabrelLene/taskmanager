<template>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button color="primary">
        🎨
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button @click="changerTheme('dark')">🌙</ion-fab-button>
        <ion-fab-button @click="changerTheme('pastel')">🍬</ion-fab-button>
        <ion-fab-button @click="changerTheme('neon')">⚡</ion-fab-button>
        <ion-fab-button @click="changerTheme('classic')">🧑‍💼</ion-fab-button>
      </ion-fab-list>
    </ion-fab>
  </template>
  
  <script setup lang="ts">
  import { IonFab, IonFabButton, IonFabList } from '@ionic/vue'
  
  const changerTheme = (theme: string) => {
    // Retirer les anciens thèmes
    document.body.classList.remove('theme-dark', 'theme-pastel', 'theme-neon', 'theme-classic')
    document.body.classList.add(`theme-${theme}`)
    localStorage.setItem('theme', theme)
  }
  </script>
  