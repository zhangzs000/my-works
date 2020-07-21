let goods = {
  config: null //初始的config
}

goods.setValue = (key, value) => { //设置value
  goods[key] = value
}

goods.unset = function (key){     //删除key值
  delete goods[key]
}

goods.get = function (key){     //获取value
  return goods[key] || ""
}

goods.remove = function (){     //释放内存
  goods = null
}

export default goods
