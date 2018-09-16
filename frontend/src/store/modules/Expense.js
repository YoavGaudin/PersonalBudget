import * as types from '../types'
import { store } from '../../store/store'

const state = {
  expenses: [
    {categoryId: 0, id: 0, periodId: 1, total: 3000},
    {categoryId: 1, id: 1, periodId: 1, total: 2000},
    {categoryId: 2, id: 2, periodId: 1, total: 1500},
    {categoryId: 3, id: 3, periodId: 1, total: 1760}
  ]
}

const getters = {
  [types.EXPENSES]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    return state.expenses.filter((cat) => cat.periodId === parseInt(periodId))
  },
  [types.TOTAL_EXPENSE]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    const reduce = (total, expense) => {
      if (expense.periodId === parseInt(periodId)) {
        total.total += expense.total
      }
      return total
    }
    return Object.values(state.expenses).reduce(reduce, {total: 0})
  }
}

const mutations = {

}

const actions = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
