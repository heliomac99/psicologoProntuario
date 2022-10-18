<template>
    <h5 class="primaryColor" style="margin-bottom:20px; margin-top:20px">Avaliação por Período</h5>
    <div class="col-4">
        <p>Selecione o intervalo de tempo a ser considerado</p>
        <input v-model="dataP" id="email" class="form-control" type="month" placeholder="Desse Mês" @change="carregarRelatoriosPorPeriodo"> até <input v-model="dataF" id="email" class="form-control" type="date" placeholder="Até esse mês" @change="carregarRelatoriosPorPeriodo">
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
                dataF: null
            }
        },
        methods: {
            calculaDadosAvaliacaoPorMes(){
                if ((this.dataP!=null)&&(this.dataF!=null)){
                    if (this.dataP>this.dataF){
                        //exceção
                    }
                    var i = this.dataP
                    var j = 0
                    let n = this.dataF
                    let result = []
                    var count = 0
                    for(i = this.dataP; i!=n ; nextMonth(i)){//definir função nextMonth
                        count = 0
                        
                    }
                }
            }
        }
</script>