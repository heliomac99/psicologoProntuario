<template>
    <div id="content">
                <h3 class="primaryColor" id="titulo">Cadastro Usuario</h3>
                <div align="center" style="">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="onSubmit">

                                <div  class="form-group col-10">
                                    <label class="form-label col-2">Nome</label>
                                    <div class="col-9">
                                        <input v-model="usuario.nome" id="nome" class="form-control" @keyup="validarForm">
                                        <div v-if="erros.nome" class="col-10" style="display:contents">
                                            <span class="spanErro">{{erros.nome.msg}}</span>   
                                        </div>                                                              
                                    </div>    
                                </div> 

                                <div class="form-group col-10">
                                    <label class="form-label col-2">E-mail</label>
                                    <div class="col-9">
                                        <input v-model="usuario.email" id="email" class="form-control" @keyup="validarForm">
                                        <div v-if="erros.email" style="display:contents">
                                            <span class="spanErro">{{erros.email.msg}}</span>   
                                        </div>                                              
                                    </div>    
                                </div>

                                <div class="form-group col-10">
                                    <label class="form-label col-2">Senha</label>
                                    <div class="col-9">
                                        <input v-model="usuario.senha" id="senha" class="form-control" @keyup="validarForm" type="password">
                                        <div v-if="erros.senha" style="display:contents">
                                            <span class="spanErro">{{erros.senha.msg}}</span>   
                                        </div>                                              
                                    </div>    
                                </div>

                                <div class="form-group col-10">
                                    <label class="form-label col-2">Confirma Senha</label>
                                    <div class="col-9">
                                        <input v-model="usuario.confirmaSenha" id="confirmaSenha" class="form-control" @keyup="validarForm" type="password">
                                        <div v-if="erros.confirmaSenha" style="display:contents">
                                            <span class="spanErro">{{erros.confirmaSenha.msg}}</span>   
                                        </div>                                              
                                    </div>    
                                </div>

                                <div class="form-group col-10">
                                    <label class="form-label col-2">Endereço</label>
                                    <div class="col-9">
                                        <input v-model="usuario.endereco" id="endereco" class="form-control" @keyup="validarForm">                                                     
                                    </div>    
                                </div>
                                
                                <div class="form-group col-10">
                                    <label class="form-label col-2">Município</label>
                                    <div class="col-9">
                                        <input v-model="usuario.municipio" id="endereco" class="form-control" @keyup="validarForm">                                                     
                                    </div>    
                                </div>
    

                                <div class="form-group col-10">
                                    <label class="form-label col-2">Idade</label>  
                                    <div class="col-1" >
                                        <input v-model="usuario.idade" type="number" id="idade" class="form-control">                      
                                  </div>                           
                                </div>
        

                                <div id="actionButtons">
                                    <button @click="salvar(usuario)" style="margin-right: 5px;" type="button" class="btn btn-primary primaryColorBtn">Salvar</button>
                                    <button @click="excluir(usuario)" v-if="usuario.id>0" type="button" class="btn btn-primary primaryColorBtn2">Excluir</button>
                                    <ModalPergunta ref="modalPergunta"></ModalPergunta>
                                </div>
                        </form>
                        </div>
                    </div>            
                </div>
        </div>
</template>

<script>
  import axios from 'axios'
  import ModalPergunta from '../../components/ModalPergunta.vue'
  export default {
        name: 'CadastroEdicaoUsuarioView',
        components: { ModalPergunta},
        data() {
            return {
                usuario: {
                    id: this.$route.params.codigoUsuario,
                    nome: null,
                    email: null,
                    senha: null,
                    confirmaSenha: null,
                    endereco: null,
                    municipio: null,
                    idade: null,
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
                    if(usuario.id > 0){
                        axios.post('http://localhost:4000/usuario/edit', usuario).then(
                            this.$swal("Sucesso", "Usuário registrado com sucesso!", "success"),
                            this.$router.back()
                        )
                    }
                    else{
                        axios.post('http://localhost:4000/usuario/add', usuario).then(
                            this.$swal("Sucesso", "Usuário registrado com sucesso!", "success"),
                            this.$router.back()
                        )
                    }
                }         
            },
            async excluir(usuario) {
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Usuario',
                    message: 'Tem certeza que gostaria de excluir o Usuario?',
                    okButton: 'Sim',
                })

                if (ok) { 
                    axios.post('http://localhost:4000/usuario/remove', {id: usuario.id}).then(() => { 
                        this.$swal("Sucesso", "Usuário excluído com sucesso!", "success"),
                        this.$router.back()
                    })
                }
            },
            recuperarDados() { 
                axios.post('http://localhost:4000/usuario/carregarRegistro', {id: this.usuario.id}).then( (result) => {
                        console.log(result)
                        this.usuario.nome = result.data[0].nome
                        this.usuario.email = result.data[0].email
                        this.usuario.senha = result.data[0].senha
                        this.usuario.confirmaSenha = result.data[0].senha
                        this.usuario.endereco = result.data[0].endereco
                        this.usuario.municipio = result.data[0].municipio
                        this.usuario.idade = result.data[0].idade
                   }
                )
            },

        },
        mounted() {
            if(this.usuario.id > 0)
                this.recuperarDados()
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

