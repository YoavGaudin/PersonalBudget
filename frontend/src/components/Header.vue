<template>
  <b-navbar variant="info" toggleable>
    <b-navbar-brand to="/">MyBudjet</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-btn @click="handleSave">Save</b-btn>
      <b-nav-item to="/signup">SignUp</b-nav-item>
      <b-nav-item to="/login">Login</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  import {mapActions} from 'vuex'
  import * as types from '../store/types'

  export default {
    data() {
      return {
        form: {
          email: '',
          pwd: ''
        }
      }
    },
    methods: {
      ...mapActions({
        saveData: types.SAVE_DATA
      }),
      handleSave() {
        this.saveData()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
