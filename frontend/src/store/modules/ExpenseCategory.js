import * as types from '../types'
// import { store } from '../../store/store'

const state = {
  categories: {
    rent: {description: 'House rent'},
    bills: {description: 'Bills'},
    groceries: {description: 'Groceries'},
    loans: {description: 'Bank loans'},
    other: {description: 'Other'}
  },
}

const getters = {
  [types.CATEGORIES]: state => {
    return state.categories
  }
}

const mutations = {
  [types.ADD_CATEGORY]: (state, payload) => {
    state.categories = Object.assign({}, state.categories, payload)
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
