<template>
    <div align="center">
        <h3 style="margin-bottom:20px;">Lista de Pacientes</h3>
        <button style="margin-bottom:15px;" type="button" class="btn btn-success" @click="inserir">
            <font-awesome-icon icon="fa-solid fa-plus" style="margin-right:7px"/>
             Inserir Paciente
        </button>
        <DataTable :cols="['Nome', 'Idade', 'Sexo']" :data="pacientes" :hiddenCols="['codigo']" :showEditButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir"></DataTable>
        <ModalPergunta ref="modalExclusao"></ModalPergunta>
    </div>
</template>

<script>
  import ModalPergunta from '../components/ModalPergunta.vue'
  import DataTable from '../components/DataTable.vue'
  export default {
        name: 'PacienteView',
        components: {
            ModalPergunta,
            DataTable
        },
        data() {
            return {
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
                ]
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
            async excluir(paciente) {
                const ok = await this.$refs.modalExclusao.show({
                    title: 'Excluir Paciente',
                    message: 'Tem certeza que gostaria de excluir o paciente?',
                    okButton: 'Sim',
                })

                if (ok) {
                    //implementar funçao de exclusao
                    alert('paciente com codigo ' + paciente.codigo + ' excluido com sucesso.' )
                }
            },
        },
    }
</script>

<style>
    .form-group {
        display:flex;
        margin: 15px;
    }
</style>

