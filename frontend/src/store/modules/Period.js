import * as types from '../types'

const state = {
  periods: [
    {id: 0, start: new Date(2018, 8, 10), end: new Date(2018, 9, 10), incomes: [], expenses: []},
    {id: 1, start: new Date(2018, 9, 10), end: new Date(2018, 10, 10), incomes: [], expenses: []},
    {id: 2, start: new Date(2018, 10, 10), end: new Date(2018, 11, 10), incomes: [], expenses: []}
  ],
  activePeriod: null
}

const getters = {
  [types.PERIODS]: state => {
    return state.periods
  },
  [types.ACTIVE_PERIOD]: state => {
    if (state.activePeriod) {
      return state.activePeriod
    }
    const today = new Date()
    const period = state.periods.find(p => p.start <= today && p.end > today)
    state.activePeriod = period ? period.id : 0
    return state.activePeriod
  }
}

const mutations = {
  [types.ADD_PERIOD]: (state, payload) => {
    if (!payload.hasOwnProperty('id')) {
      payload['id'] = state.periods.length > 0 ? state.periods[-1].id : 0
    }
    state.periods.push(payload)
  },
  [types.SET_ACTIVE_PERIOD]: (state, payload) => {
    state.activePeriod = payload
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions,
  getters
}
