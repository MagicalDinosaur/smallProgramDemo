// pages/滑动展示图表/slideCharts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    startX: "",
    nowX: 0,
    move: 0,
    moveX: 0,
    barWidth: 100,
    nowIndex: 3,//当前位置的索引，从1开始
    scale:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        let scale = res.windowWidth/750
        that.setData({
          scale:scale
        })
        // 滚动到最后一个柱子
        setTimeout(() => {
          that.setData({
            move: -80 *scale* (that.data.historyData.length-0.5)
          })
        }, 2000)
      }
    })
  },
  // 滑动开始
  clickStart(e) {
    console.log("开始：" + e.touches[0].pageX)
    this.setData({
      startX: e.touches[0].pageX,
      move: 0
    })
  },
  // 滑动过程
  clickMove(e) {
    let moveX = Number(e.touches[0].pageX - this.data.startX)
    console.log("移动：" + moveX)
    this.setData({
      moveX: moveX
    })
  },
  // 滑动结束
  clickEnd(e) {
    let nowX = this.data.nowX + this.data.moveX
    let nowIndex = 3 - Math.round(nowX / this.data.barWidth)
    let moveX = -((nowIndex - 3) * this.data.barWidth + nowX)
    console.log(moveX, nowX)
    this.setData({
      startX: 0,
      nowX: nowX,
      nowIndex: nowIndex,
      move: moveX
    })
  }
})