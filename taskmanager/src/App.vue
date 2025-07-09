<template>
  <ion-app>
    <ion-router-outlet />
    <ThemeSelector />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import ThemeSelector from '@/components/ThemeSelector.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/store/state'

// 🔁 Restaurer session au chargement
onMounted(() => {
  const store = useUserStore()
  store.restoreUserFromStorage()
})
</script>

<style scoped>
/* Facultatif : animation d’apparition globale */
ion-app {
  animation: fadeInGlobal 0.6s ease-in-out;
}

@keyframes fadeInGlobal {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
