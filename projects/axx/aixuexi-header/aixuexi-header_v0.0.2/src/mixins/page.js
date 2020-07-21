/**
 * 分页混合
 * @author libaoxu@gaosiedu.com
 * @date 2016-11-1
 */

import Toast from 'service/comp/toast.js';
import common from 'utils/common.js';

let toast = new Toast();
let isArrayLike = common.isArrayLike;

export default {

  data() {
    return {
      fetch: false,
      firstFetch: true,
      pageNo: 1,
      ended: false,
      showNothing: false,
      items: []
    }
  },

  mounted(){
    this.refresh();
  },

  methods: {

    infinite() {
      if(this.ended) return false;
      // 如果还在拉取中, 则不进行拉取, 一定要上次拉取结束, 这次才拉取
      if(this.fetch) return false;

      // 由于滚动频率, 不能定义拉取状态
      // this.fetch = true;
      this.pageNo ++;
      this.getList();
    },

    refresh() {
      this.firstFetch = true;
      this.pageNo = 1;
      this.getList();
    },

    getList() {
      // 定义: 开始拉取状态
      this.fetch = true;
      
      this.mixinGetList(this.pageNo).then(ret => {
        // 数据数组集合
        let responseList;

        this.firstFetch = false;
        // 拉取结束
        this.fetch = false;

        // status 在 service层进行处理了
        // if (ret.status) {
        if (!(responseList = this.getDataList(ret.list))) {
          this.showNothing = true;
          this.ended = true;
          // 数据清空
          this.items = []
          if(this.loadedDone) this.loadedDone(this.items);
          return false;
        }

        (responseList.length === 0) && (this.ended = true);

        this.showNothing = (this.pageNo == 1 && responseList.length == 0);

        if(this.pageNo > 1)
          this.items = this.items.concat(responseList);
        else
          this.items = responseList;

        if(this.loadedDone) this.loadedDone(responseList)
        

        // } else {
        //   toast.show(ret.message);
        // }
      }).catch(err => {
        toast.show(err && err.message || '请求失败请重试');
      });
    },

    /**
     * 递归根据服务端的数据, 找到对应数组, 直到找到数据的数组, 如果没有值则返回false
     * @param {Object | Array | null} ret 服务端返回的数据, 可能是数组, 可能是Object, 可能是null
     * @return {Array | Boolean} 服务端返回的数组 | false
     */
    getDataList (ret) {
      // 如果没有返回数据
      if (!ret) {
        // toast.show('数据请求失败请重试!');
        return false;
      }

      // 有时候服务端, ret:直接返回数组,有时候 ret.data || ret.data.data 返回的是数组, 这里做一下兼容
      // 1 如果: ret 是数组或类数组, 就赋值ret
      // 2 否则: ret.data 存在, 且ret.data是数组, 就赋值ret.data
      // 3 都不满足, 返回空数组
      return isArrayLike(ret)
        ? ret
        : this.getDataList(ret.data);
    }
  }
  
}