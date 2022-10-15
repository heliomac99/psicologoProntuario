<template>      
    <h5 class="primaryColor" style="margin-bottom:20px; margin-top:20px" >Sexo</h5>
    <div style="display:inline-flex; margin-top:20px">
        <div class="divBarChart">
            <BarChart :chart-data="chartDataSexo" />
        </div>
        <div class="divPieChart">
            <PieChart :chart-data="chartDataSexo" />
        </div>
    </div>   
</template>

<script>
  import BarChart from '../components/BarChart.vue'
  import PieChart from '../components/PieChart.vue'
  import axios from 'axios'
  export default {
        name: 'DashBoardSexo',
        components: { BarChart, PieChart },
        data() {
            return {
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
            }
        },
        methods: {    
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
        },
        mounted(){
            axios.post('http://localhost:4000/usuario/pacientes', {usid: this.$store.getters.getUsuarioId}).then( (result) => {  
                    this.pacientes = result.data
                    this.calculaDadosSexo()            
            })
        }
    }
</script>



