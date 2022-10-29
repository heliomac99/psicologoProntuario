<template>
    <div align="center" id="home">
        <div id="content">
            <div> 
                <h3 class="primaryColor" style="margin-bottom:40px;">Lista de Pacientes</h3>
                <button style="margin-bottom:15px;" type="button" class="btn btn-primary primaryColorBtn" @click="inserir">
                    <font-awesome-icon icon="fa-solid fa-plus" style="margin-right:7px" />
                    Inserir Paciente
                </button>
            </div>
            <br>

            <div class="divFiltroNome">
                <input id="nome" style="margin-right: 10px; width: 500px;" class="form-control" placeholder="Nome" v-model="filtroNome"  @keyup="filtrarPorNome" >
            </div>

            <DataTable ref="dataTable" :colLabels="colLabels" :dataFields="dataFields" :dataUrl="'http://localhost:4000/usuario/pacientes'" :paramsUrl="{usid: this.$store.getters.getUsuarioId}" :showEditButton="true" :showAddButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir" @addItem="adicionarRelatorio" :key="dataTableKey" :id="'id'"></DataTable>
            <ModalPergunta ref="modalExclusao"></ModalPergunta>
        </div>
    </div>
</template>

<script>
  import ModalPergunta from '../../components/ModalPergunta.vue'
  import DataTable from '../../components/DataTable.vue'
  import axios from 'axios'
  export default {
        name: 'PacienteView',
        components: {
            ModalPergunta,
            DataTable
        },
        data() {
            return {
                dataFields: [
                    { value: 'nome', type: 'text'},
                    { value: 'idade', type: 'number'},
                    { value: 'sexo', type: 'char'},
                    { value: 'genero', type: 'text'},
                    { value: 'estado', type: 'text'},
                    { value: 'municipio', type: 'text'},                               
                ],  
                colLabels: ['Nome', 'Idade', 'Sexo', 'Gênero','Estado', 'Município'],
                filtroNome: null,
                dataTableKey: 0
            }
        },
        methods: {
            editar(paciente) {
                this.$router.push({
                    name: 'cadastroedicaopaciente',
                    params: {
                        codigoPaciente: paciente.id,
                        nome: paciente.nome,
                        idade: paciente.idade,
                        sexo: paciente.sexo
                    },
                });
            },
            inserir() {
                this.$router.push({
                    name: 'cadastroedicaopaciente',
                    params: {
                        codigoPaciente: 0,
                    },
                });
            },
            adicionarRelatorio(codigo) {
                this.$router.push({
                    name: 'listarelatorio',
                    params: {
                        codigoPaciente: codigo,
                    },
                });
            },
            async excluir(paciente) {
                const ok = await this.$refs.modalExclusao.show({
                    title: 'Excluir Paciente',
                    message: 'Tem certeza que gostaria de excluir o paciente?',
                    okButton: 'Sim',
                })

                if (ok) {
                    axios.post('http://localhost:4000/paciente/remove', {id: paciente.id}).then(() => {
                        this.dataTableKey += 1,
                        this.$swal("Sucesso", "Paciente excluído com sucesso!", "success")
                    })
                }
            },
            filtrarPorNome() {
                this.$refs.dataTable.filter('nome', this.filtroNome)
            }
        },

    }
</script>

<style>
    .form-group {
        display:flex;
        margin: 15px;
    }

    .divFiltroNome {
        display:inline-flex;
        margin-bottom:20px;
    }
</style>

