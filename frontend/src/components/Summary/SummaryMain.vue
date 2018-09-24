<template>
  <b-card :header="'Total Income: ' + totalIncome">
    <b-table small hover :fields="fields" :items="items"></b-table>
  </b-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as types from '../../store/types.js'

  export default {
    data() {
      return {
        fields: [
          {key: 'indexCol', label: ''}, 'planned', 'actual'
        ],
      }
    },
    computed: {
      ...mapGetters({
        totalExpense: types.TOTAL_EXPENSE,
        totalIncome: types.TOTAL_INCOME
      }),
      items() {
        return [
          {indexCol: 'Expense', planned: this.totalExpense.planned, actual: this.totalExpense.spent},
          {
            indexCol: 'Balance',
            planned: this.totalIncome - this.totalExpense.planned,
            actual: this.totalIncome - this.totalExpense.spent
          }
        ]
      }
    }
  }
</script>

<style scoped>
</style>
