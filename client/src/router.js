import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home.vue';
import CadastroEdicaoPacienteView from '@/views/Paciente/CadastroEdicaoPaciente.vue';
import PacienteView from '@/views/Paciente/Paciente.vue';
import UsuarioView from '@/views/Usuario/Usuario.vue';
import CadastroEdicaoUsuarioView from '@/views/Usuario/CadastroEdicaoUsuario.vue';
import RelatorioListaRelatorioView from '@/views/Relatorio/Relatorio.vue';
import CadastroEdicaoRelatorioView from '@/views/Relatorio/CadastroEdicaoRelatorio.vue';
import LoginScreen from '@/views/Login/Login.vue'
import CadastroUsuarioView from '@/views/Login/CadastroUsuario.vue'
import EdicaoUsuarioView from '@/views/Usuario/EdicaoUsuario.vue'
import store from './vuex'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginScreen,
    },
    {
        path: '/home',
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
        component: CadastroEdicaoPacienteView,
    },
    {
        path: '/usuario',
        name: 'usuario',
        component: UsuarioView
    },
    {
        path: '/usuario/cadastroedicao/:codigoUsuario',
        name: 'cadastroedicaousuario',
        component: CadastroEdicaoUsuarioView,
    },
    {
        path: '/relatorio/:codigoPaciente',
        name: 'relatoriolistarelatorio',
        component: RelatorioListaRelatorioView,
    },
    {
        path: '/relatorio/cadastroedicao/:codigoRelatorio',
        name: 'cadastroedicaorelatorio',
        component: CadastroEdicaoRelatorioView,
    },
    {
        path: '/cadastrousuario',
        name: 'cadastrousuario',
        component: CadastroUsuarioView,
    },
    {
        path: '/edicaousuario',
        name: 'edicaousuario',
        component: EdicaoUsuarioView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(!store.getters.isLoggedIn && to.path !== '/' && to.path !== '/cadastrousuario')
        next({ name: 'Login' })
    else if(store.getters.isLoggedIn && ((to.path == '/')||(to.path == '/cadastrousuario')))
        next({ name: 'home' })
    else
        next()
  })


export default router;