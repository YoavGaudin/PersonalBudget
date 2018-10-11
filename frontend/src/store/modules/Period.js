import * as types from '../types'
import axiosInstance from "../axios";

const state = {
  periods: [],
  maxId: -1,
  activePeriod: null
}

const getLatestDate = (state) => {
  if (state.periods.length === 0) {
    let today = new Date()
    today.setDate(10)
    return today
  }
  return state.periods.reduce((latest, p) => {
    if (p.end > latest) {
      return p.end
    }
    return latest
  }, new Date(1977, 1, 1))
}
const getters = {
  [types.PERIODS]: state => {
    if (state.activePeriod !== null) {
      const currentPeriodIndex = state.periods.findIndex(p => p.id === state.activePeriod)
      const firstPeriodIndex = currentPeriodIndex > 1 ? currentPeriodIndex - 2 : 0
      const lastPeriodIndex = state.periods.length > firstPeriodIndex + 6 ? firstPeriodIndex + 6 : state.periods.length
      return state.periods.slice(firstPeriodIndex, lastPeriodIndex)
    } else {
      return state.periods
    }
  },
  [types.ACTIVE_PERIOD]: state => {
    if (state.activePeriod !== null) {
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
    const newPeriod = Object.assign({}, payload)
    if (!payload.hasOwnProperty('id')) {
      newPeriod['id'] = state.maxId + 1
      state.maxId++
    }
    const start = payload.hasOwnProperty('start') ? new Date(payload.start) : getLatestDate(state)
    let end = new Date(start)
    end.setMonth(end.getMonth() + 1)
    Object.assign(newPeriod, {start: start, end: end})
    state.periods.push(newPeriod)
    state.periods.sort((p1, p2) => p1.id - p2.id)
  },
  [types.SET_ACTIVE_PERIOD]: (state, payload) => {
    state.activePeriod = payload
  },
  [types.SET_MAX_PERIOD_ID]: (state, payload) => {
    state.maxId = payload
  }
}

const actions = {
  [types.SAVE_PERIODS]: ({state}) => {
    axiosInstance.put('periods.json', state)
      .then(response => {
        // JSON responses are automatically parsed.
      })
      .catch(e => {
        alert("Data failed to save")
      })
  },
  [types.LOAD_PERIODS]: ({state, commit}) => {
    axiosInstance.get('periods.json')
      .then(response => {
        if (response.data) {
          response.data.periods.forEach(period => commit(types.ADD_PERIOD, period))
          commit(types.SET_MAX_PERIOD_ID, response.data.maxId)
        }
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
