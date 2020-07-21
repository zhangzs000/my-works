<!--
  统计组件
  @author libaoxu@gaosiedu.com  2017-05-11

-->
<script>
import store from './store'
import * as types from './mutation-types'
import NAPI from 'nadaptor'
import { mapGetters, mapActions } from 'vuex'

// document.body.addEventListener('click', function (e) {
//   if (e.target.classList.contains('maidian_ajax_page')) {
//     console.log('addClick: ', e.target)
//   }
// })

const htmlClickEvent = document.createEvent('HTMLEvents'); 
htmlClickEvent.initEvent('click', true, true); 

var isReady = false

export default {
  
  mixins: [],

  props: {

  },
  
  components: {
  },

  computed: {
    ...mapGetters({
      // 'tracker': 'tracker'
    }),
    tracker() {
      if (this.$store && this.$store.state) {
        return this.$store.state.tracker || {}
      }
      return {}
    },  

    user() {
      return NAPI.user.get()
    }
  },

  data () {
    return {

    };
  },

  methods: {
    ...mapActions({
      'TRACKER_CHANGE': 'TRACKER_CHANGE'
    }),

    registerStore () {
      this.$store.registerModule('tracker', store)      
    },

    subscribeStore() {
      this.$store.subscribe((action) => {
        if (action.type === types.TRACKER_CHANGE) {
          this.fireTrackerEvent()
        }
      })
    },

    fireTrackerEvent() {
      this.$nextTick(() => {
        this.$refs.trackerClass && this.$refs.trackerClass.dispatchEvent(htmlClickEvent)
      })
    }
  },

  watch: {
    
  },

  created () {
    if (this.$store) {
      this.registerStore()
      this.subscribeStore()
      
      // mock
      // setTimeout(() => {
      //   this.$store.dispatch('TRACKER_CHANGE', { pad: 'aw601' })
      //   this.$store.dispatch('TRACKER_READY', { pad: 'aw601' })
      // }, 1000)
    }

    // this.$nextTick(() => {
    //   if (this.user.userId) {
    //     console.log(this.$refs.trackerClass.getAttribute('data-pad'))
    //     setTimeout(() => {
    //     console.log('setout: ', this.$refs.trackerClass.getAttribute('data-pad'))
    //     }, 2000)
    //   }
    // })

  },

  mounted () {
  },

  render (h) {
    const tracker = this.tracker

    if (!isReady && tracker.pad) {
       this.$common.insertTagToDocument(window, document, 'script', 'http://resource.aixuexi.com/alilog.v2.js')                
       isReady = true
    }
    return (
      <div tracker-wraper style="display: none" >
        <div id="maidian_page" data-uid={this.user.userId} data-pad={tracker.pad}></div>
        <div class="maidian_ajax_page" ref="trackerClass" data-pad={tracker.pad}></div>
      </div>
    )
  }
}

</script>


<style lang="less" scoped>



</style>