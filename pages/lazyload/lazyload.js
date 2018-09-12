// pages/lazyload/lazyload.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    screenHeight: 0, //屏幕高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.runThrottle = this.throttle()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getImgFile()
  },
  onPageScroll: function() {
    this.runThrottle()
  },

  // 节流函数
  throttle: function() {
    console.log('throttle')
    let that = this;
    var starTime = 0
    return function() {
      var nowTime = new Date().getTime()
      if (nowTime - starTime > 100) {
        that.secondMethod()
        starTime = nowTime
      }
    }
  },
  // 获取图片资源
  getImgFile: function() {
    let that = this;
    wx.request({
      url: 'https://gank.io/api/data/福利/1000/1',
      success: function(res) {
        // console.log(res.data.results)
        that.setData({
          imgUrls: res.data.results
        })
        setTimeout(() => {
          // that.judge()
          that.secondMethod()
        }, 1000)
      }
    })
  },
  // 判断是否在可视区的事件绑定
  judge: function() {
    for (let index in this.data.imgUrls) {
      wx.createIntersectionObserver().relativeToViewport().observe(`.img${index}`, (res) => {
        console.log(res)
        if (res.intersectionRatio) {
          this.setData({
            [`imgUrls[${index}].show`]: true,
          })
        }
      })
    }
  },

  // 方法二：获取节点的位置信息
  secondMethod: function() {
    let that = this;
    if (this.data.screenHeight) {
      this.judgeShow()
    } else {
      wx.getSystemInfo({
        success: function(res) {
          console.log('屏幕高度：' + res.screenHeight)
          that.setData({
            screenHeight: res.screenHeight
          })
          that.judgeShow()
        }
      })
    }
  },
  // 判断是否显示
  judgeShow: function() {
    let that = this
    wx.createSelectorQuery().selectAll('.item').boundingClientRect(function(rects) {
      rects.forEach(function(rect, index) {
        // console.log(rect)
        if (rect.top <= that.data.screenHeight) {
          that.setData({
            [`imgUrls[${index}].show`]: true,
          })
        }
      })
    }).exec()
  },

})