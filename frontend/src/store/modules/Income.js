import * as types from '../types'
import {store} from '../../store/store'
import axiosInstance from '../axios'

const state = {
  incomes: []
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
    if (!payload.hasOwnProperty('periodId') || payload.periodId === null) {
      Object.assign(payload, {periodId: periodId})
    }
    const newIncome = Object.assign({id: getAvailableId(state.incomes)}, payload)
    state.incomes.push(newIncome)
  },
  [types.DELETE_INCOME]: (state, payload) => {

  }
}

const actions = {
  [types.SAVE_INCOMES]: (context) => {
    axiosInstance.put('incomes.json', state.incomes)
      .then(response => {
        // JSON responses are automatically parsed.
      })
      .catch(e => {
        alert("Data failed to save")
      })
  },
  [types.LOAD_INCOMES] : ({state, commit}) => {
    axiosInstance.get('incomes.json')
      .then(response => {
        response.data.forEach(i => commit(types.ADD_INCOME, i))
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
