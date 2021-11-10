import { RESET_STATES } from './mutation-types'

export default {
  // rest state
  resetStates: function (context, payLoad) {
    context.commit(RESET_STATES, payLoad)
  }

}
