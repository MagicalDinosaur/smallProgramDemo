// pages/圆环/cirtle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentAngle: 0.8,
    endAngle: 2,
    close: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 绘制初始状态
    let that = this;
    this.drawCharts();
  },

  clickBtn: function () {
    this.setData({
      close: !this.data.close
    })
    this.drawCharts();
  },

  drawCharts: function () {
    let ctx = wx.createCanvasContext('canvasDom', this);
    ctx.beginPath()
    ctx.arc(125, 125, 100, 0.8 * Math.PI, 2.2 * Math.PI)
    ctx.setFillStyle('lightgreen')
    ctx.setStrokeStyle('#ddd')
    ctx.setLineWidth(20);
    ctx.setLineCap('round')
    ctx.stroke()

    // 绘制蓝色
    ctx.beginPath()
    ctx.arc(125, 125, 100, 0.8 * Math.PI, this.data.currentAngle * Math.PI)

    ctx.setStrokeStyle('rgba(22, 150, 234, 1)')
    ctx.setLineWidth(20);
    ctx.setLineCap('round')
    ctx.stroke()

    // 添加文字,⚠️ 注意：fillText要在设置字体属性下面

    ctx.setFontSize(40)
    ctx.setFillStyle('rgba(22, 150, 234, 1)')
    ctx.setTextAlign('center')
    ctx.setTextBaseline('middle')
    ctx.fillText('75%', 125, 125)
    ctx.draw()
  }
})