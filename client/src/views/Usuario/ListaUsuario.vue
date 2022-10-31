<template>
    <div align="center">
        <div id="content">
            <h3 class="primaryColor" style="margin-bottom:40px;">Lista de Usuários</h3>
            <!-- <button style="margin-bottom:15px;" type="button" class="btn btn-primary primaryColorBtn" @click="inserir">
                <font-awesome-icon icon="fa-solid fa-plus" style="margin-right:7px" />
                Inserir Usuário
            </button> -->
            <DataTable :colLabels="colLabels" :dataFields="dataFields" :dataUrl="'http://localhost:4000/usuario'" :showRemoveButton="true" @excluir="excluir" :key="dataTableKey"></DataTable>
            <ModalPergunta ref="modalExclusao"></ModalPergunta>
        </div>
    </div>
</template>

<script>
  import ModalPergunta from '../../components/ModalPergunta.vue'
  import DataTable from '../../components/DataTable.vue'
  import axios from 'axios'
  export default {
        name: 'UsuarioView',
        components: {
            ModalPergunta,
            DataTable
        },
        data() {
            return {
                colLabels : ['Nome', 'E-mail'],
                dataFields: [
                    { value: 'nome', type: 'text'},
                    { value: 'email', type: 'text'},
                ],              
                dataTableKey: 0,
            }
        },
        methods: {
            // editar(usuario) {
            //     this.$router.push({
            //         name: 'cadastroedicaousuario',
            //         params: {
            //             codigoUsuario: usuario.id,
            //         },
            //     });
            // },
            // inserir() {
            //     this.$router.push({
            //         name: 'cadastroedicaousuario',
            //         params: {
            //             codigoUsuario: 0,
            //         },
            //     });
            // },
            async excluir(usuario) {
                const ok = await this.$refs.modalExclusao.show({
                    title: 'Excluir Usuário',
                    message: 'Tem certeza que gostaria de excluir o usuário?',
                    okButton: 'Sim',
                })

                if (ok) {
                    axios.post('http://localhost:4000/usuario/remove', {id: usuario.id}).then(() => { 
                        this.dataTableKey += 1,
                        this.$swal("Sucesso", "Usuário excluído com sucesso!", "success")
                    })
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

