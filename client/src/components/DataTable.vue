<template>
    <table class="table" style="margin-top:20px;">
        <thead>
            <tr>
                <th style="width:20%" v-if="showEditButton || showRemoveButton || showAddButton"></th>
                <th v-for="(value, index) in colLabels" :key="index" style="color:#28a745" scope="col">{{value}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in filteredData" :key="index">
                <td v-if="showEditButton || showRemoveButton ||  showAddButton" align="center">
                    <button v-if="showAddButton" style="margin-left:10px;" type="button" @click="$emit('addItem', item[id] )" class="btn btn-success">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                    </button>
                    <button title="Editar" style="margin-left:10px;"  v-if="showEditButton" type="button" @click="$emit('editar', data[index] )" class="btn btn-success">
                        <font-awesome-icon icon="fa-solid fa-pen" />
                    </button>
                    <button title="Excluir" v-if="showRemoveButton" style="margin-left:10px;" type="button" @click="$emit('excluir', item[id] )" class="btn btn-secondary">
                        <font-awesome-icon icon="fa-solid fa-trash" />
                    </button>

                </td>
                <td v-for="(value, index) in dataFields" :key="index">{{item[value]}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
  export default {
        name: 'DataTable',
        props: {
            colLabels: null,
            data: null,
            dataFields: null,
            showEditButton: null,
            showRemoveButton: null,
            showAddButton: null,
            id: null
        },
        data() {
            return {
                filteredData: this.data
            }
        },
        methods: {
            filter(propertyName, value) {
                this.filteredData = this.data
                if (value) {
                    this.filteredData = this.filteredData.filter(function (el) {
                        return el[propertyName].toLowerCase().includes(value.toLowerCase())
                    });

                } 
            }
        },
        mouted() {
            alert('teste')
        }
    }
</script>

<style>
    .form-group {
        display: flex;
        margin: 15px;
    }
</style>

