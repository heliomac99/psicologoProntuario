import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home.vue';
import CadastroEdicaoPacienteView from '@/views/Paciente/CadastroEdicaoPaciente.vue';
import PacienteView from '@/views/Paciente/Paciente.vue';
import UsuarioView from '@/views/Usuario/Usuario.vue';
import CadastroEdicaoUsuarioView from '@/views/Usuario/CadastroEdicaoUsuario.vue';
import RelatorioListaRelatorioView from '@/views/Relatorio/Relatorio.vue';
import CadastroEdicaoRelatorioView from '@/views/Relatorio/CadastroEdicaoRelatorio.vue';




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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;