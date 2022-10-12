<template>
    <div>
        <br>
        <input id="email" class="form-control" placeholder="Email" v-model="email" style="margin-right: 10px;margin-left: 80px; width: 500px;">
        <br>
        <input id="password" class="form-control" placeholder="Senha" v-model="senha" type="password" style="margin-right: 10px; margin-left: 80px; width: 500px;">
        <br>
        <button type="button" class="btn btn-primary primaryColorBtn" @click="Entrar" style="margin-right: 10px; margin-left: 205px; width: 250px;">
            Entrar
    </button>
    </div>
</template>

<script>
import axios from 'axios'
import HomeView from './Home.vue'
  export default {
    name: 'LoginScreen',
    components: HomeView,
    data(){
        return{
            email: "",
            senha: ""
        }
    },
    methods: {
        Entrar(){
            // tapa buraco enquanto não consigo conversar com o banco de dados para verificar a senha e o email
            axios.post('http://localhost:4000/login', {login:'teste',senha:'teste'}).then( (result) => {
                        console.log(result)
                   })
        }
  }
}
</script>

<style>
</style>