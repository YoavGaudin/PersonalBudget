import * as types from '../types'
import {store} from '../../store/store'

const state = {
  incomes: [
    {id: 0, periodId: 0, label: 'salary', value: 14000},
    {id: 1, periodId: 0, label: 'salary', value: 5000},
    {id: 2, periodId: 1, label: 'salary', value: 11000},
    {id: 3, periodId: 1, label: 'salary', value: 5000}
  ]
}

const getAvailableId = (incomes) => {
  const periodId = store.getters[types.ACTIVE_PERIOD]
  const ids = incomes.filter(item => item.periodId === periodId).map(item => item.id)
  return ids.sort().reduce((id, item) => {
    if (id <= item) {
      return id
    }
    return item
  }, 0)
}

const getters = {
  [types.INCOMES]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    return state.incomes.filter((income) => income.periodId === parseInt(periodId))
  },
  [types.TOTAL_INCOME]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    const reduce = (total, income) => {
      if (income.periodId === parseInt(periodId)) {
        total += income.value
      }
      return total
    }
    return Object.values(state.incomes).reduce(reduce, 0)
  }
}

const mutations = {
  [types.ADD_INCOME]: (state, payload) => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    const newIncome = Object.assign({periodId: periodId, id: getAvailableId(state.incomes)}, payload)
    state.incomes.push(newIncome)
  },
  [types.DELETE_INCOME]: (state, payload) => {

  }
}

const actions = {}

export default {
  state,
  mutations,
  actions,
  getters
}
