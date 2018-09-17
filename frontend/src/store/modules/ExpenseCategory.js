import * as types from '../types'
// import { store } from '../../store/store'

const state = {
  categories: {
    0: {description: 'rent'},
    1: {description: 'bills'},
    2: {description: 'groceries'},
    3: {description: 'loans', planned: 1760, spent: 1760},
    4: {description: 'other'}
  }
}

const getters = {
  [types.CATEGORIES]: state => {
    return state.categories
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
