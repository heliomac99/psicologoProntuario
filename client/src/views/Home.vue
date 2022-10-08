<template>
    <div align="center" id="home">
        <div class="card dashBoard">
            <div class="card-body card-body-dashboard">
                <h3 class="primaryColor" >DashBoard Paciente</h3>
                <button @click="toogleAvaliacao" v-if="avaliacaoVisible" type="button" class="asText mr-10" style="color:gray">Avaliação</button>
                <button @click="toogleAvaliacao" v-else type="button" class="asText mr-10">Avaliação</button>
                <button @click="toogleSexo" v-if="sexoVisible" type="button" class="asText" style="color:gray">Gênero</button>
                <button @click="toogleSexo" v-else type="button" class="asText">Gênero</button>
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

                    <div style="display:inline-flex; margin-top:40px">
                        <div class="divBarChart">
                            <BarChart :chart-data="chartDataAvaliacao" />
                        </div>
                        <div class="divPieChart">
                            <PieChart :chart-data="chartDataAvaliacao" />
                        </div>
                    </div>
                </div>


                <div v-if="sexoVisible">
                    <div style="display:inline-flex; margin-top:70px">
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
                pacientes: [],
                relatorios: [],
            }
        },
        methods: {
            toogleAvaliacao(){
                this.avaliacaoVisible = true
                this.sexoVisible = false             
            },
            toogleSexo(){
                this.avaliacaoVisible = false
                this.sexoVisible = true             
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
            carregarRelatorios(codigoPaciente){
                axios.post('http://localhost:4000/usuario/paciente/relatorios', {usid: 2, pid: codigoPaciente}).then( (result) => {   
                    this.relatorios = result.data
                    this.calculaDadosAvaliacaoRelatorio()
                }       
            )
            }
        },
        mounted(){
            axios.post('http://localhost:4000/usuario/pacientes', {usid: 2}).then( (result) => {  
                    console.log(result.data)
                    this.pacientes = result.data
                    this.calculaDadosSexo()             
                }
            )
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


