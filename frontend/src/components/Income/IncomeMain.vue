<template>
  <b-card header="Incomes">
    <b-table small hover :fields="fields" :items="items"></b-table>
  </b-card>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '../../store/types.js'

export default {
  data () {
    return {
      fields: [
        {key: 'label', label: 'Type'},
        {key: 'value', label: 'Value'},
      ],
    }
  },
  computed: {
    ...mapGetters({
      incomes: types.INCOMES
    }),
    items() {
      return this.incomes
    }
  }
}
</script>

<style scoped>

</style>
