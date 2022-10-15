<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="showNavbar">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/Home" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Usuario" class="nav-link">Usuário</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Paciente" class="nav-link">Paciente</router-link>
                </li>
            </ul>
        </div>
        <a style="color:gray; margin-right: 5px;">Bem vindo</a>
        <a style="color:gray; margin-right: 5px; font-weight: 600;">{{getNomeUsuarioLogado()}}</a>
        <a style="color:#628E90; margin-right: 30px; cursor: pointer;" @click="logout">(Sair)</a>
    </nav>
    <router-view></router-view>

</template>

<script>

export default {
        name: 'App',
        data(){
            return{
                showNavbar: true,
            }
        },
        methods:{
            logout(){
                this.$store.commit('logout')
                this.$router.push('/')
            },
            getNomeUsuarioLogado(){
                return this.$store.getters.getUsuario.nome
            }
        },
        watch: {
            $route(to) {
                if(to.path === '/')
                    this.showNavbar = false
                else
                    this.showNavbar = true
            }
        },
}
</script>

<style>
    li {
        margin:10px;  
    }
    a {
        text-decoration: none;
    }

    nav {
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
        color: antiquewhite;
        width: 100vw;
    }

    #content {
        width: 100vw;
        height: 100vh;
        background-color: white;
        opacity: 1.0;
        display: inline-table;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
        padding:30px;
    }

    .primaryColor{
        color:#628E90 !important;
    }

    .secondaryColor{
        color: #3C2317 !important;
    }

    .primaryColorBtn{
        background-color: #4C6793 !important;
        border-color:#4C6793!important;
    }

    .primaryColorBtn2{
        background-color: #628E90 !important;
        border-color:#628E90!important;
    }

    .spanErro{
        color:red!important;
        font-size: small;
        float:left;
    }

    .form-check-input:checked {
        background-color: #4C6793 !important;
        border-color: #4C6793 !important;
    }
  
</style>
