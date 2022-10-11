<template>
    <br>
    <input id="email" class="form-control" placeholder="Email" style="margin-right: 10px;margin-left: 80px; width: 500px;">
    <br>
    <input id="password" class="form-control" placeholder="Senha" type="password" style="margin-right: 10px; margin-left: 80px; width: 500px;">
    <br>
    <button type="button" class="btn btn-primary primaryColorBtn" @click="Entrar" style="margin-right: 10px; margin-left: 205px; width: 250px;">
        Entrar
    </button>
</template>

<script>
//import axios from 'axios'
  export default {
    name: 'LoginScreen',
    data(){
        return{

        }
    },
    methods: {
        Entrar(){

        },
  }
}
</script>

<style>
</style>