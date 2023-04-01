// npm install @fortawesome/free-solid-svg-icons
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas }             from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

config.autoAddCss = false
library.add(fas)


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})