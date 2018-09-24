<template>
  <b-container fluid>
    <b-row>
      <b-col cols="6">
        <app-income-main></app-income-main>
      </b-col>
      <b-col cols="6">
        <app-summary-main></app-summary-main>
      </b-col>
    </b-row>
    <hr>
    <b-row>
      <b-col>
        <app-budget-main></app-budget-main>
      </b-col>
      <b-col>
        <app-expense-main></app-expense-main>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../../store/types.js'
  import AppIncomeMain from '../Income/IncomeMain'
  import AppExpenseMain from '../Expense/ExpenseMain'
  import AppBudgetMain from '../Budget/BudgetMain'
  import AppSummaryMain from '../Summary/SummaryMain'

  export default {
    computed: {
      ...mapGetters({
        periods: types.PERIODS,
        activePeriod: types.ACTIVE_PERIOD
      })
    },
    methods: {
      ...mapMutations({
        setActivePeriod: types.SET_ACTIVE_PERIOD
      })
    },
    components: {
      AppIncomeMain,
      AppExpenseMain,
      AppBudgetMain,
      AppSummaryMain
    }
  }
</script>

<style scoped>
</style>
