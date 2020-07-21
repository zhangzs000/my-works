import * as types from '../mutation-types';


/**
 * 单一状态树, 用一个对象就包含了全部的应用层级状态。至此它便作为一个唯一数据源
 * @type {Object}
 */ 
const state = {
  added: [],
  name: '123'
};

/**
 * state 的计算属性
 * @type {Object}
 */ 
const getters = {
  demo2Add (state) {
    return state.added;
  },
  demo2name (state) {
    return state.name;
  }
};

/**
 * 事件分发
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 * 接收与 store 实例具有相同方法和属性的 context 对象
 * @type {Object}
 */ 
const actions = {

  demo2Click ({ commit, state }, payload) {
    console.log(commit)
    commit(types.DEMO2_CLICK, payload)
  },



};

/**
 * 类似事件
 * 每个 mutation 都有一个字符串事件类型 (type) 和 一个 回调函数 (handler), state是第一个参数
 * 要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法
 * @type {Object}
 */ 
const mutations = {

  [types.DEMO2_CLICK] (state, payload) {
    console.log(state)
    state.added.push(types.DEMO2_CLICK + ': ' + payload);
  }

};

export default ({
  state,
  getters,
  actions,
  mutations
});