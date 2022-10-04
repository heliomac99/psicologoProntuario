<template>
    <div id="content">
                <h3>Cadastro Usuario</h3>
                <div align="center" style="padding:30px">
                    <div class="card">
                        <div class="card-body">
                            <div  class="form-group">
                                <div class="input-group" style="width:80%;">
                                    <label class="form-label col-1">Nome</label>
                                    <input v-model="data.nome" id="nome" class="form-control col-4" style="width:700px" placeholder="Nome">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="input-group" style="width:80%;">
                                    <label class="form-label col-1">E-mail</label>
                                    <input v-model="data.email" type="email" id="email" class="form-control" style="width:700px" placeholder="E-mail">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="input-group" style="width:80%;">
                                    <label class="form-label col-1">Senha</label>
                                    <input v-model="data.senha" id="senha" class="form-control" style="width:700px" placeholder="Senha">
                                </div>
                            </div>

                            <div id="actionButtons">
                                <button @click="salvar(data)" style="margin-right: 5px;" type="button" class="btn btn-success">Salvar</button>
                                <button @click="excluir(data.codigo)" type="button" class="btn btn-secondary">Excluir</button>
                                <ModalPergunta ref="modalPergunta"></ModalPergunta>
                            </div>
                        </div>
                    </div>            
                </div>
        </div>
</template>

<script>
  import ModalPergunta from '../../components/ModalPergunta.vue'
  export default {
        name: 'CadastroEdicaoUsuarioView',
        components: { ModalPergunta },
        data() {
            return {
                data: {
                    codigo: this.$route.params.codigoUsuario,
                    nome: this.$route.params.nome,
                    email: this.$route.params.email,
                    login: this.$route.params.login,
                    senha: this.$route.params.senha
                }
            }
        },
        methods: {
            salvar(usuario) {  //implementar requisição de cadastroedicao
                console.log(usuario)
                alert('Usuario de codigo ' + usuario.codigo + ' salvo com sucesso.')
            },
            async excluir(codigo) {
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Usuario',
                    message: 'Tem certeza que gostaria de excluir o Usuario?',
                    okButton: 'Sim',
                })

                if (ok) { //implementar a requisição de exclusao
                    alert('Usuario com codigo ' + codigo + ' excluido com sucesso.')
                }
            },
            recuperarDados() { //implementar requisição para buscar Usuario por codigo
                this.data.nome = localStorage.getItem('nomeUsuario')
                this.data.email = localStorage.getItem('emailUsuario')
                this.data.login = localStorage.getItem('loginUsuario')
                this.data.senha = localStorage.getItem('senhaUsuario')
            },
            guardarDados() {  //remover funçao após implementação de requisição por codigo
                localStorage.setItem('nomeUsuario', this.data.nome)
                localStorage.setItem('emailUsuario', this.data.email)
                localStorage.setItem('loginUsuario', this.data.login)
                localStorage.setItem('senhaUsuario', this.data.senha)
            },
        },
        mounted() {
            window.addEventListener('beforeunload', this.guardarDados) //remover funçao após implementação de requisição por codigo
            window.addEventListener('load', this.recuperarDados)
        },
        unmounted() { //remover funçao após implementação de requisição por codigo
            localStorage.removeItem('nomeUsuario');
            localStorage.removeItem('emailUsuario');
            localStorage.removeItem('loginUsuario');
            localStorage.removeItem('senhaUsuario');
        }
        
    }
</script>

<style>
    .form-group {
        display:flex;
        margin: 15px;
    }

    .form-check-input:checked {
        background-color: #28a745 !important;
        border-color: #28a745 !important;
    }

    #actionButtons{
        margin-top:40px !important;
    }

    .form-label{
        margin-right:20px;
    }


</style>

