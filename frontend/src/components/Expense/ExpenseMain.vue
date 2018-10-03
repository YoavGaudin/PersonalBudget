<template>
  <b-card header="Expenses">
    <b-row>
      <b-col v-if="!showForm">
        <b-btn @click="showForm = true">Add</b-btn>
      </b-col>
      <b-col v-if="showForm">
        <app-new-expense-form @created="showForm = false"></app-new-expense-form>
      </b-col>
    </b-row>
    <b-table v-if="expenses.length > 0" small hover :fields="fields" :items="items"></b-table>
  </b-card>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../../store/types.js'
  import AppNewExpenseForm from './NewExpenseForm'
  import {format} from '../../v-money/utils'

  export default {
    name: "ExpenseMain",
    data() {
      return {
        showForm: false,
        fields: [
          {key: 'category', label: 'Category'},
          {key: 'desc', label: 'Description'},
          {key: 'total', label: 'Value', formatter: this.currencyFormatter},
        ]
      }
    },
    computed: {
      ...mapGetters({
        expenses: types.EXPENSES,
        categories: types.CATEGORIES
      }),
      items() {
        return this.expenses.map(expense => {
          return Object.assign({}, expense, {category: this.categories[expense.categoryId].description})
        })
      }
    },
    methods: {
      ...mapMutations({
        addExpense: types.ADD_EXPENSE
      }),
      currencyFormatter(value) {
        return format(value)
      }
    },
    components: {
      AppNewExpenseForm
    }
  }
</script>

<style scoped>

</style>
