<template>
    <div align="center" id="content">
        <h3 class="primaryColor" >Cadastro Relatório</h3>
        <div align="center">
            <div class="card">
                <div class="card-body">


                    <div class="form-group col-10">
                            <label class="form-label col-2">Avaliação</label>
                            <div class="form-check">
                                <input v-model="relatorio.aval" value="Bom" :checked="relatorio.aval == 'bom'" class="form-check-input radioInput" type="radio" name="avaliacao" @change="validarForm">
                                <label class="form-check-label" for="avaliacao">
                                    Bom
                                </label>
                            </div>
                            <div class="form-check">
                                <input v-model="relatorio.aval" value="Regular" :checked="relatorio.aval == 'regular'" class="form-check-input radioInput" type="radio" name="avaliacao" @change="validarForm">
                                <label class="form-check-label" for="avaliacao">
                                    Regular
                                </label>
                            </div>
                            <div class="form-check">
                                <input v-model="relatorio.aval" value="Ruim" :checked="relatorio.aval == 'ruim'" class="form-check-input radioInput" type="radio" name="avaliacao" @change="validarForm">
                                <label class="form-check-label" for="avaliacao">
                                    Ruim
                                </label>
                            </div>
                            <div v-if="erros.aval" style="display:contents">
                                <span style="margin-left:10px" class="spanErro">{{erros.aval.msg}}</span>   
                            </div> 
                    </div>
                        

                    <div class="form-group col-10">
                        <label class="form-label col-2">Data</label>  
                            <div class="col-2" >
                                <input v-model="relatorio.data" type="date" id="data" class="form-control">                     
                            </div>  
                            <div v-if="erros.aval" style="display:contents">
                                <span style="margin-left:10px" class="spanErro">{{erros.data.msg}}</span>   
                            </div>                          
                    </div>

                    <div class="form-group col-10">
                        <label class="form-label col-2" style="margin-right:20px">Observação</label>
                        <div class="col-9" >
                            <textarea v-model="relatorio.corpo" class="form-control" id="exampleFormControlTextarea1" rows="3" @keyup="validarForm"></textarea>
                            <div v-if="erros.corpo" style="display:contents">
                                <span style="margin-left:10px" class="spanErro">{{erros.corpo.msg}}</span>   
                            </div> 
                        </div>
                    </div>


                    <div id="actionButtons" style="margin-top:20px">
                        <button @click="salvar(relatorio)" style="margin-right: 5px;" type="button" class="btn btn-success primaryColorBtn">Salvar</button>
                        <button @click="excluir(relatorio)" type="button" class="btn btn-secondary primaryColorBtn2">Excluir</button>
                        <ModalPergunta ref="modalPergunta"></ModalPergunta>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ModalPergunta from '../../components/ModalPergunta.vue'
  import axios from 'axios'
  export default {
        name: 'CadastroEdicaoRelatorioView',
        components: { ModalPergunta },
        data() {
            return {
                relatorio: {
                    id: this.$route.params.codigoRelatorio,
                    pid: this.$route.params.codigoPaciente,
                    usid: this.$store.getters.getUsuarioId,
                    aval: null,
                    corpo: null,
                    data: null
                },
                erros:{}
            }
        },
        methods: {
            salvar(relatorio) { 
                console.log(relatorio)
                this.submitted = true
                if(this.validarForm()){
                    if(relatorio.id > 0){
                        axios.post('http://localhost:4000/relatorio/edit', relatorio).then(
                            this.$swal("Sucesso", "Paciente registrado com sucesso!", "success"),
                            this.$router.back()
                        )
                    }
                    else{
                        axios.post('http://localhost:4000/relatorio/add', relatorio).then(
                            this.$swal("Sucesso", "Paciente registrado com sucesso!", "success"),
                            this.$router.back()
                        )
                    }
                }       
            },           
            async excluir(relatorio) { 
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Relatório',
                    message: 'Tem certeza que gostaria de excluir o relatório?',
                    okButton: 'Sim',
                })

                if (ok) {
                    axios.post('http://localhost:4000/relatorio/remove', {id: relatorio.id}).then(() => { 
                        this.$swal("Sucesso", "Paciente excluído com sucesso!", "success"),
                        this.$router.back()
                    })
                }
            },
            recuperarDados() { 
                axios.post('http://localhost:4000/relatorio/carregarRegistro', {id: this.relatorio.id}).then( (result) => {
                    this.relatorio.aval = result.data[0].aval
                    this.relatorio.corpo = result.data[0].corpo
                    this.relatorio.data = result.data[0].data                 
                   }
                )
            },
            validarForm(){
                if(this.submitted){
                    this.erros = {}

                    if(!this.relatorio.aval)
                        this.erros.aval = { erro: true, msg:'Avaliação obrigatória.'}
                    else
                        this.erros.aval = false
                    
                    if(!this.relatorio.corpo)
                        this.erros.corpo = { erro: true, msg:'Observação obrigatória.'}
                    else
                        this.erros.corpo = false 

                    if(!this.relatorio.data)
                        this.erros.data = { erro: true, msg:'Data obrigatória.'}
                    else
                        this.erros.data = false 
                        
                    if(this.erros.aval || this.erros.corpo || this.erros.data ) 
                        return false
                    else
                        return true
                }                                           
            },
        },
        mounted(){
            if(this.relatorio.id > 0)
                this.recuperarDados()
        }

        
    }
</script>

<style>
    .form-group {
        margin-bottom:30px;
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

