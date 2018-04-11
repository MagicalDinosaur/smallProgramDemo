
/**
 * 检测函数的变化
 * data 当前上下文的data，key 键名，val 键值，fn 回调函数
 */
function defineReactive(data, key, val, fn, computedFn) {
  // 通过 Object.defineProperty进行set操作拦截
  let subs = [];
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      if (data.$target) {
        subs.push(data.$target)
      }
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      // 如果新值和老值不相同则返回回调函数 fn
      console.log(fn)
      fn && fn(newVal)
      val = newVal;
      // if (computedFn.length) {
      //   // 执行 computed的更新设置值
      //   computedFn.forEach(sub => sub());
      // }
    },
  })
}

// vue watch 方法 监听值的变化
function watch(ctx, obj) {
  // obj是watch监听的一个一个对象集合 
  Object.keys(obj).forEach(key => {
    defineReactive(ctx.data, key, ctx.data[key], function (value) {
      // obj[key] 对应监听值的回调函数
      obj[key].call(ctx, value);
    })
  })
}

// computed 函数
function computed(ctx, obj) {
  let computedKeys = Object.keys(obj)//computed 对象集合
  // let computedFn = [];//computedFn存储computed
  let computedObj = computedKeys.reduce((total, next) => {
    // computedFn.push(function () {
    //   ctx.setData({ [next]: obj[next].call(ctx) })
    // })
    total[next] = obj[next].call(ctx);
    return total
  }, {})
  // 首次加载
  let computedFn = ctx.setData(computedObj)
  // 绑定数据变化时，动态computed
  let dataKeys = Object.keys(ctx.data)
  dataKeys.forEach(dataKey => {
    defineReactive(ctx.data, dataKey, ctx.data[dataKey], function () {
      
    })
  })
}

// 对外抛出 watch、computed 方法
module.exports = { watch, computed }