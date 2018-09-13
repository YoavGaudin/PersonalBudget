import * as types from '../types'

const state = {
  categories: {
    rent: {id: 0, planned: 3000, spent: 0},
    bills: {id: 1, planned: 1500, spent: 2000},
    groceries: {id: 2, planned: 2000, spent: 1500},
    loans: {id: 3, planned: 1760, spent: 1760}
  }
}

const getters = {
  [types.CATEGORIES]: state => {
    return state.categories
  },
  [types.TOTAL_EXPENSE]: state => {
    const reduce = (total, expense) => {
      total.planned += expense.planned
      total.spent += expense.spent
      return total
    }
    return Object.values(state.categories).reduce(reduce, {planned: 0, spent: 0})
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
