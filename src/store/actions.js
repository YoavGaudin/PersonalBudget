import * as types from './types'
import {store} from '../store/store'

export default {
  [types.SAVE_DATA]: context => {
    store.dispatch(types.SAVE_BUDGETS)
    store.dispatch(types.SAVE_PERIODS)
    store.dispatch(types.SAVE_INCOMES)
  },
  [types.LOAD_DATA]: context => {
    store.dispatch(types.LOAD_BUDGETS)
    store.dispatch(types.LOAD_PERIODS)
    store.dispatch(types.LOAD_INCOMES)
  },
}
