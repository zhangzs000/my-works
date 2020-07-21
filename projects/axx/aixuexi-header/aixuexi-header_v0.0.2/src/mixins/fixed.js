
// 七牛图片配置参数
const getImageCurry = (url, h) => {
    return url ? `${url}?imageMogr2/thumbnail/${h}x` : ''
}
// 保留两位小数
const filters = {
  toFixed (val) {
    return val ? parseFloat(val).toFixed(2) : 0
  },
}
export default {
  filters: filters,
  methods: {
    getImageByUrl (url, h) {
      if (/^data:image/.test(url)) {
        return url
      } else {
        return getImageCurry(url, h)
      }
    },
  }
};