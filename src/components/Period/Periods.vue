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
    }
  }
</script>

<style scoped>

</style>
