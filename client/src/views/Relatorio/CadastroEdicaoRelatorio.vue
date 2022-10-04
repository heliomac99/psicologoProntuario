<template>
    <div align="center" id="content">
        <h3>Cadastro Relatório</h3>
        <div align="center">
            <div class="card">
                <div class="card-body">
                    <div class="form-group">
                        <label class="form-label col-1" style="margin-right:20px">Avaliação</label>
                        <div class="form-check">
                            <input v-model="data.avaliacao" value="Bom" :checked="data.avaliacao == 'bom'" class="form-check-input radioInput" type="radio" name="avaliacao">
                            <label class="form-check-label" for="avaliacao" style="margin-right:10px">
                                Bom
                            </label>
                        </div>

                        <div class="form-check">
                            <input v-model="data.avaliacao" value="Regular" :checked="data.avaliacao == 'regular'" class="form-check-input radioInput" type="radio" name="avaliacao">
                            <label class="form-check-label" for="avaliacao">
                                Regular
                            </label>
                        </div>

                        <div class="form-check">
                            <input v-model="data.avaliacao" value="Ruim" :checked="data.avaliacao == 'ruim'" class="form-check-input radioInput" type="radio" name="avaliacao">
                            <label class="form-check-label" for="avaliacao">
                                Ruim
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label col-1" style="margin-right:20px">Data</label>
                        <input v-model="data.data" type="date" id="nome" class="form-control" style="width:200px" placeholder="Nome">
                    </div>

                    <div class="form-group" style="margin-top:40px">
                        <label class="form-label col-1" style="margin-right:20px">Observação</label>
                        <textarea v-model="data.observacao" class="form-control" id="exampleFormControlTextarea1" style="width:600px;" rows="3"></textarea>
                    </div>

                    <div id="actionButtons" style="margin-top:20px">
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
        name: 'CadastroEdicaoRelatorioView',
        components: { ModalPergunta },
        data() {
            return {
                data: {
                    codigo: this.$route.params.codigoRelatorio,
                    avaliacao: this.$route.params.avaliacao,
                    data: this.$route.params.data,
                    observacao: this.$route.params.observacao
                }
            }
        },
        methods: {
            salvar(relatorio) { //implementar requisição de cadastroedicao
                console.log(relatorio)
                alert('Relatorio de codigo ' + relatorio.codigo + ' salvo com sucesso.')
            },           
            async excluir(codigo) { 
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Relatório',
                    message: 'Tem certeza que gostaria de excluir o relatório?',
                    okButton: 'Sim',
                })

                if (ok) { //implementar a requisição de exclusao
                    alert('Relatório com codigo ' + codigo + ' excluido com sucesso.')
                }
            },
            recuperarDados() { //implementar requisição para buscar paciente por codigo
                this.data.avaliacao = localStorage.getItem('avaliacaoRelatorio')
                this.data.data = localStorage.getItem('dataRelatorio')
                this.data.observacao = localStorage.getItem('observacaoRelatorio')
            },
            guardarDados() {  //remover função após implementaçãoo de requisição por codigo
                localStorage.setItem('avaliacaoRelatorio', this.data.avaliacao)
                localStorage.setItem('dataRelatorio', this.data.data)
                localStorage.setItem('observacaoRelatorio', this.data.observacao)
            },
        },
        mounted() {
            window.addEventListener('beforeunload', this.guardarDados) //remover função após implementaçãoo de requisição por codigo
            window.addEventListener('load', this.recuperarDados)
        },
        unmounted() { //remover função após implementaçãoo de requisição por codigo
            localStorage.removeItem('avaliacaoRelatorio');
            localStorage.removeItem('dataRelatorio');
            localStorage.removeItem('observacaoRelatorio');
        }
        
    }
</script>

<style>
    .form-group {
        margin-bottom:30px;
    }

    .form-check-input:checked {
        background-color: #28a745 !important;
        border-color: #28a745 !important;
        margin-left: 10px;
    }

    .card {
        max-width: 80rem;
        margin-top:30px;
        padding:2rem;
    }

    .radioInput {
        margin-left:0.1px !important;
        margin-right:2px !important;
    }

</style>

