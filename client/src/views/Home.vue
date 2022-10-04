<template>
    <div align="center" id="home">
        <div class="card dashBoard">
            <div class="card-body card-body-dashboard">
                <h3>DashBoard Paciente</h3>
                <button @click="toogleAvaliacao" type="button" class="asText mr-10">Avaliação</button>
                <button @click="toogleSexo" type="button" class="asText">Gênero</button>
                <div v-if="avaliacaoVisible" align="center">
                    <div style="margin-top:20px">
                        <label>Paciente:</label>
                        <select class="form-control" placeholder="paciente" v-model="department" style="max-width:400px; margin-bottom:20px;" @change="tooglePacienteAvaliacao($event)">
                            <template v-for="(paciente, index) in pacientes" :key="index">
                                <option :value="paciente.codigo">
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
                        backgroundColor: ['#008000', '#3CB371', '#6B8E23'],
                        data: null
                    }],
                },
                chartDataSexo: {
                    labels: ['Masculino', 'Feminino'],
                    color: "blue",
                    datasets: [{
                        label: 'Sexo',
                        backgroundColor: ['#008000', '#3CB371'],
                        data: null
                    }],
                },
                pacientes: [ //carregar por requisi��o utilizando o codigo de usu�rio logado
                    { "nome": "Helio", "idade": 23, "sexo": "Masculino", "codigo": "1" },
                    { "nome": "Jade", "idade": 35, "sexo": "Feminino", "codigo": "2" },
                    { "nome": "Renato", "idade": 40, "sexo": "Masculino", "codigo": "3" },
                ],
                relatorios: [ //carregar relat�rios utilizando o codigo do paciente selecionado
                    {
                        codigoPaciente: 1,
                        data: [
                            { "data": "11/09/2022", "avaliacao": 'Ruim', "observacao": "Estava agitado.", "codigo": "1" },
                            { "data": "23/09/2022", "avaliacao": 'Regular', "observacao": "", "codigo": "2" },
                            { "data": "08/08/2022", "avaliacao": 'Ruim', "observacao": "Estava triste.", "codigo": "3" },
                            { "data": "07/05/2022", "avaliacao": 'Bom', "observacao": "Estava feliz", "codigo": "4" },
                            { "data": "13/06/2021", "avaliacao": 'Bom', "observacao": "", "codigo": "5" },
                        ]
                    },
                    {
                        codigoPaciente: 2,
                        data: [
                            { "data": "11/09/2022", "avaliacao": 'Ruim', "observacao": "", "codigo": "6" },
                            { "data": "23/09/2022", "avaliacao": 'Ruim', "observacao": "", "codigo": "7" },
                            { "data": "08/08/2022", "avaliacao": 'Bom', "observacao": "", "codigo": "8" },
                            { "data": "07/05/2022", "avaliacao": 'Bom', "observacao": "", "codigo": "9" },
                            { "data": "13/06/2021", "avaliacao": 'Bom', "observacao": "", "codigo": "10" },
                        ]
                    },
                    {
                        codigoPaciente: 3,
                        data: [
                            { "data": "11/09/2022", "avaliacao": 'Ruim', "observacao": "", "codigo": "6" },
                            { "data": "23/09/2022", "avaliacao": 'Ruim', "observacao": "", "codigo": "7" },
                            { "data": "08/08/2022", "avaliacao": 'Regular', "observacao": "", "codigo": "8" },
                            { "data": "07/05/2022", "avaliacao": 'Regular', "observacao": "", "codigo": "9" },
                            { "data": "13/06/2021", "avaliacao": 'Regular', "observacao": "", "codigo": "10" },
                        ]
                    }
                ]
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
                this.calculaDadosAvaliacao(codigoPaciente)
            },
            calculaDadosAvaliacao(codigoPaciente) { //necessita de reformula��o quando for adaptada para requisi��o
                var countBom = 0;
                var countRegular = 0;
                var countRuim = 0;

                var index = -1
                var i = 0
                for (i = 0; i < this.relatorios.length; i++) {
                    if (this.relatorios[i].codigoPaciente == codigoPaciente)
                        index = i
                }

                if (index != -1) {
                    for (let i = 0; i < this.relatorios[index].data.length; i++) {
                        if (this.relatorios[index].data[i].avaliacao == 'Bom') countBom++;
                        else if (this.relatorios[index].data[i].avaliacao == 'Regular') countRegular++;
                        else if (this.relatorios[index].data[i].avaliacao == 'Ruim') countRuim++;
                    }
                    this.chartDataAvaliacao.datasets[0].data = [countBom, countRegular, countRuim]
                }
                else {
                    this.chartDataAvaliacao.datasets[0].data = [0, 0, 0]
                }
               
            },
            calculaDadosSexo() { 
                var countMasculino = 0
                var countFeminino = 0
               
                var i = 0
                for(i = 0; i < this.pacientes.length; i++){
                    if(this.pacientes[i].sexo.toLowerCase() == 'masculino')
                        countMasculino++
                    else if(this.pacientes[i].sexo.toLowerCase() == 'feminino')
                        countFeminino++
                }
                this.chartDataSexo.datasets[0].data = [countMasculino, countFeminino]            
            }
        },
        mounted(){
            this.calculaDadosSexo()
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


