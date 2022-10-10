<template>
          <h5 class="primaryColor" style="margin-bottom:20px;margin-top:20px" >Pacientes por Estado</h5>
          <div class="divBarChartEstado">
               <BarChart :chart-data="chartDataPacientePorEstado" />
          </div>
                        
          <h5 class="primaryColor" style="margin-bottom:20px" >Avaliação por Estado</h5>
            <div class="col-4">
                    <label>Estado</label>
                    <select class="form-select" v-model="estadoSelecionado" name="estado" @change="carregarRelatoriosPorEstado">
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
                    <BarChart :chart-data="chartDataAvaliacaoPorEstado" />
                </div>
                <div class="divPieChart">
                    <PieChart :chart-data="chartDataAvaliacaoPorEstado" />
                </div>
            </div>    
</template>

<script>
  import BarChart from '../components/BarChart.vue'
  import PieChart from '../components/PieChart.vue'
  import axios from 'axios'
  export default {
        name: 'DashBoardEstado',
        components: { BarChart, PieChart },
        data() {
            return {
                chartDataPacientePorEstado: {
                    labels: ['AL','AP','AM','BA','CE','DF','ES','GO','MA','MS','MT','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',],
                    color: "blue",
                    datasets: [{
                        label: 'Quantidade',
                        backgroundColor: ['#628E90', '#B4CDE6'],
                        data: null
                    }],
                },
                chartDataAvaliacaoPorEstado: {
                    labels: ['Bom', 'Regular', 'Ruim'],
                    color: "blue",
                    datasets: [{
                        label: 'Avaliação',
                        backgroundColor: ['#B4CDE6', '#628E90','#3C2317'],
                        data: null
                    }],
                },
                pacientesJoinRelatorios: [],
                estadoSelecionado: null,
                pacientesJoinRelatoriosPorEstado: [],
            }
        },
        methods: {
            calculaDadosAvaliacaoPorEstado() {
                var countBom = 0;
                var countRegular = 0;
                var countRuim = 0;

                var i = 0
                for(i = 0; i < this.pacientesJoinRelatoriosPorEstado.length; i++){
                    if(this.pacientesJoinRelatoriosPorEstado[i].aval.toLowerCase() == 'bom')
                        countBom++
                    else if(this.pacientesJoinRelatoriosPorEstado[i].aval.toLowerCase() == 'regular')
                        countRegular++
                    else if(this.pacientesJoinRelatoriosPorEstado[i].aval.toLowerCase() == 'ruim')
                    countRuim++
                }

                this.chartDataAvaliacaoPorEstado.datasets[0].data = [countBom, countRegular, countRuim]   
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

                this.chartDataPacientePorEstado.datasets[0].data = result
            },
            carregarRelatoriosPorEstado(){
                axios.post('http://localhost:4000/usuario/pacientes/joinRelatorioPorEstado', {usid: 2, estado: this.estadoSelecionado}).then( (result) => {  
                    this.pacientesJoinRelatoriosPorEstado = result.data
                    this.calculaDadosAvaliacaoPorEstado()
                })
            }
        },
        mounted(){
            axios.post('http://localhost:4000/usuario/pacientes', {usid: 2}).then( (result) => {  
                    this.pacientes = result.data
                    this.calculaNumeroPacientesPorEstado()           
            })
            axios.post('http://localhost:4000/usuario/pacientes/joinRelatorio', {usid: 2}).then( (result) => {  
                    this.pacientesJoinRelatorios = result.data     
            })
        }
    }
</script>

