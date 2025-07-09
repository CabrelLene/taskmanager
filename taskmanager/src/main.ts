import { createApp } from 'vue'
import App from './App.vue'
import { IonicVue } from '@ionic/vue'

import router from './router'
import { createPinia } from 'pinia'


/* Ionic core CSS */
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Thèmes et animations */
import 'animate.css'
import './theme/variables.css'
import './theme/global.css'
import './theme/theme-selector.css'
import './theme/theme-dark.css'
import './theme/theme-pastel.css'
import './theme/theme-neon.css'
import './theme/theme-classic.css'

// 🌈 Appliquer le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'classic'
document.body.classList.add(`theme-${savedTheme}`)

// ✅ Export pinia pour l'utiliser dans index.ts
export const pinia = createPinia()

const app = createApp(App)

app.use(IonicVue)
app.use(pinia)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
