<template>
    <div class="backGroundLogin">
        <div class="col-12" style="display:flex">
            <div class="divLogin login center">
                <div style="width:100%">
                    <h2 class="title primaryColor">Login</h2>  
                    <div>
                        <div class="form-group">
                                <input v-model="email" id="email" class="form-control" placeholder="E-mail">                                                    
                        </div>
                        <div class="form-group" style="display:block">
                                <input v-model="senha" id="senha" class="form-control" type="password" placeholder="Senha" v-on:keyup.enter="Entrar">
                                <div v-if="erros.login" style="display:contents">
                                    <span class="spanErro">{{erros.login.msg}}</span>   
                                </div>                                                      
                        </div>
                        <div style="display:flex; justify-content: center; margin-top:40px !important">
                            <button type="button" class="btn btn-primary primaryColorBtn mr-3" @click="Entrar">
                                Entrar
                            </button> 
                        </div> 
                        <div style="display:flex; justify-content: center; margin-top:50px !important">
                            <a @click="NovaConta" class="criarConta primaryColor">
                                Criar conta?
                            </a> 
                        </div>
                    </div>
                </div>
                
                
            </div>
            <div class="divLogin wallpaper"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'LoginScreen',
    data(){
        return{
            email: null,
            senha: null,
            erros: {},            
        }
    },
    methods: {
        Entrar(){
            this.erros = {}
            axios.post('http://localhost:4000/login', {email: this.email,senha: this.senha}).then( (result) => {
                    var usuarioLogado = result.data[0]
                    if(usuarioLogado.id > 0)
                    {
                        this.$store.commit('login', usuarioLogado)
                        this.$router.push('/home')
                    }
                    else{
                        this.erros.login = {msg:'Usuário ou senha inválidos.'}
                    }
                })
        },
        NovaConta(){
            console.log('teste')
            this.$router.push('/cadastrousuario')
        }
  },
}
</script>

<style>
    .divLogin{
        height: 100vh;
    }
    .title{
        margin-bottom:50px;
        text-align: center;
    }
    .login{
        width: 600px!important;
        padding: 170px 55px 55px;
    }
    .center{
        display: flex;
        justify-content: center;
    }

    .criarConta{
        text-decoration: none !important;
        cursor: pointer;
    }

    .row{
        background: rgb(193, 218, 223);
        border-radius: 30px;
    }
    .img{
        border-top-left-radius: 30px;
        border-bottom-right-radius: 30px;
    }
    .centerInput{
        text-align: center;
    }

    .wallpaper{
        background-image: url(../../assets/wallpaper.jpg); 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        width: 100vw;
    } 

</style>