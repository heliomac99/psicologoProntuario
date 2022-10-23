<template>
    <h5 class="primaryColor" style="margin-bottom:20px; margin-top:20px">Avaliação por Período</h5>
    <div class="col-4">
        <p>Selecione o intervalo de tempo a ser considerado</p>
        <input v-model="dataP" id="email" class="form-control my-2" type="month" placeholder="Desse Mês"> 
        até 
        <input v-model="dataF" id="email" class="form-control my-2" type="month" placeholder="Até esse mês">
        <button type="button" class="btn btn-primary primaryColorBtn mx-3 my-2" @click="carregarRelatoriosPorPeriodo">
            Filtrar
        </button>
    </div>
    <div style="display:inline-flex; margin-top:40px">
            <div class="divBarChart">
                <BarChart :chart-data="chartDataAvaliacaoPorPeriodo" />
            </div>
            <div class="divPieChart">
                <PieChart :chart-data="chartDataAvaliacaoPorPeriodo" />
            </div>
        </div>
</template>

<script>
    import BarChart from '../components/BarChart.vue'
    import PieChart from '../components/PieChart.vue'
    import axios from 'axios'
    export default {
        name: 'DashBoardPeriodo',
        components: { BarChart, PieChart },
        data() {
            return {
                chartDataAvaliacaoPorPeriodo: {
                    labels: ['Bom', 'Regular', 'Ruim'],
                    color: "blue",
                    datasets: [{
                        label: 'Avaliação',
                        backgroundColor: ['#B4CDE6', '#628E90','#3C2317'],
                        data: null
                    }],
                },
                dataP: '2022-01',
                dataF: '2022-03',
                relatorioPorPeriodo: [],
            }
        },
        methods: {
            incrementaMes(a){
                var aux = parseInt(a.slice(5,7))
                var year = parseInt(a.slice(0,4))
                aux = aux+1
                if(aux>12){
                    year++
                    aux = 1
                }
                if (aux<10){
                    return year.toString()+'-0'+aux
                }
                return year.toString()+'-'+aux
            },
            
            carregarRelatoriosPorPeriodo(){
                axios.post('http://localhost:4000/usuario/relatorioPorIntervalo', {usid: this.$store.getters.getUsuarioId, inicio: this.dataP, fim: this.incrementaMes(this.dataF)}).then( (result) => {  
                console.log(result)
                this.relatorioPorPeriodo = result.data
                console.log(result.data)
                this.calculaDadosAvaliacaoPorMes()
                })
            },
            calculaDadosAvaliacaoPorMes(){
               if ((this.dataP!=null)&&(this.dataF!=null)){
                    var j = 0
                    var countBom = 0
                    var countRuim = 0
                    var countRegular = 0
                    for(j = 0; j < this.relatorioPorPeriodo.length; j++){
                            if(this.relatorioPorPeriodo[j].aval.toLowerCase() == 'bom')
                                countBom++
                            else if(this.relatorioPorPeriodo[j].aval.toLowerCase() == 'regular')
                                countRegular++
                            else if(this.relatorioPorPeriodo[j].aval.toLowerCase() == 'ruim')
                                countRuim++
                    }
                    
                    this.chartDataAvaliacaoPorPeriodo.datasets[0].data = [countBom, countRegular, countRuim]
                }
                }
            },
        }
</script>