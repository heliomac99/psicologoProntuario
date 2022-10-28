<template>
    <form @submit.prevent="submit">
        <slot></slot>
    </form>
</template>

<script>
  export default {
        name: 'ValidationForm',
        props: {
            model: null,
            validations: [],
        },
        data() {
            return{
                erros: 0,
                submitted: false
            }
        },
        methods: {
            submit() {
                this.submitted = true
                if(this.validar()){
                    this.$emit('save');
                }                
            },
            insereChangeEventInput(){
                let inputs = document.querySelectorAll('input')
                inputs.forEach(element => {
                    element.addEventListener('change', () => {
                        this.validar()
                    });
                })
            },
            insereErrorMessageRequired(field, label){
                document.querySelectorAll('span[name=' + field + ']')[0].innerHTML = label + " obrigatório"
            },
            insereErrorMessageEmail(field, label){
                document.querySelectorAll('span[name=' + field + ']')[0].innerHTML = label + " inválido"
            },
            insereErrorMessageMinlength(field, label, length){
                document.querySelectorAll('span[name=' + field + ']')[0].innerHTML = label + " deve conter pelo menos " + length + " digitos"
            },
            insereErrorMessageEqual(field, label){
                document.querySelectorAll('span[name=' + field + ']')[0].innerHTML = label + " não conferem"
            },
            limparErros(){
                let spans = document.querySelectorAll('span')
                spans.forEach(element => {
                    element.innerHTML = ''
                })
            },
            validar(){
                this.limparErros()
                this.erros = 0

                if(this.submitted){
                    document.querySelectorAll('span')
                    this.validations.forEach(element => {
                        if(element.validation === 'required'){
                            if(!this.model[element.field]){
                                this.erros++
                                this.insereErrorMessageRequired(element.field, element.label)
                            }
                        }
                        else if(element.validation === 'email'){
                            const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                            if(!regexEmail.test(this.model[element.field])){
                                this.erros++
                                this.insereErrorMessageEmail(element.field, element.label)
                            }
                        }
                        else if(element.validation === 'minLength'){
                            if(this.model[element.field].length < element.length){
                                this.erros++
                                this.insereErrorMessageMinlength(element.field, element.label, element.length)
                            }
                        }
                        else if(element.validation === 'equal'){
                            if(this.model[element.field] != this.model[element.field2]){
                                this.erros++
                                this.insereErrorMessageEqual(element.field, element.label, element.length)
                            }
                        }

                    });

                    if(this.erros > 0)
                        return false

                    return true
                } 
        
            }
        },
        mounted() {
            this.insereChangeEventInput()
        }
    }
</script>



