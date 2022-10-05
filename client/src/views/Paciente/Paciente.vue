<template>
    <div align="center" id="home">
        <div id="content">
            <div> 
                <h3 style="margin-bottom:20px;">Lista de Pacientes</h3>
                <button style="margin-bottom:15px;" type="button" class="btn btn-success" @click="inserir">
                    <font-awesome-icon icon="fa-solid fa-plus" style="margin-right:7px" />
                    Inserir Paciente
                </button>
            </div>
            <br>

            <div class="divFiltroNome">
                <input id="nome" style="margin-right: 10px; width: 500px;" class="form-control" placeholder="Nome" v-model="filtroNome"  @keyup="filtrarPorNome" >
            </div>

            <DataTable ref="dataTable" :colLabels="colLabels" :dataFields="dataFields" :data="pacientes" :id="'codigo'" :showEditButton="true" :showAddButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir" @addItem="adicionarRelatorio"></DataTable>
            <ModalPergunta ref="modalExclusao"></ModalPergunta>
        </div>
    </div>
</template>

<script>
  import ModalPergunta from '../../components/ModalPergunta.vue'
  import DataTable from '../../components/DataTable.vue'
  export default {
        name: 'PacienteView',
        components: {
            ModalPergunta,
            DataTable
        },
        data() {
            return {
                dataFields: ['nome', 'idade', 'sexo'],
                colLabels: ['Nome', 'Idade', 'Sexo'],
                pacientes:    [
                    { "nome": "Helio", "idade": 23, "sexo": "Masculino", "codigo": "1" },
                    { "nome": "Jade", "idade": 35, "sexo": "Feminino", "codigo": "2" },
                    { "nome": "Renato", "idade": 40, "sexo": "Masculino", "codigo": "3" },
                    { "nome": "Soraia", "idade": 12, "sexo": "Feminino", "codigo": "4" },
                    { "nome": "Linda", "idade": 55, "sexo": "Feminino", "codigo": "5" },
                    { "nome": "Joel", "idade": 68, "sexo": "Masculino", "codigo": "6" },
                    { "nome": "Jorge", "idade": 66, "sexo": "Masculino", "codigo": "7" },
                    { "nome": "Julia", "idade": 72, "sexo": "Feminino", "codigo": "8" },
                    { "nome": "Karen", "idade": 20, "sexo": "Feminino", "codigo": "9" },
                    { "nome": "Fabio", "idade": 19, "sexo": "Masculino", "codigo": "10" }
                ],
                filtroNome: null
            }
        },
        methods: {
            editar(paciente) {
                this.$router.push({
                    name: 'cadastroedicaopaciente',
                    params: {
                        codigoPaciente: paciente.codigo,
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
                    name: 'relatoriolistarelatorio',
                    params: {
                        codigoPaciente: codigo,
                    },
                });
            },
            async excluir(codigo) {
                const ok = await this.$refs.modalExclusao.show({
                    title: 'Excluir Paciente',
                    message: 'Tem certeza que gostaria de excluir o paciente?',
                    okButton: 'Sim',
                })

                if (ok) {
                    //implementar funçao de exclusao
                    alert('Paciente com codigo ' + codigo + ' excluido com sucesso.' )
                }
            },
            filtrarPorNome() {
                console.log('teste')
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

