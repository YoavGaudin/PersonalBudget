<template>
  <b-container fluid>
    <b-row class="mb-4"><b-col>
        <app-header></app-header>
    </b-col></b-row>
    <b-row align-h="center"><b-col>
      <app-periods/>
    </b-col></b-row>
    <b-row><b-col>
      <router-view/>
    </b-col></b-row>

  </b-container>
</template>

<script>
import AppHeader from './Header'
import AppPeriods from '../components/Period/Periods'
import {mapGetters} from 'vuex'
import * as types from '../store/types.js'

export default {
  data () {
    return {
      form: {
        email: '',
        pwd: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      periods: types.PERIODS,
      activePeriod: types.ACTIVE_PERIOD
    })
  },
  components: {
    AppHeader,
    AppPeriods
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
