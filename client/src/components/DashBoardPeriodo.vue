<template>
    <h5 class="primaryColor" style="margin-bottom:20px; margin-top:20px">Avaliação por Período</h5>
    <div class="col-4">
        <p>Selecione o intervalo de tempo a ser considerado</p>
        <input v-model="dataP" id="email" class="form-control my-2" type="month" placeholder="Desse Mês"> 
        até 
        <input v-model="dataF" id="email" class="form-control my-2" type="month" placeholder="Até esse mês">
        <button type="button" class="btn btn-primary primaryColorBtn mx-3 my-2" @click="testa">
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
                chartDataAvaliacaoPorPeríodo: {
                    labels: ['Bom', 'Regular', 'Ruim'],
                    color: "blue",
                    datasets: [{
                        label: 'Avaliação',
                        backgroundColor: ['#B4CDE6', '#628E90','#3C2317'],
                        data: null
                    }],
                },
                dataP: null,
                dataF: null,
                relatorioPorPeriodo: [],
            }
        },
        methods: {
            incrementaMes(a){
                let aux = parseInt(a.slice(5,7))+1
                let year = parseInt(a.slice(0,4))
                if(aux>12){
                    year++
                    aux = 1
                }
                return year.toString()+'-'+aux.toLocaleString({minimumIntegerDigits: 2})
            },
            depois(a,b){
                if(a.slice(0,4)>b.slice(0,4)) return true
                else if(a.slice(0,4)==b.slice(0,4)){
                    if(a.slice(5,7)>b.slice(5,7)) return true
                }
                return false
            },
            carregarRelatoriosPorPeriodo(){//Editar
                axios.post('http://localhost:4000/usuario/relatorioPorIntervalo', {usid: this.$store.getters.getUsuarioId, inicio: this.dataP, fim: this.dataF}).then( (result) => {  
                console.log(result)
                this.relatorioPorPeriodo = result.data
                console.log(result.data)
                })
            },
            testa(){
                let a = this.dataP
                let b = this.dataF
                console.log(a)
                console.log(b)
                console.log(typeof(a))
                console.log(this.incrementaMes(a))
                console.log(this.incrementaMes(b))
                console.log(this.depois(a,b))
                a = a+'-01'
                b = b+'-01'
                console.log(a)
                console.log(b)
                this.carregarRelatoriosPorPeriodo()
            },
            /*calculaDadosAvaliacaoPorMes(){
                var i = this.dataP
                let n = this.dataF
               if ((this.dataP!=null)&&(this.dataF!=null)){
                    if (this.depois(i,j)){
                        //exceção
                    }
                    var j = 0
                    let result = []
                    var countBom = 0
                    var countRuim = 0
                    var countRegular = 0
                    for(i = this.dataP;i != n;i = incrementaMes(i)){
                        countBom = 0
                        countRuim = 0
                        countRegular = 0

                        result.push(count)
                    }
                }*/
            },
        }
</script>