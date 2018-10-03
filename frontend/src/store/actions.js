import * as types from './types'

export default {
  [types.SAVE_DATA]: context => {
    [types.SAVE_BUDGETS](context)
  },
  [types.LOAD_DATA]: context => {
    [types.LOAD_BUDGETS](context)
  },
}
