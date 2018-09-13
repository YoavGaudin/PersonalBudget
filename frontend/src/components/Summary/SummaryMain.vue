<template>
  <b-card header="Summary">
    <b-row>
      <b-col>
        <b-row><b-col>Planned</b-col></b-row>
        <hr>
        <b-row><b-col>
          {{ totalIncome }}
        </b-col></b-row>
        <b-row><b-col>-</b-col></b-row>
        <b-row><b-col>
          {{ totalExpense.planned }}
        </b-col></b-row>
        <hr>
        <b-row><b-col>
          {{ totalIncome - totalExpense.planned }}
        </b-col></b-row>
      </b-col>
      <b-col>
        <b-row><b-col>Actual</b-col></b-row>
        <hr>
        <b-row><b-col>
          {{ totalIncome }}
        </b-col></b-row>
        <b-row><b-col>-</b-col></b-row>
        <b-row><b-col>
          {{ totalExpense.spent }}
        </b-col></b-row>
        <hr>
        <b-row><b-col>
          {{ totalIncome - totalExpense.spent }}
        </b-col></b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '../../store/types.js'

export default {
  computed: {
    ...mapGetters({
      totalExpense: types.TOTAL_EXPENSE,
      totalIncome: types.TOTAL_INCOME
    })
  }
}
</script>

<style scoped>
</style>
