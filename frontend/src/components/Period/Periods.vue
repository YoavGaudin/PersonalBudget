<template>
  <b-container>
    <b-nav pills>
      <b-nav-item
        v-for="p in periods"
        :active="p.id === activePeriod"
        :key="p.id"
        :to="{name: 'period', params: {periodId: p.id}}"
        @click.prevent="setActivePeriod(p.id)">
        {{ p.start.toLocaleString('en-GB', { month: 'short', year: 'numeric' }) }}
      </b-nav-item>
      <b-btn @click="addPeriod">+</b-btn>
    </b-nav>
    <hr>
    <b-row><b-col>
      <router-view/>
    </b-col></b-row>
  </b-container>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../../store/types.js'

  export default {
    computed: {
      ...mapGetters({
        periods: types.PERIODS,
        activePeriod: types.ACTIVE_PERIOD
      })
    },
    methods: {
      ...mapMutations({
        setActivePeriod: types.SET_ACTIVE_PERIOD,
        addPeriod: types.ADD_PERIOD
      }),
      getMonth(d) {
        const months = {
          0: 'January',
          1: 'February',
          2: 'March',
          3: 'April',
          4: 'May',
          5: 'June',
          6: 'July',
          7: 'August',
          8: 'September',
          9: 'October',
          10: 'November',
          11: 'December'
        }
        return months[d.getMonth()]
      }
    }
  }
</script>

<style scoped>

</style>
