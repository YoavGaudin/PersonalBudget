<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import * as types from './store/types'

  export default {
    name: 'App',
    methods: {
      ...mapActions({
        loadData: types.LOAD_DATA
      })
    },
    created() {
      this.loadData()
    }
  }
</script>

<style>

</style>
