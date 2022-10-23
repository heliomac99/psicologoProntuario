<template>
        <div class="backGroundLogin">
        <div class="col-12" style="display:flex">
            <div class="divCadastro cadastro center" style="display:block">
                    <h3 class="primaryColor" style="margin-bottom:50px; text-align: center;">Criando sua Conta</h3>
                    <div  class="form-group col-12" style="display:flex;justify-content:center">
                        <div class="col-10">
                            <input v-model="usuario.nome" id="nome" class="form-control" @keyup="validarForm" placeholder="Nome">
                            <div v-if="erros.nome" class="col-10" style="display:contents">
                                <span class="spanErro">{{erros.nome.msg}}</span>   
                            </div> 
                        </div>                                                              
                    </div> 

                    <div class="form-group col-12" style="display:flex;justify-content:center">
                        <div class="col-10">
                            <input v-model="usuario.email" id="email" class="form-control" @keyup="validarForm" placeholder="E-mail">
                            <div v-if="erros.email" style="display:contents">
                                <span class="spanErro">{{erros.email.msg}}</span>   
                            </div> 
                        </div>                                                              
                    </div>

                    <div class="form-group col-12" style="display:flex;justify-content:center">
                        <div class="col-10">
                            <input v-model="usuario.senha" id="senha" class="form-control" type="password" @keyup="validarForm" placeholder="Senha">
                            <div v-if="erros.senha" style="display:contents">
                                <span class="spanErro">{{erros.senha.msg}}</span>   
                            </div>   
                        </div>                                          
                    </div>

                    <div class="form-group col-12" style="display:flex;justify-content:center">
                        <div class="col-10">
                            <input v-model="usuario.confirmaSenha" id="confirmaSenha" class="form-control" type="password" @keyup="validarForm" placeholder="ConfirmaSenha">
                            <div v-if="erros.confirmaSenha" style="display:contents">
                                <span class="spanErro">{{erros.confirmaSenha.msg}}</span>   
                            </div>    
                        </div>
                    </div>

                    <div id="actionButtons" style="display:flex; justify-content:center">
                        <button @click="salvar(usuario)" style="margin-right: 5px;" type="button" class="btn btn-primary primaryColorBtn">Registrar</button>
                    </div>                  
            </div>

            <div class="divLogin wallpaper"></div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
        name: 'CadastroUsuarioView',
        data() {
            return {
                usuario: {
                    nome: null,
                    email: null,
                    senha: null,
                    confirmaSenha: null,
                    estado: null,
                    municipio: null,
                },
                erros: {},
                submitted: false
            }
        },
        methods: {
            validarForm(){
                if(this.submitted){
                    this.erros = {}
                    
                    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

                    if(!this.usuario.nome)
                        this.erros.nome = { erro: true, msg:'Nome obrigatório.'}
                    else
                        this.erros.nome = false
                        

                    if(!this.usuario.email)
                         this.erros.email = { erro: true, msg:'E-mail obrigatório.'}
                    else{
                        if (!regexEmail.test(this.usuario.email))
                          this.erros.email = { erro: true, msg:'E-mail inválido.'}
                        else
                          this.erros.email = false
                    }
                                           
                    if(!this.usuario.senha)
                        this.erros.senha = { erro: true, msg:'Senha obrigatória.'}
                    else{
                        if(this.usuario.senha.length < 6)
                            this.erros.senha = { erro: true, msg:'Senha deve conter pelo menos 6 digitos.'}
                        else
                            this.erros.senha = false
                    }

                    if(this.usuario.senha != this.usuario.confirmaSenha)
                        this.erros.confirmaSenha = { erro: true, msg:'Senhas não conferem.'}            
                    else
                    this.erros.confirmaSenha = false

                    if(this.erros.nome || this.erros.email || this.erros.senha || this.erros.confirmaSenha )
                        return false
                    else
                        return true
                }                                           
            },
            salvar(usuario) { 
                this.submitted = true
                if(this.validarForm()){

                    axios.post('http://localhost:4000/usuario/add', usuario).then( (result) =>{
                            if(result.data.emailValido){
                                this.$swal("Sucesso", "Usuário registrado com sucesso!", "success"),
                                this.$router.back() 
                            }
                            else
                                this.erros.email = { erro: true, msg:'E-mail está sendo utilizado.'}
                        }                    
                    )
                }         
            },
        }       
    }
</script>

<style>
    .form-group {
        display:flex;
        margin: 15px;
    }
    
    #actionButtons{
        margin-top:40px !important;
    }

    .form-label{
        margin-right:20px;
    }

    li{
        margin-right: 20px;
        width:fit-content;
    }

    .divCadastro{
        height: 100vh;
    }
    .title{
        margin-bottom:50px;
        text-align: center;
    }
    .cadastro{
        width:600px;
        padding: 180px 30px 30px;
    }
    

</style>

