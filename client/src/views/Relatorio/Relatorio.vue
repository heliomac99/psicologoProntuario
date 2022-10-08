<template>
    <div align="center" id="content">
        <h3 class="primaryColor" style="margin-bottom:40px;">Lista de Relatórios</h3>
        <button style="margin-bottom:15px;" type="button" class="btn btn-success primaryColorBtn" @click="inserir">
            <font-awesome-icon icon="fa-solid fa-plus" style="margin-right:7px" />
            Inserir Relatorio
        </button>
        <DataTable :key="dataTableKey" :colLabels="colLabels" :dataFields="dataFields" :id="'id'" :dataUrl="'http://localhost:4000/relatorio'" :showEditButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir" ></DataTable>
        <ModalPergunta ref="modalExclusao"></ModalPergunta>
    </div>
</template>

<script>
  import ModalPergunta from '../../components/ModalPergunta.vue'
  import DataTable from '../../components/DataTable.vue'
  import axios from 'axios'
  export default {
        name: 'RelatorioListaRelatorioView',
        components: {
            ModalPergunta,
            DataTable
        },
        data() {
            return {
                dataFields: ['data', 'aval', 'corpo'],
                colLabels: ['Data', 'Avaliação', 'Observação'],
                dataTableKey: 0
            }
        },
        methods: {           
            editar(relatorio) {
                this.$router.push({
                    name: 'cadastroedicaorelatorio',
                    params: {
                        codigoRelatorio: relatorio.id,
                        codigoPaciente: this.$route.params.codigoPaciente
                    },
                });
            },
            inserir() {
                this.$router.push({
                    name: 'cadastroedicaorelatorio',
                    params: {
                        codigoRelatorio: 0,
                        codigoPaciente: this.$route.params.codigoPaciente
                    },
                });
            },
            async excluir(relatorio) {
                const ok = await this.$refs.modalExclusao.show({
                    title: 'Excluir Relatório',
                    message: 'Tem certeza que gostaria de excluir o relatório?',
                    okButton: 'Sim',
                })

                if (ok) {
                    axios.post('http://localhost:4000/relatorio/remove', {id: relatorio.id}).then(() => { 
                        this.dataTableKey += 1,
                        this.$swal("Sucesso", "Relatório excluído com sucesso!", "success")
                    })
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

