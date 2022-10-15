<template>
    <div align="center" id="content">
            <h3 class="primaryColor" >Cadastro Paciente</h3>
            <div align="center" >
                <div class="card">
                        <div class="card-body">

                            <div class="form-group col-10">
                                <label class="form-label col-2" style="margin-right:20px">Nome</label>
                                <div class="col-10" >
                                    <input v-model="paciente.nome" id="nome" class="form-control" @keyup="validarForm"> 
                                    <div v-if="erros.nome" style="display:contents">
                                        <span class="spanErro">{{erros.nome.msg}}</span>   
                                    </div>   
                                </div>
                            </div>

                            <div class="form-group col-10">
                                <label class="form-label col-2" style="margin-right:20px">Sexo</label>
                                <div class="form-check">
                                    <input v-model="paciente.sexo" value="M" :checked="paciente.sexo == 'M'" class="form-check-input" type="radio" name="sexo" id="sexoM" @change="validarForm">
                                    <label class="form-check-label" for="sexo" style="margin-right:10px">
                                        Masculino
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input v-model="paciente.sexo" value="F" :checked="paciente.sexo == 'F'" class="form-check-input" type="radio" name="sexo" id="sexoF" @change="validarForm">
                                    <label class="form-check-label" for="sexo">
                                        Feminino
                                    </label>
                                </div>
                                <div v-if="erros.sexo" style="display:contents">
                                    <span style="margin-left:10px" class="spanErro">{{erros.sexo.msg}}</span>   
                                </div>                                                    
                            </div>

                            <div class="form-group col-10">
                                <label class="form-label col-2">Gênero</label>  
                                <div class="col-6" >
                                    <input v-model="paciente.genero" type="text" id="genero" class="form-control">                      
                                </div>   
                            </div>

                            <div class="form-group col-10">
                                    <label class="form-label col-2">Idade</label>  
                                    <div class="col-2" >
                                        <input v-model="paciente.idade" type="number" id="idade" class="form-control">                      
                                  </div>                           
                            </div>


                            <div class="form-group col-10">
                                    <label class="form-label col-2">Estado</label>  
                                    <div class="col-10" >
                                        <select v-model="paciente.estado" id="estado" class="form-select" name="estado" @change="validarForm">
                                            <option value=""></option>
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                            <option value="EX">Estrangeiro</option>
                                        </select>
                                        <div v-if="erros.estado" style="display:contents">
                                            <span class="spanErro">{{erros.estado.msg}}</span>   
                                        </div>                    
                                  </div>                           
                            </div>

                            <div class="form-group col-10">
                                <label class="form-label col-2">Município</label>
                                <div class="col-10">
                                    <input v-model="paciente.municipio" id="endereco" class="form-control">
                                    <div v-if="erros.municipio" style="display:contents">
                                        <span class="spanErro">{{erros.municipio.msg}}</span>   
                                    </div>                                                     
                                </div>    
                            </div>

                            <div id="actionButtons" style="margin-top:20px">
                                <button @click="salvar(paciente)" style="margin-right: 5px;" type="button" class="btn btn-primary primaryColorBtn">Salvar</button>
                                <button @click="excluir(paciente)" type="button" class="btn btn-primary primaryColorBtn2">Excluir</button>
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
        name: 'CadastroEdicaoPacienteView',
        components: { ModalPergunta },
        data() {
            return {
                paciente: {
                        id: this.$route.params.codigoPaciente,
                        nome: null,
                        usid: this.$store.getters.getUsuarioId,
                        idade: null,
                        estado: null,
                        municipio: null,
                        sexo: null,
                        genero: null,
                    },
                erros: {},
                submitted: false
            }
        },
        methods: {
            salvar(paciente) { 
                this.submitted = true
                if(this.validarForm()){
                    if(paciente.id > 0){
                        axios.post('http://localhost:4000/paciente/edit', paciente).then(
                            this.$swal("Sucesso", "Paciente registrado com sucesso!", "success"),
                            this.$router.back()
                        )
                    }
                    else{
                        axios.post('http://localhost:4000/paciente/add', paciente).then(
                            this.$swal("Sucesso", "Paciente registrado com sucesso!", "success"),
                            this.$router.back()
                        )
                    }
                }         
            },       
            async excluir(paciente) { 
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Paciente',
                    message: 'Tem certeza que gostaria de excluir o paciente?',
                    okButton: 'Sim',
                })

                if (ok) { 
                    axios.post('http://localhost:4000/paciente/remove', {id: paciente.id}).then(() => {
                        this.$swal("Sucesso", "Paciente excluído com sucesso!", "success"),
                        this.$router.back()
                     }
                    )
                }
            },
            recuperarDados() { 
                axios.post('http://localhost:4000/paciente/carregarRegistro', {id: this.paciente.id}).then( (result) => {
                        this.paciente.nome = result.data[0].nome
                        this.paciente.municipio = result.data[0].municipio
                        this.paciente.idade = result.data[0].idade
                        this.paciente.estado = result.data[0].estado
                        this.paciente.sexo = result.data[0].sexo
                        this.paciente.genero = result.data[0].genero
                   }
                )
            },
            validarForm(){
                if(this.submitted){
                    this.erros = {}

                    if(!this.paciente.nome)
                        this.erros.nome = { erro: true, msg:'Nome obrigatório.'}
                    else
                        this.erros.nome = false

                    if(!this.paciente.estado)
                        this.erros.estado = { erro: true, msg:'Estado obrigatório.'}
                    else
                        this.erros.estado = false

                    if(!this.paciente.municipio)
                        this.erros.municipio = { erro: true, msg:'Município obrigatório.'}
                    else
                        this.erros.municipio = false

                    if(!this.paciente.sexo)
                        this.erros.sexo = { erro: true, msg:'Sexo obrigatório.'}
                    else
                        this.erros.sexo = false
                                              
                        
                    if(this.erros.nome || this.erros.estado || this.erros.municipio || this.erros.sexo)
                        return false
                    else
                        return true
                }                                           
            },
        },
        mounted(){
            if(this.paciente.id > 0)
                this.recuperarDados()
        }

        
    }
</script>

<style>
    .form-group {
        display:flex;
        margin: 15px;
    }

    .card {
        max-width: 80rem;
        margin-top:30px;
        padding:2rem;
    }

</style>

