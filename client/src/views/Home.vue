<template>
    <div align="center" id="home">
        <div class="card DashBoardCard">
            <div class="card-header">
                <button @click="toogleAvaliacao" v-if="avaliacaoVisible" type="button" class="asText mr-10" style="color:gray">Avaliação</button>
                <button @click="toogleAvaliacao" v-else type="button" class="asText mr-10">Avaliação</button>

                <button @click="toogleSexo" v-if="sexoVisible" type="button" class="asText" style="color:gray">Gênero</button>
                <button @click="toogleSexo" v-else type="button" class="asText">Gênero</button>

                <button @click="toogleEstado" v-if="estadoVisible" type="button" class="asText" style="color:gray">Estado</button>
                <button @click="toogleEstado" v-else type="button" class="asText">Estado</button>
            </div>
            <div class="card-body">

                <div v-if="avaliacaoVisible">
                    <DashBoardAvaliacao></DashBoardAvaliacao>
                </div>


                <div v-if="sexoVisible">
                    <DashBoardSexo></DashBoardSexo>     
                </div>


                <div v-if="estadoVisible">
                    <DashBoardEstado></DashBoardEstado>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
  import DashBoardSexo from '../components/DashBoardSexo.vue'
  import DashBoardAvaliacao from '../components/DashBoardAvaliacao.vue'
  import DashBoardEstado from '../components/DashBoardEstado.vue'
  export default {
        name: 'HomeView',
        components: { DashBoardSexo, DashBoardAvaliacao, DashBoardEstado },
        data() {
            return {
                avaliacaoVisible: false,
                sexoVisible: true,
                estadoVisible: false,
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
        },
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
        width:700px;
        margin-right:30px;
    }

    .divBarChartEstado{
        width:800px;
        margin-bottom: 50px
    }
    .divPieChart{
        height:350px;
        width:350px;
    }

    .DashBoardCard{
        padding: 0 !important;
        height: 1117px !important;
    }
</style>


