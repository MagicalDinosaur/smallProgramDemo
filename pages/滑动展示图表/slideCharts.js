// pages/滑动展示图表/slideCharts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    startScroll: 0,
    barWidth: 0,
    windowWidth: 0,//实际的宽度
    nowIndex: 3,//当前位置的索引，从1开始
    scale: 1,
    scrollX: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.createSelectorQuery().selectAll('.slide-bar').boundingClientRect(function (rects) {
      console.log(rects[0].width)// 获取bar的实际宽度
      that.setData({
        barWidth: rects[0].width
      })
    }).exec()

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth
        })
        // 滚动到最后一个时间轴
        setTimeout(() => {
          that.setData({
            startScroll: that.data.barWidth * (that.data.historyData.length - 0.5) - res.windowWidth / 2,
            nowIndex: that.data.historyData.length,
          })
        }, 2000)
      }
    })
  },
  // 滑动过程
  chartScroll(e) {
    console.log(e.detail.scrollLeft)
    this.setData({
      scrollX: e.detail.scrollLeft
    })
  },
  // 滑动结束
  clickEnd(e) {
    let allWidth = this.data.barWidth
    let nowIndex = Math.round((this.data.scrollX + this.data.windowWidth / 2) / this.data.barWidth + 0.5)
    this.setData({
      nowIndex: nowIndex,
      startScroll: this.data.barWidth * (nowIndex - 0.5) - this.data.windowWidth / 2
    })
  }
})