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

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


library.add(faPen)
library.add(faTrash)
library.add(faPlus)
library.add(faBars)
library.add(faHospitalUser)

createApp(App)
    .use(VueSweetalert2)
    .use(router)
    .use(moment)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('chartComponent', Echarts)
    .mount('#app')

import "bootstrap/dist/js/bootstrap.js"