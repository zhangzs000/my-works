<!--
  联动筛选项
  libaoxu@gaosiedu.com 20170301
-->

<script>
import Selection from './Selection'

const getActionKeysAndServices = function (currentSectionIndex = 0, selections) {
  const length = selections.length
  const target = {
    actionKeys: [],
    actionServices: [],
    actionSelectionIndexs: [],
    currentSectionIndex
  }

  currentSectionIndex += 1

  while (currentSectionIndex < length) {
    const comp = selections[currentSectionIndex]
    
    target.actionKeys.push(comp.searchKey)
    target.actionServices.push(comp.service)
    target.actionSelectionIndexs.push(currentSectionIndex)

    currentSectionIndex ++
  }

  return target
}

const getActionStoreBySelections = function (selections) {
  const store = {}

  selections.forEach((comp, currentSectionIndex) => {
    const { actionKeys, actionServices, actionSelectionIndexs } = getActionKeysAndServices(currentSectionIndex, selections)

    store[comp.searchKey] = {
      actionKeys,
      actionServices,
      actionSelectionIndexs
    }
  })

  return store
}

let actionStore;


export default {
  
  mixins: [],

  props: {
    /**
     * 是否触发service请求
     */
    isFireService: {
      type: Boolean,
      default: false
    },

    selections: {
      type: Array,
      default: []
      // default: [
        // key: {
        //   // 是否有全部
        //   hasAllSelection: true,
        //   // 标题
        //   title: '',
        //   // api请求的key值
        //   searchKey: '',
        //   // 默认的高亮
        //   active: '',
        //   // 列表信息
        //   info: [],
        //   service: vm => S.func(vm.data)
        // }
      // ]
    },

    isLinked: {
      type: Boolean,
      default: true
    }
  },
  
  components: {
    Selection
  },

  computed: {

  },

  data () {

    return {
    }
  },

  methods: {

    reLoadByActions (activeIndex, actionKeys, actionSelectionIndexs) {
      const {
        selections
      } = this
      
      actionKeys.forEach((key, actionIndex) => {
        selections[actionSelectionIndexs[actionIndex]].active = -1
      })
    },

    selectKeyChange (selectedItem, activeIndex, searchKey) {
      const { actionKeys, actionServices, actionSelectionIndexs } = actionStore[searchKey]
      
      // 如果点击全部, 则回到全部位置
      // if (this.isLinked && activeIndex === -1) {
      this.reLoadByActions(activeIndex, actionKeys, actionSelectionIndexs)
      // }

      this.selections.find(item => item.searchKey === searchKey).active = activeIndex

      let emitInfo = {
        selectedItem,
        activeIndex,
        searchKey,
        actionKeys,
        actionServices,
        actionSelectionIndexs
      }

      this.$emit('select-change', emitInfo)

      this.isFireService && this.fireService(emitInfo)
    },

    fireService ({ actionServices, actionSelectionIndexs } = {}) {
      let actions = arguments[0] || {}

      this.$emit('start-services', actions)

      const selections = this.selections

      /**
       * 开始请求所有service了, 并且将各个promise对象放到一个数组里
       */
      actionServices = (() => {
        return actionServices && actionServices.map ? actionServices : selections.map(item => item.service)
      })()
      .map(_service => typeof _service === 'function' && _service(this))

      actionSelectionIndexs = actionSelectionIndexs || selections.map((item, i) => i)

      Promise.all(actionServices)
      .then((mods) => {
        // 将请求到的信息, 统一放到info里
        mods.forEach((mod, index) => mod && (selections[actionSelectionIndexs[index]].info = mod))
        return Promise.resolve(mods)
      })
      .finally((mods) => {
        this.$emit('resolve-services', {
          actions,
          mods
        })
      })

    }

  },

  watch: {

  },

  created () {
    actionStore = getActionStoreBySelections(this.selections)

    this.isFireService && this.fireService()
  },

  mounted () {

  },

  render (h) {
    const {
      selections
    } = this

    const selectionVNode =  this._l(selections, (item, index) => {
      if (!item.title) {
        console.log(item, selections)

      }
      return <selection
        has-all-selection={item.hasAllSelection || true}
        title={item.title}
        searchKey={item.searchKey}
        active={item.active}
        info={item.info || []}
        on-selected={this.selectKeyChange}
      >
      </selection>
    })

    return <div>
      {selectionVNode}
    </div>
  }
}

</script>


<style lang="less" scoped>



</style>