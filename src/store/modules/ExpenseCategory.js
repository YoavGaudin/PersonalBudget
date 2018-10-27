import * as types from '../types'
// import { store } from '../../store/store'

const state = {
  categories: {
    rent: {description: 'House rent'},
    arnona: {description: 'Arnona'},
    electricity: {description: 'Electricity'},
    mobile: {description: 'Mobile'},
    health: {description: 'Health'},
    internet: {description: 'Health'},
    television: {description: 'Health'},
    carInsurance: {description: 'Car Insurance'},
    carLicense: {description: 'Car License'},
    carLease: {description: 'Car Lease'},
    autoShop: {description: 'Auto Shop'},
    loans: {description: 'Loans'},
    savings: {description: 'Savings'},
    nespresso: {description: 'Nespresso'},
    fuel: {description: 'Fuel'},
    groceries: {description: 'Groceries'},
    pets: {description: 'Pets'},
    fashion: {description: 'Fashion'},
    medical: {description: 'Medical'},
    restaurants: {description: 'Restaurants'},
    gifts: {description: 'Gifts'},
    outings: {description: 'Outings'},
    sailing: {description: 'Sailing'},
    pango: {description: 'Pango'},
    road6: {description: 'Road6'},
    creditCard: {description: 'Credit Card'},
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
