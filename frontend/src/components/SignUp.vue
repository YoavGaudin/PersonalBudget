<template>
  <b-container>
    <b-row align-h="center"><b-col cols=6>
      <b-card>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Email Address:" label-for="emailInput">
        <b-form-input id="emailInput" type="email" required v-model="form.email" ></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="passwordInput">
        <b-form-input id="passwordInput" type="password" required v-model="form.password"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">SUBMIT</b-button>
    </b-form>
    </b-card>
    </b-col></b-row>
  </b-container>
</template>

<script>
import axios from '../axios-auth.js'

export default {

  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      const formData = this.form
      axios.post('/signupNewUser?key=AIzaSyDLBKlekoMoLAaS2-8bOYIO_x8TZ8QhnAM', formData)
        .then(res => console.log(res))
        .catch(err => alert(err))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
