import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Echarts from 'vue-echarts';


library.add(faPen)
library.add(faTrash)
library.add(faPlus)
library.add(faBars)
library.add(faHospitalUser)

createApp(App)
    .use(router)
    .use(moment)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('chartComponent', Echarts)
    .mount('#app')

import "bootstrap/dist/js/bootstrap.js"