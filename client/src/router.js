import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home.vue';
import CadastroEdicaoPacienteView from '@/views/Paciente/CadastroEdicaoPaciente.vue';
import PacienteView from '@/views/Paciente/ListaPaciente.vue';
import UsuarioView from '@/views/Usuario/ListaUsuario.vue';
import RelatorioListaRelatorioView from '@/views/Relatorio/ListaRelatorio.vue';
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
        path: '/Home',
        name: 'home',
        component: HomeView
    },
    {
        path: '/ListaPaciente',
        name: 'paciente',
        component: PacienteView
    },
    {
        path: '/Paciente/CadastroEdicao/:codigoPaciente',
        name: 'cadastroedicaopaciente',
        component: CadastroEdicaoPacienteView,
    },
    {
        path: '/ListaUsuario',
        name: 'listausuario',
        component: UsuarioView
    },
    {
        path: '/ListaRelatorio/:codigoPaciente',
        name: 'listarelatorio',
        component: RelatorioListaRelatorioView,
    },
    {
        path: '/Relatorio/CadastroEdicao/:codigoRelatorio',
        name: 'cadastroedicaorelatorio',
        component: CadastroEdicaoRelatorioView,
    },
    {
        path: '/Usuario/Cadastro',
        name: 'cadastrousuario',
        component: CadastroUsuarioView,
    },
    {
        path: '/Usuario/Edicao',
        name: 'edicaousuario',
        component: EdicaoUsuarioView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(!store.getters.isLoggedIn && to.path !== '/' && to.path !== '/Usuario/Cadastro')
        next({ name: 'Login' })
    else if(store.getters.isLoggedIn && ((to.path == '/')||(to.path == '/Usuario/Cadastro')))
        next({ name: 'home' })
    else if(!store.getters.isAdmin && to.path == '/ListaUsuario' )
        next({ name: 'home' })
    else
        next()
  })


export default router;