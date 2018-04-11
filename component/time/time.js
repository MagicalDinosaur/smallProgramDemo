// component/time/time.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    startTime: {
      type: Number,
      value: 100
    },
    interval: {
      type: Number,
      value: 1000
    },
    callback: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    nowTime: 0,
    timer: ""//计时器变量
  },

  /**
   * 组件的生命周期
   * created     在组件实例进入页面节点树时执行，注意此时不能调用 setData
   * attached   在组件实例进入页面节点树时执行
   * ready        在组件布局完成后执行，此时可以获取节点信息
   */
  ready() {
    let that = this
    this.setData({
      nowTime: that.data.startTime
    })
    this._setTimer();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 对外的方法可以直接写
    show: function () {
      alert('show')
    },
    // 内部方法建议下划线开头
    _reset: function () {
      this.setData({
        nowTime: this.data.startTime
      })
      this._setTimer();
    },
    _setTimer() {
      let that = this;
      clearInterval(that.data.timer);
      this.data.timer = setInterval(() => {
        this.setData({
          nowTime: --that.data.nowTime
        })
        if (this.data.nowTime == 0) {
          clearInterval(that.data.timer);
        }
        // console.log(that.data.callback)
        that.data.callback && that.data.callback.call(that);
      }, that.data.interval)
    }
  }
})
