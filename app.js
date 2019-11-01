//app.js 小程序逻辑

// 引入fundebug,第三方bug监控
var fundebug = require('./libs/fundebug.js');
fundebug.apikey = 'ce54077ad1be26dc34dcf06d5c0e24fd68eb9f186894e325d11558be8df1a43d';

App({
  // 生命周期回调——监听小程序初始化
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    // throw new Error("Test");

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  // 其他的生命周期函数
  // onSHow onHide onError onPageNotFound

  globalData: {
    userInfo: null
  }
})