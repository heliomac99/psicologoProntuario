<template>
    <div align="center" id="content">
        <h3 style="margin-bottom:20px;">Lista de Relatórios</h3>
        <button style="margin-bottom:15px;" type="button" class="btn btn-success" @click="inserir">
            <font-awesome-icon icon="fa-solid fa-plus" style="margin-right:7px" />
            Inserir Relatorio
        </button>
        <DataTable :colLabels="colLabels" :dataFields="dataFields" :data="relatorios" :id="'codigo'" :showEditButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir" ></DataTable>
        <ModalPergunta ref="modalExclusao"></ModalPergunta>
    </div>
</template>

<script>
  import ModalPergunta from '../../components/ModalPergunta.vue'
  import DataTable from '../../components/DataTable.vue'
  import moment from 'moment';
  export default {
        name: 'RelatorioListaRelatorioView',
        components: {
            ModalPergunta,
            DataTable
        },
        data() {
            return {
                dataFields: ['data', 'avaliacao', 'observacao'],
                colLabels: ['Data', 'Avaliação', 'Observação'],
                relatorios:    [
                    { "data": "11/09/2022", "avaliacao": 'ruim', "observacao": "Estava agitado.", "codigo": "1" },
                    { "data": "23/09/2022", "avaliacao": 'regular', "observacao": "", "codigo": "2" },
                    { "data": "08/08/2022", "avaliacao": 'ruim', "observacao": "Estava triste.", "codigo": "3" },
                    { "data": "07/05/2022", "avaliacao": 'bom', "observacao": "Estava feliz", "codigo": "4" },
                    { "data": "13/06/2021", "avaliacao": 'bom', "observacao": "", "codigo": "5" },
                ]
            }
        },
        methods: {
            formatarData(data){ //dd/mm/yyyy to yyyy-mm-dd
                return  moment(data.split(' ')[0].split("/").reverse().join("-"))._i;
            },            
            editar(relatorio) {
                this.$router.push({
                    name: 'cadastroedicaorelatorio',
                    params: {
                        codigoRelatorio: relatorio.codigo,
                        data: this.formatarData(relatorio.data),
                        avaliacao: relatorio.avaliacao,
                        observacao: relatorio.observacao,
                    },
                });
            },
            inserir() {
                this.$router.push({
                    name: 'cadastroedicaorelatorio',
                    params: {
                        codigoRelatorio: 0,
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
                    //implementar fun�ao de exclusao
                    alert('relatorio com codigo ' + relatorio.codigo + ' excluido com sucesso.' )
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

