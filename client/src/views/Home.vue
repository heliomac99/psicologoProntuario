<template>
    <div align="center" id="home">
        <div class="card dashBoard">
            <div class="card-body card-body-dashboard">
                <h3 class="primaryColor" style="margin-bottom:20px" >DashBoard Paciente</h3>

                <button @click="toogleAvaliacao" v-if="avaliacaoVisible" type="button" class="asText mr-10" style="color:gray">Avaliação</button>
                <button @click="toogleAvaliacao" v-else type="button" class="asText mr-10">Avaliação</button>

                <button @click="toogleSexo" v-if="sexoVisible" type="button" class="asText" style="color:gray">Gênero</button>
                <button @click="toogleSexo" v-else type="button" class="asText">Gênero</button>

                <button @click="toogleEstado" v-if="estadoVisible" type="button" class="asText" style="color:gray">Estado</button>
                <button @click="toogleEstado" v-else type="button" class="asText">Estado</button>

                <div v-if="avaliacaoVisible" align="center">
                    <div style="margin:20px">
                        <label>Paciente:</label>
                        <select class="form-control" placeholder="paciente" v-model="department" style="max-width:400px; margin-bottom:20px;" @change="tooglePacienteAvaliacao($event)">
                            <template v-for="(paciente, index) in pacientes" :key="index">
                                <option :value="paciente.id">
                                    {{paciente.nome}}
                                </option>
                            </template>
                        </select>
                    </div>

                    <div style="display:inline-flex; margin-top:20px">
                        <div class="divBarChart">
                            <BarChart :chart-data="chartDataAvaliacao" />
                        </div>
                        <div class="divPieChart">
                            <PieChart :chart-data="chartDataAvaliacao" />
                        </div>
                    </div>
                </div>


                <div v-if="sexoVisible">
                    <div style="display:inline-flex; margin-top:20px">
                        <div class="divBarChart">
                            <BarChart :chart-data="chartDataSexo" />
                        </div>
                        <div class="divPieChart">
                            <PieChart :chart-data="chartDataSexo" />
                        </div>
                    </div>          
                </div>


                <div v-if="estadoVisible">
                    <div style="margin-top:20px">
                        <h5 class="primaryColor" style="margin-bottom:20px" >Pacientes por Estado</h5>
                        <div class="divBarChartEstado">
                            <BarChart :chart-data="chartDataPacienteEstado" />
                        </div>
                        

                        <h5 class="primaryColor" style="margin-bottom:20px" >Avaliações por Estado</h5>
                        <div class="col-4">
                            <label>Estado</label>
                            <select class="form-select" v-model="estadoSelecionado" name="estado" @change="teste">
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
                        </div>
                        <div style="display:inline-flex; margin-top:20px">
                            <div class="divBarChart">
                                <BarChart :chart-data="chartDataSexo" />
                            </div>
                            <div class="divPieChart">
                                <PieChart :chart-data="chartDataSexo" />
                            </div>
                        </div> 
                    </div>   
                                  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import BarChart from '../components/BarChart.vue'
  import PieChart from '../components/PieChart.vue'
  import axios from 'axios'
  export default {
        name: 'HomeView',
        components: { BarChart, PieChart },
        data() {
            return {
                avaliacaoVisible: false,
                sexoVisible: true,
                estadoVisible: false,
                chartDataAvaliacao: {
                    labels: ['Bom', 'Regular', 'Ruim'],
                    color: "blue",
                    datasets: [{
                        label: 'Avaliação',
                        backgroundColor: ['#B4CDE6', '#628E90','#3C2317'],
                        data: null
                    }],
                },
                chartDataSexo: {
                    labels: ['Masculino', 'Feminino'],
                    color: "blue",
                    datasets: [{
                        label: 'Sexo',
                        backgroundColor: ['#628E90', '#B4CDE6'],
                        data: null
                    }],
                },
                chartDataPacienteEstado: {
                    labels: ['AL','AP','AM','BA','CE','DF','ES','GO','MA','MS','MT','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',],
                    color: "blue",
                    datasets: [{
                        label: 'Quantidade',
                        backgroundColor: ['#628E90', '#B4CDE6'],
                        data: null
                    }],
                },
                pacientes: [],
                relatorios: [],
                pacientesJoinRelatorios: [],
                estadoSelecionado: null
            }
        },
        methods: {
            toogleAvaliacao(){
                this.avaliacaoVisible = true
                this.sexoVisible = false  
                this.estadoVisible = false             
            },
            toogleSexo(){
                this.avaliacaoVisible = false
                this.sexoVisible = true     
                this.estadoVisible = false          
            },
            toogleEstado(){
                this.avaliacaoVisible = false
                this.sexoVisible = false 
                this.estadoVisible = true                 
            },
            tooglePacienteAvaliacao(event) {
                var codigoPaciente = event.target.value
                this.carregarRelatorios(codigoPaciente)
            },
            calculaDadosAvaliacaoRelatorio() {
                var countBom = 0;
                var countRegular = 0;
                var countRuim = 0;

                var i = 0
                for(i = 0; i < this.relatorios.length; i++){
                    if(this.relatorios[i].aval.toLowerCase() == 'bom')
                        countBom++
                    else if(this.relatorios[i].aval.toLowerCase() == 'regular')
                        countRegular++
                    else if(this.relatorios[i].aval.toLowerCase() == 'ruim')
                    countRuim++
                }

                this.chartDataAvaliacao.datasets[0].data = [countBom, countRegular, countRuim]   
            },
            calculaDadosSexo() { 
                var countMasculino = 0
                var countFeminino = 0
               
                var i = 0
                for(i = 0; i < this.pacientes.length; i++){
                    if(this.pacientes[i].sexo.toLowerCase() == 'm')
                        countMasculino++
                    else if(this.pacientes[i].sexo.toLowerCase() == 'f')
                        countFeminino++
                }
                this.chartDataSexo.datasets[0].data = [countMasculino, countFeminino]            
            },
            calculaNumeroPacientesPorEstado(){
                let arrayEstados = ['AL','AP','AM','BA','CE','DF','ES','GO','MA','MS','MT','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',]
                let result = []
                var count = 0
                
                var i = 0
                var j = 0
                for(i = 0; i < arrayEstados.length; i++){
                     count = 0
                     for(j = 0; j < this.pacientes.length; j++ ){
                         if(arrayEstados[i] == this.pacientes[j].estado)
                             count++
                     }
                     result.push(count)
                 }

                this.chartDataPacienteEstado.datasets[0].data = result
            },
            carregarRelatorios(codigoPaciente){
                axios.post('http://localhost:4000/usuario/paciente/relatorios', {usid: 2, pid: codigoPaciente}).then( (result) => {   
                        this.relatorios = result.data
                        this.calculaDadosAvaliacaoRelatorio()
                })
            },
            teste(){
                console.log(this.estadoSelecionado)
            }
        },
        mounted(){
            axios.post('http://localhost:4000/usuario/pacientes/ordenadoPorEstado', {usid: 2}).then( (result) => {  
                    this.pacientes = result.data
                    this.calculaDadosSexo()  
                    this.calculaNumeroPacientesPorEstado()           
            })
            axios.post('http://localhost:4000/usuario/pacientes/joinRelatorio', {usid: 2}).then( (result) => {  
                    this.pacientesJoinRelatorios = result.data     
            })

        }
    }
</script>
<style>
    .asText {
        background:none;
        border:none;
        margin:10px;
        padding:0;
    }

    .asText:hover {
        color: gray;
    }

    .divBarChart{
        height:500px;
        width:700px;
        margin-right:30px;
    }

    .divBarChartEstado{
        height:500px;
        width:900px;
        margin-right:30px;
    }
    .divPieChart{
        height:350px;
        width:350px;
    }

    .dashBoard {
        background-color: rgb(255, 255, 255);
        opacity: 1.0;
        display: inherit !important;
        padding:30px;
    }
</style>


