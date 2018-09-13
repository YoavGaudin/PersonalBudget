<template>
  <b-card header="Income">
    <b-row v-for="income in incomes" :key="income.id">
      <b-col> {{ income.label }}: </b-col>
      <b-col> {{ income.value }}</b-col>
    </b-row>
  </b-card>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '../../store/types.js'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      incomes: types.INCOMES
    })
  }
}
</script>

<style scoped>

</style>
