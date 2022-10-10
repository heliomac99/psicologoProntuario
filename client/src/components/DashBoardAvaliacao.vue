<template>
    <div style="margin:20px">
        <h5 class="primaryColor" style="margin-bottom:20px" >Avaliação por Pacientes</h5>
        <select class="form-control" placeholder="paciente" v-model="pacienteSelecionado" style="max-width:400px; margin-bottom:20px;" @change="tooglePacienteAvaliacao">
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
</template>

<script>
  import BarChart from '../components/BarChart.vue'
  import PieChart from '../components/PieChart.vue'
  import axios from 'axios'
  export default {
        name: 'DashBoardAvaliacao',
        components: { BarChart, PieChart },
        data() {
            return {
                chartDataAvaliacao: {
                    labels: ['Bom', 'Regular', 'Ruim'],
                    color: "blue",
                    datasets: [{
                        label: 'Avaliação',
                        backgroundColor: ['#B4CDE6', '#628E90','#3C2317'],
                        data: null
                    }],
                },
                pacientes: [],
                relatorios: [],
            }
        },
        methods: {
            tooglePacienteAvaliacao() {
                this.carregarRelatorios(this.pacienteSelecionado)
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
            carregarRelatorios(codigoPaciente){
                axios.post('http://localhost:4000/usuario/paciente/relatorios', {usid: 2, pid: codigoPaciente}).then( (result) => {   
                        this.relatorios = result.data
                        this.calculaDadosAvaliacaoRelatorio()
                })
            },
        },
        mounted(){
            axios.post('http://localhost:4000/usuario/pacientes', {usid: 2}).then( (result) => {  
                    this.pacientes = result.data        
            })
        }
    }
</script>

