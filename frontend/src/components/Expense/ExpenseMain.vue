<template>
  <b-card header="Expense">
    <b-row>
      <b-col>Category</b-col>
      <b-col>planned</b-col>
      <b-col>spent</b-col>
      <b-col>diff</b-col>
    </b-row>
    <hr>
    <b-row v-for="(exp, label) in categories" :key="exp.id">
      <b-col>{{ label }}:</b-col>
      <b-col>{{ exp.planned }}</b-col>
      <b-col>{{ exp.spent }}</b-col>
      <b-col>{{ exp.planned - exp.spent }}</b-col>
    </b-row>
  </b-card>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '../../store/types.js'

export default {
  computed: {
    ...mapGetters({
      categories: types.CATEGORIES
    })
  }
}
</script>

<style scoped>

</style>
