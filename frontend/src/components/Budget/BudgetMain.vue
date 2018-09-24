<template>
  <b-card header="Main Budjet" v-if="budget">
    <div v-money="money">123.5</div>
    <b-table small hover bordered fixed :fields="fields" :items="items">
      <template slot="planned" slot-scope="data">
        <span v-if="categoryEditMode(data.index, 'planned')" @keypress.enter="exitEditMode(data.index)">
          <b-form-input size="sm" v-focus type="text"
                        v-model="budget.plannedExpenses[data.index].planned"></b-form-input>
        </span>
        <div v-else
             v-money="money"
             @click.stop="enterEditMode(data.index, 'planned')">{{ data.value }}{{ data.key }}
        </div>
      </template>
      <template slot="spent" slot-scope="data">
        <span v-if="categoryEditMode(data.index, 'spent')" @keypress.enter="exitEditMode(data.index)">
          <b-form-input size="sm" v-focus type="text" v-model="budget.plannedExpenses[data.index].spent"></b-form-input>
        </span>
        <div v-else
             v-money="money"
             @click.stop="enterEditMode(data.index, 'spent')">{{ data.value }}{{ data.key }}
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as types from '../../store/types.js'

  export default {
    data() {
      return {
        fields: [
          {key: 'categoryName', label: 'Category', isRowHeader: true},
          {key: 'planned', label: 'Planned'},
          {key: 'spent', label: 'Spent'},
          {key: 'diff', label: 'Diff'},
        ],
        editMode: {}
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
        return Object.values(this.categories).map((cat, id) => {
          return {
            'categoryName': cat.description,
            'planned': this.budget.plannedExpenses[id].planned,
            'spent': this.budget.plannedExpenses[id].spent,
            'diff': this.budget.plannedExpenses[id].planned - this.budget.plannedExpenses[id].spent
          }
        })

      }
    },
    methods: {
      ...mapActions({
        addBudget: types.ADD_BUDGET,
        setBudget: types.SET_BUDGET
      }),
      enterEditMode(row, col) {
        if (this.editMode.hasOwnProperty(row)) {
          this.editMode[row] = col
        } else {
          this.editMode = Object.assign({}, this.editMode, {[row]: col})
        }
      },
      exitEditMode(row) {
        this.editMode = Object.assign({}, this.editMode, {[row]: null})
        this.setBudget(this.budget)
      },
      categoryEditMode(row, col) {
        return this.editMode.hasOwnProperty(row) && this.editMode[row] === col
      }
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus()
        }
      }
    }
  }
</script>

<style scoped>

</style>
