import * as types from '../types'
// import { store } from '../../store/store'

const state = {
  categories: {
    0: {description: 'rent', planned: 3000, spent: 0},
    1: {description: 'bills', planned: 1500, spent: 2000},
    2: {description: 'groceries', planned: 2000, spent: 1500},
    3: {description: 'loans', planned: 1760, spent: 1760}
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
