<template>
  <b-card header="Main Budjet" v-if="budget">
    <b-btn @click="saveBudgets">SAVE</b-btn>
    <b-btn @click="loadBudgets">LOAD</b-btn>
    <b-table small hover bordered fixed :fields="fields" :items="items">
      <template slot="planned" slot-scope="data">
        <span v-if="cellEditMode(data.item.key, 'planned')" @keypress.enter="exitEditMode">
          <b-input v-money="{precision: 0}" size="sm" v-focus type="text"
                   v-model="editedCell"></b-input>
        </span>
        <div v-else
             @click.stop="enterEditMode(data.item.key, 'planned')">{{ data.value }}
        </div>
      </template>
      <template slot="spent" slot-scope="data">
        <div @click.stop="enterEditMode(data.item.key, 'spent')">{{ data.value }}
        </div>
      </template>
      <template slot="diff" slot-scope="data">
        <div>{{ data.value }}
        </div>
      </template>
    </b-table>
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
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import * as types from '../../store/types.js'
  import money from '../../v-money/directive'
  import {unformat, format} from '../../v-money/utils'

  const emptyPlannedExpense = {planned: 0, spent: 0}

  export default {
    data() {
      return {
        fields: [
          {key: 'categoryName', label: 'Category', isRowHeader: true},
          {key: 'planned', label: 'Planned', formatter: this.currencyFormatter},
          {key: 'spent', label: 'Spent', formatter: this.currencyFormatter},
          {key: 'diff', label: 'Diff', formatter: this.currencyFormatter},
        ],
        editMode: {row: null, col: null},
        editedCell: null,
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
      ...mapActions({
        saveBudgets: types.SAVE_BUDGETS,
        loadBudgets: types.LOAD_BUDGETS
      }),
      enterEditMode(row, col) {
        this.editedCell = null
        this.editMode = {row: row, col: col}
      },
      exitEditMode() {
        this.budget.plannedExpenses[this.editMode.row] = Object.assign({}, emptyPlannedExpense,
          {
            [this.editMode.col]: unformat(this.editedCell, 0)
          }
        )
        this.setBudget(this.budget)
        this.editMode = {row: null, col: null}
      },
      cellEditMode(row, col) {
        return this.editMode.row === row && this.editMode.col === col
      }
      ,
      currencyFormatter(value) {
        return format(value)
      }
      ,
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
    }
  }
</script>

<style scoped>

</style>
