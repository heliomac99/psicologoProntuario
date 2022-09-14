<template>
    <div align="center">
        <h3 style="margin-bottom:20px;">Cadastro Paciente</h3>
        <div class="card" style="max-width: 80rem; margin-top:30px">
            <div class="card-body">
                <div class="form-group">
                    <label class="form-label" style="margin-right:20px">Nome</label>
                    <input v-model="data.nome" id="nome" class="form-control" style="width:500px" placeholder="Nome">
                </div>

                <div class="form-group">
                    <label class="form-label" style="margin-right:20px">Idade</label>
                    <input v-model="data.idade" class="form-control" style="width:100px" type="number">
                </div>

                <div class="form-group">
                    <label class="form-label" style="margin-right:20px">Sexo</label>
                    <div class="form-check">
                        <input v-model="data.sexo" value="Masculino" :checked="data.sexo == 'Masculino'" class="form-check-input" type="radio" name="sexo" id="sexoM">
                        <label class="form-check-label" for="sexo" style="margin-right:10px">
                            Masculino
                        </label>
                    </div>
                    <div class="form-check">
                        <input v-model="data.sexo" value="Feminino" :checked="data.sexo == 'Feminino'" class="form-check-input" type="radio" name="sexo" id="sexoF">
                        <label class="form-check-label" for="sexo">
                            Feminino
                        </label>
                    </div>
                </div>
                <div id="actionButtons">
                    <button @click="salvar" style="margin-right: 5px;" type="button" class="btn btn-success">Salvar</button>
                    <button @click="excluir" type="button" class="btn btn-secondary">Excluir</button>
                    <ModalPergunta ref="modalPergunta"></ModalPergunta>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  import ModalPergunta from '../components/ModalPergunta.vue'
  export default {
        name: 'CadastroEdicaoPacienteView',
        components: { ModalPergunta },
        beforeUpdate() {
            console.log('teste')
        },
        data() {
            return {
                data: {
                    codigoPaciente: this.$route.params.codigoPaciente,
                    nome: this.$route.params.nome,
                    idade: this.$route.params.idade,
                    sexo: this.$route.params.sexo             
                }
            }
        },
        methods: {
            salvar() {
                console.log(this.data)
                //implementar função de cadastroedicao
            },
            guardarDados() {
                localStorage.setItem('nomePaciente', this.data.nome)
                localStorage.setItem('idadePaciente', this.data.idade)
                localStorage.setItem('sexoPaciente', this.data.sexo)
            },
            recuperarDados() {
                this.data.nome = localStorage.getItem('nomePaciente')
                this.data.idade = localStorage.getItem('idadePaciente')
                this.data.sexo = localStorage.getItem('sexoPaciente')
            },
            async excluir() {
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Paciente',
                    message: 'Tem certeza que gostaria de excluir o paciente?',
                    okButton: 'Sim',
                })

                if (ok) {
                    //implementar a funçao de exclusao
                    alert('You have successfully delete this page.')
                }
            },
        },
        mounted() {
            window.addEventListener('beforeunload', this.guardarDados)
            window.addEventListener('load', this.recuperarDados)
        },
        unmounted() {
            localStorage.removeItem('nomePaciente');
            localStorage.removeItem('idadePaciente');
            localStorage.removeItem('sexoPaciente');
        }
        
    }
</script>

<style>
    .form-group {
        display:flex;
        margin: 15px;
    }

    .form-check-input:checked {
        background-color: #28a745 !important;
        border-color: #28a745 !important;
    }

</style>

