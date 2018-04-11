let NET = require('../../utils/request.js');
Page({
  data: {
    dataUrl: ""
  },
  onShow: function () {
    // NET.$get(
    //   'https://www.zcool.com.cn/content/other.json',
    //   "",
    //   { objectType: 3, objectId: 6772131 }
    // )
  },
  btnClick: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        this.setData({
          dataUrl: res.result
        })
      }
    })
  }
})