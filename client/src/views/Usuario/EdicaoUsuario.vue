<template>
    <div id="content">
                <h3 class="primaryColor" id="titulo">Edição de Usuário</h3>
                <div align="center" style="">
                    <div class="card">
                        <div class="card-body">           
                                <ValidationForm :model="usuario" ref="validation" @save="salvar(usuario)">
                                    <div  class="form-group col-10">
                                        <label class="form-label col-2">Nome</label>
                                        <div class="col-9">
                                            <input v-model="usuario.nome" id="nome" class="form-control">
                                            <span name="nome" class="spanErro"></span> 
                                        </div>    
                                    </div> 

                                    <div class="form-group col-10">
                                        <label class="form-label col-2">E-mail</label>
                                        <div class="col-9">
                                            <input v-model="usuario.email" id="email" class="form-control">
                                            <span name="email" class="spanErro"></span>                                              
                                        </div>    
                                    </div>

                                    <div class="form-group col-10">
                                        <label class="form-label col-2">Senha</label>
                                        <div class="col-9">
                                            <input v-model="usuario.senha" id="senha" class="form-control" type="password">
                                            <span name="senha" class="spanErro"></span>                                             
                                        </div>    
                                    </div>

                                    <div class="form-group col-10">
                                        <label class="form-label col-2">Confirma Senha</label>
                                        <div class="col-9">
                                            <input v-model="usuario.confirmaSenha" id="confirmaSenha" class="form-control" type="password">
                                            <span name="confirmaSenha" class="spanErro"></span>                                               
                                        </div>    
                                    </div>  

                                    <div class="form-group col-10">
                                        <div class="col-4">
                                            <label class="form-label">Administrador?</label> 
                                            <input class="form-check-input" v-model="usuario.admin" type="checkbox" true-value="1" false-value="0">                                          
                                        </div>   
                                    </div> 
                                                          

                                    <div id="actionButtons">
                                        <button type="submit" class="btn btn-primary primaryColorBtn">Salvar</button>
                                    </div>
                                </ValidationForm>
                        </div>
                    </div>            
                </div>
        </div>
</template>

<script>
  import axios from 'axios'
  import ValidationForm from '../../components/ValidationForm.vue'
  export default {
        name: 'EdicaoUsuarioView',
        components: { ValidationForm },
        data() {
            return {
                usuario: {
                    id: this.$store.getters.getUsuarioId,
                    nome: null,
                    email: null,
                    senha: null,
                    confirmaSenha: null,
                    adminin: 0
                },
            }
        },
        methods: {
            salvar(usuario) {
                axios.post('http://localhost:4000/usuario/edit', usuario).then( (result) =>{
                    if(result.data.emailValido){  
                        this.$swal("Sucesso", "Usuário editado com sucesso!", "success"),
                        this.recuperarDados()
                        this.$store.commit('setNomeUsuario', this.usuario.nome)
                        this.$store.commit('setAdminUsuario', this.usuario.admin)
                    }
                    else
                        this.erros.email = { erro: true, msg:'E-mail está sendo utilizado.'}
                })
                        
            },
            recuperarDados() { 
                axios.post('http://localhost:4000/usuario/carregarRegistro', {id: this.usuario.id}).then( (result) => {
                        this.usuario.nome = result.data.nome
                        this.usuario.email = result.data.email
                        this.usuario.senha = result.data.senha
                        this.usuario.confirmaSenha = result.data.senha
                        this.usuario.admin = result.data.admin
                   }
                )
            },

        },
        mounted() {
                this.recuperarDados()
                this.$refs.validation.required("nome", "Nome")
                this.$refs.validation.required("email", "E-mail")
                this.$refs.validation.required("senha", "Senha")
                this.$refs.validation.email("email", "E-mail")
                this.$refs.validation.minLength("senha", "Senha", 6)
                this.$refs.validation.equal("confirmaSenha","senha", "Senhas")
                this.$refs.validation.newValidation("teste", (model) => {
                    if(model.nome == 'teste')
                        return true
                    return false
                }, "Testando")
                this.$refs.validation.applyValidation("nome", "teste")
                this.$refs.validation.applyValidation("email", "teste")
        },        
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
    
    .error{
        font-size:smaller;
        color:red;
    }

</style>

