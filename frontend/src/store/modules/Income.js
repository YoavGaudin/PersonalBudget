import * as types from '../types'
import router from '../../router'

const state = {
  incomes: [
    {id: 0, periodId: 0, label: 'salary', value: 14000},
    {id: 1, periodId: 0, label: 'salary', value: 5000},
    {id: 2, periodId: 1, label: 'salary', value: 14000},
    {id: 3, periodId: 1, label: 'salary', value: 5000}
  ]
}

const getters = {
  [types.INCOMES]: state => {
    return state.incomes
  },
  [types.TOTAL_INCOME]: state => {
    const periodId = router.currentRoute.params.periodId
    const reduce = (total, income) => {
      if (income.periodId === periodId) {
        return total + income.value
      } else {
        return total
      }
    }
    return Object.values(state.incomes).reduce(reduce, 0)
  }
}

const mutations = {
  [types.ADD_INCOME]: (state, payload) => {
    this.state.incomes.push(payload)
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
