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
                                        <input v-model="usuario.senha" id="senha" class="form-control" type="password" @keyup="validarForm">
                                        <div v-if="erros.senha" style="display:contents">
                                            <span class="spanErro">{{erros.senha.msg}}</span>   
                                        </div>                                              
                                    </div>    
                                </div>

                                <div class="form-group col-10">
                                    <label class="form-label col-2">Confirma Senha</label>
                                    <div class="col-9">
                                        <input v-model="usuario.confirmaSenha" id="confirmaSenha" class="form-control" type="password" @keyup="validarForm">
                                        <div v-if="erros.confirmaSenha" style="display:contents">
                                            <span class="spanErro">{{erros.confirmaSenha.msg}}</span>   
                                        </div>                                              
                                    </div>    
                                </div>

                                <div class="form-group col-10">
                                    <label class="form-label col-2">Estado</label>  
                                    <div class="col-9" >
                                        <select v-model="usuario.estado" id="estado" class="form-select" name="estado" @change="validarForm">
                                            <option value=""></option>
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                            <option value="EX">Estrangeiro</option>
                                        </select>
                                        <div v-if="erros.estado" style="display:contents">
                                            <span class="spanErro">{{erros.estado.msg}}</span>   
                                        </div>                    
                                  </div>                           
                                </div>
                                
                                <div class="form-group col-10">
                                    <label class="form-label col-2">Município</label>
                                    <div class="col-9">
                                        <input v-model="usuario.municipio" id="endereco" class="form-control" @keyup="validarForm">  
                                        <div v-if="erros.municipio" style="display:contents">
                                            <span class="spanErro">{{erros.municipio.msg}}</span>   
                                        </div>                                                     
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

                    
                    if(!this.usuario.estado)
                        this.erros.estado = { erro: true, msg:'Estado obrigatório.'}
                    else
                        this.erros.municipio = false

                    if(!this.usuario.municipio)
                        this.erros.municipio = { erro: true, msg:'Município obrigatório.'}
                    else
                        this.erros.municipio = false
                    
                                     
                        
                    if(this.erros.nome || this.erros.email || this.erros.senha || this.erros.confirmaSenha || this.erros.municipio || this.erros.estado )
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
                        this.usuario.nome = result.data[0].nome
                        this.usuario.email = result.data[0].email
                        this.usuario.senha = result.data[0].senha
                        this.usuario.confirmaSenha = result.data[0].senha
                        this.usuario.estado = result.data[0].estado
                        this.usuario.municipio = result.data[0].municipio
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

