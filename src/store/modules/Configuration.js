import * as types from '../types'
import {store} from '../../store/store'

const state = {
  money: {
    decimal: '.',
    thousands: ',',
    suffix: ' ₪',
    precision: 1,
  }
}

const getters = {
  [types.MONEY]: state => {
    return state.money
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
