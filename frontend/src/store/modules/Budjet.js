import * as types from '../types'
import { store } from '../../store/store'

const state = {
  budjets: [
    {periodId: 0,
      plannedExpenses: {
        0: {planned: 3000, spent: 0},
        1: {planned: 1500, spent: 2000},
        2: {planned: 2000, spent: 1500},
        3: {planned: 1760, spent: 1760},
        4: {planned: 0, spent: 0}
      }}
  ]
}

const getters = {
  [types.BUDJET]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    return state.budjets.find(b => b.periodId === parseInt(periodId))
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
