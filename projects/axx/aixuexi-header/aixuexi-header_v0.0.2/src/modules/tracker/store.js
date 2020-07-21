import * as types from './mutation-types'

/**
 * @property {String} pad 页面唯一标识
 */
const state = {
  pad: ''
}

/**
 * state 的计算属性
 * @type {Object}
 */ 
const getters = {
  tracker (state, getters, rootState) {
    return state
  }
}

/**
 * 事件分发
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 * 接收与 store 实例具有相同方法和属性的 context 对象
 * @type {Object}
 */ 
const actions = {
  [types.TRACKER_READY] ({ commit, state, rootState }, payload) {
    commit(types.TRACKER_READY, payload)
  },

  [types.TRACKER_CHANGE] ({ commit, state, rootState }, payload) {
    
    commit(types.TRACKER_CHANGE, payload)
  }
}

/**
 * 类似事件
 * 每个 mutation 都有一个字符串事件类型 (type) 和 一个 回调函数 (handler), state是第一个参数
 * 要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法
 * @type {Object}
 */ 
const mutations = {
  [types.TRACKER_READY] (state, payload) {
    Object.assign(state, payload)
  },

  [types.TRACKER_CHANGE] (state, payload) {
    // 触发 vm 的点击事件
    Object.assign(state, payload)
  }
}


export default ({
  state,
  getters,
  actions,
  mutations
})