<template>
    <div align="center">
        <div id="content">
            <h3 style="margin-bottom:20px;">Lista de Usuários</h3>
            <button style="margin-bottom:15px;" type="button" class="btn btn-success" @click="inserir">
                <font-awesome-icon icon="fa-solid fa-plus" style="margin-right:7px" />
                Inserir Usuário
            </button>
            <DataTable :colLabels="colLabels" :dataFields="dataFields" :data="usuarios" :showEditButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir"></DataTable>
            <ModalPergunta ref="modalExclusao"></ModalPergunta>
        </div>
    </div>
</template>

<script>
  import ModalPergunta from '../../components/ModalPergunta.vue'
  import DataTable from '../../components/DataTable.vue'
  export default {
        name: 'UsuarioView',
        components: {
            ModalPergunta,
            DataTable
        },
        data() {
            return {
                colLabels : ['Nome', 'E-mail', 'Login'],
                dataFields: ['nome', 'email', 'login'],
                usuarios:    [
                    { "nome": "Helio", "email": 'helio.1999.neto@gmail.com', "login": 'heliomac', "senha": 'helio2020', "codigo": "1" },
                    { "nome": "Jade", "email": 'teste@gmail.com', "login": 'jade123', "senha": 'jademir123', "codigo": "2" },
                    { "nome": "Renato", "email": 'teste2@gmail.com', "login": 'teste1', "senha": 'juju', "codigo": "3" },
                    { "nome": "Soraia", "email": 'teste3@gmail.com', "login": 'teste2', "senha": 'juju2', "codigo": "4" },
                ]
            }
        },
        methods: {
            editar(usuario) {
                console.log(usuario)
                this.$router.push({
                    name: 'cadastroedicaousuario',
                    params: {
                        codigoUsuario: usuario.codigo,
                        nome: usuario.nome,
                        email: usuario.email,
                        login: usuario.login,
                        senha: usuario.senha
                    },
                });
            },
            inserir() {
                this.$router.push({
                    name: 'cadastroedicaousuario',
                    params: {
                        codigoUsuario: 0,
                    },
                });
            },
            async excluir(Usuario) {
                const ok = await this.$refs.modalExclusao.show({
                    title: 'Excluir Usuário',
                    message: 'Tem certeza que gostaria de excluir o usuário?',
                    okButton: 'Sim',
                })

                if (ok) {
                    //implementar fun�ao de exclusao
                    alert('usuario com codigo ' + Usuario.codigo + ' excluido com sucesso.' )
                }
            },
        },
    }
</script>

<style>
    .form-group {
        display: flex;
        margin: 15px;
    }
</style>

