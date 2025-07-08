import { createApp } from 'vue'
import App from './App.vue'
import { IonicVue } from '@ionic/vue'
import { createPinia } from 'pinia'
import router from './router'

/* Ionic core CSS */
import '@ionic/vue/css/core.css'

/* Basic CSS */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional utility CSS */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Animations & thème */
import 'animate.css'
import './theme/variables.css'
import './theme/global.css'

const app = createApp(App)

app.use(IonicVue)
app.use(createPinia())
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
