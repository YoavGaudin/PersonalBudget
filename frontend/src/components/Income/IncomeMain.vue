<template>
  <b-card header="Incomes">
    <editable-table small hover :fields="fields" :items="items" @cellEdited="handleEdit">

    </editable-table>
    <b-btn v-if="!showForm" @click="showForm = true">Add</b-btn>
    <b-form v-if="showForm" inline @submit.prevent="handleSubmit">
      <b-input class="mr-2"
               type="text"
               required
               v-model="formData.label"
               placeholder="label"></b-input>
      <b-input class="mr-2"
               type="text"
               v-money="{precision: 0}"
               v-model="formData.value"
               placeholder="value"></b-input>
      <b-btn type="submit">OK</b-btn>
    </b-form>
  </b-card>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../../store/types.js'
  import money from '../../v-money/directive'
  import {format, unformat} from '../../v-money/utils'
  import EditableTable from '../utils/EditableTable'

  export default {
    data() {
      return {
        fields: [
          {key: 'label', label: 'Type', editable: true},
          {key: 'value', label: 'Value', money: {precision: 0}, editable: true},
        ],
        showForm: false,
        formData: {
          label: null,
          value: null
        }
      }
    },
    computed: {
      ...mapGetters({
        incomes: types.INCOMES
      }),
      items() {
        return this.incomes.map(income => {
          return Object.assign({}, {key: income.id}, income)
        })
      },
      newIncome() {
        return {
          label: this.formData.label,
          value: unformat(this.formData.value, 0)
        }
      }
    },
    methods: {
      ...mapMutations({
        addIncome: types.ADD_INCOME,
        setIncome: types.SET_INCOME
      }),
      handleSubmit() {
        this.addIncome(this.newIncome)
        this.showForm = false
      },
      handleEdit(payload) {
        this.setIncome({id: payload.row, [payload.col]: payload.value})
      }
    },
    components: {
      EditableTable
    },
    directives: {
      money
    }
  }
</script>

<style scoped>

</style>
