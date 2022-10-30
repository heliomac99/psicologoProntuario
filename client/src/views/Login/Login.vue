<template>
    <div class="backGroundLogin">
        <div class="col-12" style="display:flex">
            <div class="divLogin login center">
                <div style="width:100%">
                    <h2 class="title primaryColor">Login</h2>  
                    <div>
                        <ValidationForm :model="login" ref="validation" @save="Entrar(login)">
                            <div class="form-group" style="display:block">
                                    <input v-model="login.email" id="email" class="form-control" placeholder="E-mail"> 
                                    <span name="email" class="spanErro"></span>                                                      
                            </div>
                            <div class="form-group" style="display:block">
                                    <input v-model="login.senha" id="senha" class="form-control" type="password" placeholder="Senha" v-on:keyup.enter="Entrar">
                                    <span name="senha" class="spanErro"></span>                                                         
                            </div>
                            <div style="display:flex; justify-content: center; margin-top:40px !important">
                                <button type="submit" class="btn btn-primary primaryColorBtn mr-3">
                                    Entrar
                                </button> 
                            </div> 
                            <div style="display:flex; justify-content: center; margin-top:50px !important">
                                <a @click="NovaConta" class="criarConta primaryColor">
                                    Criar conta?
                                </a> 
                            </div>
                        </ValidationForm>
                    </div>
                </div>
                
                
            </div>
            <div class="divLogin wallpaper"></div>
        </div>
    </div>
</template>

<script>
import ValidationForm from '../../components/ValidationForm.vue'
import axios from 'axios'
  export default {
    name: 'LoginScreen',
    components: { ValidationForm },
    data(){
        return{
            login: {
                email: null,
                senha: null,
            }        
        }
    },
    methods: {
        Entrar(login){
            axios.post('http://localhost:4000/login', {email: login.email,senha: login.senha}).then( (result) => {
                    var usuarioLogado = result.data[0]
                    if(usuarioLogado.id > 0) {
                        this.$store.commit('login', usuarioLogado)
                        this.$router.push('/home')
                    }
                    else {
                        this.$refs.validation.insereErrorMessageCustom('senha', 'Usuário ou senha inválidos')
                    }
                })
        },
        NovaConta(){
            this.$router.push('/Usuario/Cadastro')
        }
  },
  mounted() {
        this.$refs.validation.required('email',"E-mail")
        this.$refs.validation.required('senha',"Senha")
  }
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