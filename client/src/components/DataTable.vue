<template>
        <table class="table" style="margin-top:20px;">
            <thead>
                <tr>
                    <th style="width:20%" v-if="showEditButton || showRemoveButton"></th>
                    <th v-for="(value, index) in cols" :key="index" style="color:#28a745" scope="col">{{value}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in visibleCols" :key="index">
                    <td v-if="showEditButton || showRemoveButton" align="center">
                        <button v-if="showEditButton" type="button" @click="$emit('editar', data[index] )"  class="btn btn-success">
                            <font-awesome-icon icon="fa-solid fa-pen" />
                        </button>
                        <button v-if="showRemoveButton" style="margin-left:10px;" type="button" @click="$emit('excluir', data[index] )" class="btn btn-secondary">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </td>
                    <td v-for="(value, propertyName, index) in item" :key="index">{{value}}</td>
                </tr>
            </tbody>
        </table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    cols: null,
    data: null,
    hiddenCols: null,
    showEditButton: null,
    showRemoveButton: null
  },
  computed: {
    visibleCols () {
      const result = JSON.parse(JSON.stringify(this.data))

      if (this.hiddenCols) {
        for (let j = 0; j < this.hiddenCols.length; j++) {
          for (let i = 0; i < this.data.length; i++) {
            const propertyName = this.hiddenCols[j]
            delete result[i][propertyName]
          }
        }
      }
      return result
    }
  }
}
</script>

<style>
    .form-group {
        display: flex;
        margin: 15px;
    }
</style>
