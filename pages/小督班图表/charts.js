// pages/小督班图表/charts.js
import * as echarts from '../../libs/ec-canvas/echarts';

let chart = null;

// 设置bar的值
function getBarOption() {
  return {
    title: { 

    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
    },
    grid: {
      top: 20,
      bottom: 0,
      left:20,
      right:20,
      containLabel: true
    },
    tooltip: {
      show: false
    },
    xAxis: {
      type: 'category',
      // boundaryGap: false,
      axisLabel: {
        color: "#BEBEBE",
        fontSize: 10
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      data: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周'],
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#BEBEBE",
        fontSize: 10,
      },
      splitLine:{
        // show:false
        lineStyle:{
          color:"rgba(232,232,232,1)"
        }
      }
    },
    series: [
      // 灰色区域
      {
        name: '',
        type: 'line',
        data: [0, 3, 4, "-", "-", "-", "-"],
        itemStyle: {
          normal: {
            lineStyle: {
              width: 4,
              color: 'rgba(218,218,218,1)',
              type: 'solid'  //'dotted'虚线 'solid'实线
            },
            borderColor: "rgba(218,218,218,1)",
            borderWidth: 8
          },
          // emphasis: {
          //   borderColor: "rgba(22,150,234,1)",
          //   borderWidth: 8
          // }
        }
      },
      // {
      //   name: '',
      //   type: 'line',
      //   smooth: false,   //关键点，为true是不支持虚线，实线就用true
      //   connectNulls: true,
      //   itemStyle: {
      //     normal: {
      //       lineStyle: {
      //         width: 1,
      //         color: 'rgba(218,218,218,1)',
      //         type: 'dotted'  //'dotted'虚线 'solid'实线
      //       },
      //       borderColor: "rgba(218,218,218,1)",
      //       borderWidth: 4
      //     }
      //   },
      //   data: ["-", "-", 4, "-", 6, "-", "-"]
      // },
      // {
      //   name: '',
      //   type: 'line',
      //   smooth: false,   //关键点，为true是不支持虚线，实线就用true
      //   itemStyle: {
      //     normal: {
      //       lineStyle: {
      //         width: 4,
      //         color: 'rgba(218,218,218,1)',
      //         type: 'solid'  //'dotted'虚线 'solid'实线
      //       },
      //       borderColor: "rgba(218,218,218,1)",
      //       borderWidth: 8
      //     }
      //   },
      //   data: ["-", "-", "-", "-", 6, 6, 8, 10],
      //   markPoint: {
      //     symbol: "circle",
      //     // 标注文字
      //     label: {
      //       color: "rgba(136,136,136,1)",
      //       offset: [0, -15]
      //     },
      //     // 标注背景设置
      //     itemStyle: {
      //       color: "transparent",
      //     },
      //     data: [
      //       { name: '周最低', value: 10, xAxis: 6, yAxis: 8 }
      //     ],
      //   },
      // },

      // 蓝色线条
      {
        name: '',
        type: 'line',
        data: [2, 3, 6, "-", "-", "-", "-"],
        itemStyle: {
          normal: {
            lineStyle: {
              width: 1,
              color: 'rgba(22,150,234,1)',
              type: 'solid'  //'dotted'虚线 'solid'实线
            },
            borderColor: "rgba(22,150,234,1)",
            borderWidth: 4
          },
          // emphasis: {
          //   borderColor: "rgba(22,150,234,1)",
          //   borderWidth: 2
          // }
        }
      },
      {
        name: '',
        type: 'line',
        smooth: false,   //关键点，为true是不支持虚线，实线就用true
        connectNulls: true,
        itemStyle: {
          normal: {
            lineStyle: {
              width: 1,
              color: 'rgba(22,150,234,1)',
              type: 'solid'  //'dotted'虚线 'solid'实线
            },
            borderColor: "rgba(22,150,234,1)",
            borderWidth: 2
          }
        },
        data: ["-", "-", 6, "-", 8, "-", "-"]
      },
      // {
      //   name: '',
      //   type: 'line',
      //   smooth: false,   //关键点，为true是不支持虚线，实线就用true
      //   itemStyle: {
      //     normal: {
      //       lineStyle: {
      //         width: 4,
      //         color: 'rgba(22,150,234,1)',
      //         type: 'solid'  //'dotted'虚线 'solid'实线
      //       },
      //       borderColor: "rgba(22,150,234,1)",
      //       borderWidth: 8
      //     }
      //   },
      //   data: ["-", "-", "-", "-", 8, 10, 12],
      //   markPoint: {
      //     symbol:"circle",
      //     // 标注文字
      //     label:{
      //       color:"rgba(22,150,234,1)",
      //       offset:[0,-15]
      //     },
      //     // 标注背景设置
      //     itemStyle:{
      //       color:"transparent",
      //     },
      //     data: [
      //       { type: 'max', name: '最大值' },
      //     ],

      //   },
      // }
    ]
  };
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecLine: {
      lazyLoad: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-multi-bar');
    let that = this;
    setTimeout(() => {
      that.ecComponent.init((canvas, width, height) => {
        const scatterChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(scatterChart);

        that.scatterChart = scatterChart;
        scatterChart.setOption(getBarOption());

        return scatterChart;
      })
    }, 0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})