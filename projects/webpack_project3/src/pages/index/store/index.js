import Vuex from 'vuex'

import * as state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations';

import demo1 from './modules/demo1'
import demo1Child from './modules/demo1Child'
import demo2 from './modules/demo2'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  modules: {
    demo2,
    demo1,
    demo1Child
  }
})