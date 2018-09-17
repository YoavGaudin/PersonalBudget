<template>
  <b-card header="Main Budjet" v-if="budjet">
    <b-row>
      <b-col>Category</b-col>
      <b-col>planned</b-col>
      <b-col>spent</b-col>
      <b-col>diff</b-col>
    </b-row>
    <hr>
    <b-row v-for="(cat, id) in categories" :key="id">
      <b-col>{{ cat.description }}</b-col>
      <b-col>{{ budjet.plannedExpenses[id].planned }}</b-col>
      <b-col>{{ budjet.plannedExpenses[id].spent }}</b-col>
      <b-col>{{ budjet.plannedExpenses[id].planned - budjet.plannedExpenses[id].spent }}</b-col>
      <b-col>
        <a href="#" @click="handleEditModeClick(id)">{{ editMode.hasOwnProperty(id) && editMode[id] ? 'save' : 'edit'}}</a>
      </b-col>

    </b-row>
  </b-card>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '../../store/types.js'

export default {
  data() {
    return {
      editMode: {}
    }
  },
  computed: {
    ...mapGetters({
      categories: types.CATEGORIES,
      budjet: types.BUDJET
    })
  },
  methods: {
    handleEditModeClick(id) {
      if (this.editMode.hasOwnProperty(id)) {
        this.editMode[id] = !this.editMode[id]
      } else {
        this.editMode = Object.assign({}, this.editMode, {[id]: true})
      }
    }
  }
}
</script>

<style scoped>

</style>
