import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import CadastroEdicaoPacienteView from '@/views/CadastroEdicaoPaciente.vue'
import PacienteView from '@/views/Paciente.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/paciente',
    name: 'paciente',
    component: PacienteView
  },
  {
    path: '/paciente/cadastroedicao/:codigoPaciente',
    name: 'cadastroedicaopaciente',
    component: CadastroEdicaoPacienteView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
