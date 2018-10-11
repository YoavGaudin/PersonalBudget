import * as types from './types'
import {store} from '../store/store'

export default {
  [types.SAVE_DATA]: context => {
    store.dispatch(types.SAVE_BUDGETS)
    store.dispatch(types.SAVE_PERIODS)
  },
  [types.LOAD_DATA]: context => {
    store.dispatch(types.LOAD_BUDGETS)
    store.dispatch(types.LOAD_PERIODS)
  },
}
