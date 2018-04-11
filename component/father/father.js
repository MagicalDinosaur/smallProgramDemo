Component({
  options: {
    multipleSlots: true //在组件定义时的选项中启用多slot支持
  },
  externalClasses: [],//接受外部的css样式

  // properties 相当于 VUE 中的 props
  properties: {
    // type 属性类型；value 属性初始值；observer 属性值被更改时的响应函数 
    text: {
      type: String
    }
  },//组件的对外属性
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  created() {
    // 组件实例进入结点树执行，不能使用setData
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    // 按钮点击事件
    onTap: function () {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      // tiggerEvent 类似于vue中的自组件自定义事件与父组件传递信息
      this.triggerEvent('myevent', myEventDetail, myEventOption);
    }
  },
  // 定义组件间关系
  relations: {
    '../child': { //对方组件的相对路径
      type: 'child'
    }
  }
})