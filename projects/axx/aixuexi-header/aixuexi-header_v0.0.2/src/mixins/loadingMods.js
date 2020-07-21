
/**
 * loading队列
 * 
 * @example 
 *  key: {
 *   onOff: false,
 *   statck: []
 * }
 */
const _loadingMods = {
 
}
export default {

  data() {
    return {
      
    }
  },

  methods: {
    $startLoading (key) {
      const mod = _loadingMods[key] || (_loadingMods[key] = { stack: [], onOff: true })

      mod.stack.push(1)
      return mod.onOff = true
    },

    $endLoading (key) {
      return new Promise ((resolve, reject) => {
        const mod = _loadingMods[key]
      
        if (!mod || !mod.stack) return

        mod.stack.pop()

        if (mod.stack.length === 0) {
          // vue 相关 loading组件 异步渲染
          setTimeout(() => resolve(mod.onOff = false))
        }
      })
    }
  }
}