<template>
        <div class="backGroundLogin">
        <div class="col-12" style="display:flex">
            <div class="divCadastro cadastro center" style="display:block">
                    <h3 class="primaryColor" style="margin-bottom:50px; text-align: center;">Criando sua Conta</h3>

                    <ValidationForm :model="usuario" ref="validation" @save="salvar(usuario)">
                        <div  class="form-group col-12" style="display:flex;justify-content:center">
                            <div class="col-10">
                                <input v-model="usuario.nome" id="nome" class="form-control" placeholder="Nome">
                                <span name="nome" class="spanErro"></span>   
                            </div>                                                              
                        </div> 

                        <div class="form-group col-12" style="display:flex;justify-content:center">
                            <div class="col-10">
                                <input v-model="usuario.email" id="email" class="form-control" placeholder="E-mail">
                                <span name="email" class="spanErro"></span>   
                            </div>                                                              
                        </div>

                        <div class="form-group col-12" style="display:flex;justify-content:center">
                            <div class="col-10">
                                <input v-model="usuario.senha" id="senha" class="form-control" type="password" placeholder="Senha">
                                <span name="senha" class="spanErro"></span>     
                            </div>                                          
                        </div>

                        <div class="form-group col-12" style="display:flex;justify-content:center">
                            <div class="col-10">
                                <input v-model="usuario.confirmaSenha" id="confirmaSenha" class="form-control" type="password" placeholder="ConfirmaSenha">
                                <span name="confirmaSenha" class="spanErro"></span>   
    
                            </div>
                        </div>

                        <div id="actionButtons" style="display:flex; justify-content:center">
                            <button type="submit" style="margin-right: 5px;" class="btn btn-primary primaryColorBtn">Registrar</button>
                        </div>
                    </ValidationForm>                  
            </div>

            <div class="divLogin wallpaper"></div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import ValidationForm from '../../components/ValidationForm.vue'
  export default {
        name: 'CadastroUsuarioView',
        components: { ValidationForm },
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
            }
        },
        methods: {
            salvar(usuario) { 
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
            mounted(){
                this.$refs.validation.required("nome", "Nome")
                this.$refs.validation.required("email", "E-mail")
                this.$refs.validation.required("senha", "Senha")
                this.$refs.validation.email("email", "E-mail")
                this.$refs.validation.minLength("senha", "Senha", 6)
                this.$refs.validation.equal("confirmaSenha","senha", "Senhas")
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
        width:600px !important;
        padding: 170px 55px 55px;
    }
    

</style>

