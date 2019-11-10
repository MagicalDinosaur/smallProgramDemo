//index.js
//获取应用实例
import { watch, computed } from '../../utils/vuefy.js'
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: [1, 2, 3, 4],
    i: 0,
    k: 0,
    timerCallback: function () {
      console.log('计时器变化一次');
    }
  },
  //事件处理函数
  bindViewTap: function () {
    // 跳转查看启动日志
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    watch(this, {
      i: function (newVal, oldVal) {
        console.log("watch监听到i的变化，现在的值：" + newVal + "原来的值：" + oldVal
        );
      },
      k: function (newVal, oldVal) {
        console.log("watch监听到k的变化，现在的值：" + newVal + "原来的值：" + oldVal
        );
      }
    })

    computed(this, {
      "test2": function () {
        return 'computed封装：' + this.data.i + '次'
        // return 'computed封装'
      }
    })

    this.setData({
      eventInfo: "您已经点击了" + this.data.i + "次按钮"
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {
  },
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  btnClick: function (e) {
    // 跳转到页面二
    wx.navigateTo({
      url: '../page2/index',
    })
  },
  myeventTap: function () {
    this.data.i++
    this.setData({
      i: this.data.i
    })
  },
})

