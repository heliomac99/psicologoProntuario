<template>
    <div style="margin-bottom:40px; margin-top: 20px;">
        <select class="form-control" placeholder="paciente" v-model="pacienteSelecionado" style="max-width:400px; margin-bottom:20px;" @change="tooglePacienteAvaliacao">
            <template v-for="(paciente, index) in pacientes" :key="index">
                <option :value="paciente.id">
                    {{paciente.nome}}
                </option>
            </template>
        </select>
    </div>

    <div style="margin-top:40px">
        <h5 class="primaryColor" style="margin-bottom:20px" >Linha do Tempo Avaliação Pacientes</h5>
        <div style="display:inline-flex; margin-top:20px">
            <div class="divBarChart" style="width: 800px !important">
                <BarChart :chart-data="chartDataAvaliacaoPorTempo" ref="bar" />
            </div>
        </div> 
    </div>
    
    <div style="margin-top:40px">
        <h5 class="primaryColor" style="margin-bottom:20px" >Distribuição Avaliação dos Pacientes</h5>
        <div style="display:inline-flex; margin:20px">
            <div class="divBarChart">
                <BarChart :chart-data="chartDataAvaliacao" />
            </div>
            <div class="divPieChart">
                <PieChart :chart-data="chartDataAvaliacao" />
            </div>
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
                chartDataAvaliacaoPorTempo: {
                    labels: [],
                    color: "blue",
                    datasets: [{
                        label: 'Avaliação',
                        backgroundColor: ['#628E90'],
                        data: null
                    }],
                },
                pacientes: [],
                relatorios: [],
                datasRelatorios: [],
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
            calculaDadosAvaliacaoPorTempoRelatorio() {
                let result = []
                
                var i = 0
                for(i = 0; i < this.relatorios.length; i++){
                    if(this.relatorios[i].aval.toLowerCase() == 'bom')
                        result.push(3)
                    else if(this.relatorios[i].aval.toLowerCase() == 'regular')
                        result.push(2)
                    else if(this.relatorios[i].aval.toLowerCase() == 'ruim')
                        result.push(1)
                }

                this.chartDataAvaliacaoPorTempo.datasets[0].data = result
            },
            carregarRelatorios(codigoPaciente){
                axios.post('http://localhost:4000/usuario/paciente/relatorios', {usid: this.$store.getters.getUsuarioId, pid: codigoPaciente}).then( (result) => {   
                        this.relatorios = result.data
                        this.carregarLabelsData()
                        this.calculaDadosAvaliacaoPorTempoRelatorio()
                        this.calculaDadosAvaliacaoRelatorio()
                })
            },
            formatDate(date){
                const [ano, mes, dia] = date.split('-');
                const result = `${dia}/${mes}/${ano}`;
                return result
            },
            carregarLabelsData(){
                this.datasRelatorios = this.relatorios.map(item => item.data);

                var i = 0
                for(i = 0; i < this.datasRelatorios.length; i++){
                    this.datasRelatorios[i] = this.formatDate(this.datasRelatorios[i])
                }
                this.$refs.bar.chartData.labels = this.datasRelatorios
            },
        },
        mounted(){
            axios.post('http://localhost:4000/usuario/pacientes', {usid: this.$store.getters.getUsuarioId}).then( (result) => {  
                    this.pacientes = result.data        
            })
        }
    }
</script>

