import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function renderApp (newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return // 数据没有变化就不渲染了
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return // 数据没有变化就不渲染了
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return // 数据没有变化就不渲染了
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

function stateChanger (state, action) {
  
  if (!state) {
    return {
      title: {
        text: 'React.js 小书',
        color: 'red',
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
    }
  }

  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
      break
    case 'UPDATE_TITLE_COLOR':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
      break
    default:
      return state // 没有修改，返回原来的对象
      break
  }
}

// 产生state和dispatch
function createStore (reducer) {
  // const getState = () => state
  // const dispatch = (action) => stateChanger(state, action)
  // const getState = function() {
  // 	return state;
  // }
  // const dispatch = function(action) {
  // 	return stateChanger(state, action)
  // }
  // return { getState, dispatch }
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  /*
   * 总结:
   * 那我们以后如果出现某种操作后每次都要执行某一函数，可以这样来，把这个函数当前一个监听函数
   * 整一个数组，要执行这个监听函数的时候，把它放到数组里面，当执行某一操作的时候循环遍历这个数组。
   */
  const dispatch = (action) => {
  	state = stateChanger(state, action)
  	listeners.forEach((listener) => listener())

    // 我觉得它整的有点邪乎，不用什么数组保存，然后遍历这个数组执行也可以直接执行函数啊
    // 我道觉得，优点又一个就是可以取消订阅
    // const newState = store.getState() 
    // renderApp(newState, oldState) 
    // oldState = newState 
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}
// 初始createStore时感觉传入的参数并没有用啊，只有当调用时
const store = createStore(appState, stateChanger)
let oldState = store.getState() // 缓存旧的 state
store.subscribe(() => {
	const newState = store.getState() // 数据可能变化，获取新的 state
	renderApp(newState, oldState) // 把新旧的 state 传进去渲染
	oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
})
renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
// renderApp(store.getState())

// ReactDOM.render(<App />, documesnt.getElementById('root'));
registerServiceWorker();
// 对象中一出现扩展运算符...就会执行某个函数新建{}进行浅复制。