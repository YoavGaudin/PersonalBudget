<template>
  <b-card header="Main Budjet" v-if="budget">
    <editable-table small hover bordered fixed :fields="fields" :items="items" @cellEdited="handleEdit"></editable-table>
    <b-btn v-if="!showForm" @click="showForm = true">Add</b-btn>
    <b-form v-if="showForm" inline @submit="createCategory">
      <b-input class="mr-2"
               type="text"
               required
               v-model="formData.name"
               placeholder="name"></b-input>
      <b-input class="mr-2"
               type="text"
               v-model="formData.description"
               placeholder="Description"></b-input>
      <b-btn type="submit">OK</b-btn>
    </b-form>
  </b-card>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../../store/types.js'
  import money from '../../v-money/directive'
  import EditableTable from '../utils/EditableTable'

  const emptyPlannedExpense = {planned: 0, spent: 0}

  export default {
    data() {
      return {
        fields: [
          {key: 'categoryName', label: 'Category', isRowHeader: true},
          {key: 'planned', label: 'Planned', editable: true, money:{precision: 0}},
          {key: 'spent', label: 'Spent', money: null},
          {key: 'diff', label: 'Diff', money: {}},
        ],
        showForm: false,
        formData: {name: '', description: null}
      }
    },
    computed: {
      ...mapGetters({
        categories: types.CATEGORIES,
        budget: types.BUDGET,
        money: types.MONEY
      }),
      items() {
        if (this.budget === null) {
          return []
        }
        const defaultRow = {planned: 0, spent: 0}
        return Object.entries(this.categories).map(entry => {
          const id = entry[0]
          const cat = entry[1]
          const plannedExpenses = Object.assign({[id]: defaultRow}, this.budget.plannedExpenses)[id]
          return {
            'key': id,
            'categoryName': cat.description,
            'planned': plannedExpenses.planned,
            'spent': plannedExpenses.spent,
            'diff': plannedExpenses.planned - plannedExpenses.spent
          }
        })

      }
    },
    methods: {
      ...mapMutations({
        addBudget: types.ADD_BUDGET,
        setBudget: types.SET_BUDGET,
        addCategory: types.ADD_CATEGORY
      }),
      handleEdit(payload) {
        this.budget.plannedExpenses[payload.row] = Object.assign({}, emptyPlannedExpense,
          {
            [payload.col]: payload.value
          }
        )
        this.setBudget(this.budget)
      },
      createCategory(event) {
        event.preventDefault();
        this.showForm = false
        if (this.formData.description === null) {
          this.formData.description = this.formData.name
        }
        const newCategory = {[this.formData.name]: {description: this.formData.description}}
        this.addCategory(newCategory)
      }
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus()
        }
      }
      ,
      money
    },
    components: {
      EditableTable
    }
  }
</script>

<style scoped>

</style>
