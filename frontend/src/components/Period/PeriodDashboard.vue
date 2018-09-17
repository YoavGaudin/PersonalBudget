<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3">
        <app-income-main></app-income-main>
      </b-col>
      <b-col cols="3">
        <app-summary-main></app-summary-main>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <app-budjet-main></app-budjet-main>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../../store/types.js'
  import AppIncomeMain from '../Income/IncomeMain'
  import AppBudjetMain from '../Budjet/BudjetMain'
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
      AppBudjetMain,
      AppSummaryMain
    }
  }
</script>

<style scoped>
</style>
