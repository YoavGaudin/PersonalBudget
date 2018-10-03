<template>
  <b-card :header="'Total Income: ' + totalIncome">
    <b-table small hover :fields="fields" :items="items"></b-table>
  </b-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as types from '../../store/types.js'
  import {format} from '../../v-money/utils'

  export default {
    data() {
      return {
        fields: [
          {key: 'indexCol', label: ''},
          {key: 'planned', formatter: this.currencyFormatter},
          {key: 'actual', formatter: this.currencyFormatter}
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
    },
    methods: {
      currencyFormatter(value) {
        return format(value)
      }
    }
  }
</script>

<style scoped>
</style>
