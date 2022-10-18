<template>
<div class="backGroundLogin">
        <div class="col-12 center">
            <div class="card cardLogin">
                <div class="card-header">
                    Login
                </div>
                <div class="card-body" align="center">
                    <div class="form-group col-10">
                        <label class="form-label col-2">E-mail</label>
                        <div class="col-8">
                            <input v-model="email" id="email" class="form-control">                                                   
                        </div>    
                    </div>
                    <div class="form-group col-10">
                        <label class="form-label col-2">Senha</label>
                        <div class="col-8">
                            <input v-model="senha" id="senha" class="form-control" type="password">  
                            <div v-if="erros.login" style="display:contents">
                                <span class="spanErro">{{erros.login.msg}}</span>   
                            </div>                                                     
                        </div>    
                    </div>
                    <button type="button" class="btn btn-primary primaryColorBtn mx-3" @click="Entrar">
                        Entrar
                    </button>

                    <button type="button" class="btn btn-primary primaryColorBtn mx-3" @click="NovoUsuario">
                        Criar conta
                    </button>
                </div>
            </div>       
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
            erros: {}
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
        NovoUsuario() {
            this.$router.push({
                name: 'cadastroedicaousuario',
                params: {
                    codigoUsuario: 0,
                },
            });
        }
  }
}
</script>

<style>

    .center{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
    }

    .cardLogin{
        padding: 0 !important;
        width: 700px;
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
</style>