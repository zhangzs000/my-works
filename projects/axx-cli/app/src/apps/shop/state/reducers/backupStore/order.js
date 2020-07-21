let order = {
  config: null //初始的config
}

order.setValue = (key, value) => { //设置value
  order[key] = value
}

order.unset = function (key){     //删除key值
  delete order[key]
}

order.get = function (key){     //获取value
  return order[key] || ""
}

order.remove = function (){     //释放内存
  order = null
}

export default order
