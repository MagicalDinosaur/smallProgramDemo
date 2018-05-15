// pages/echarts/echarts.js
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
      data: []
    },
    grid: {
      height: '100%',
      width: "100%",
      containLabel: true
    },
    tooltip: {
      show: false
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
      //   formatter:
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


    },
    series: [
      {
        name: '',
        type: 'line',
        data: [120, 132, 191, "-", "-", "-", "-"],
        itemStyle: {
          normal: {
            lineStyle: {
              width: 4,
              color: 'rgba(22,150,234,1)',
              type: 'solid'  //'dotted'虚线 'solid'实线
            },
            borderColor: "rgba(22,150,234,1)",
            borderWidth: 8
          },
          emphasis: {
            borderColor: "rgba(22,150,234,1)",
            borderWidth: 8
          }

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
              width: 4,
              color: 'rgba(22,150,234,1)',
              type: 'dotted'  //'dotted'虚线 'solid'实线
            },
            borderColor: "rgba(22,150,234,1)",
            borderWidth: 8
          }
        },
        data: ["-", "-", 191, "-", 330, "-", "-"]
      },
      {
        name: '',
        type: 'line',
        smooth: false,   //关键点，为true是不支持虚线，实线就用true
        itemStyle: {
          normal: {
            lineStyle: {
              width: 4,
              color: 'rgba(22,150,234,1)',
              type: 'solid'  //'dotted'虚线 'solid'实线
            },
            borderColor: "rgba(22,150,234,1)",
            borderWidth: 8
          }
        },
        data: ["-", "-", "-", "-", 330, 410, 460, 520]
      },

    ]
  };
}

// 设置 scatter的值
function getScatterOption() {
  return {
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7','8','9']
    },
    yAxis: {
      type: 'value'
    }, dataZoom: [{
      type: 'inside',
      start: 0,
      end: 30
    }],
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130,140,160],
      type: 'bar'
    }]
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecBar: {
      onInit: function (canvas, width, height) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);

        // 将 barChart 绑定到 this，以供其他函数访问
        this.barChart = barChart;
        barChart.setOption(getBarOption());

        return barChart;
      }
    },

    ecScatter: {
      lazyLoad: true
    }
  },
  // 页面加载
  onLoad: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-multi-scatter');
    let that = this;
    // setTimeout(() => {
    that.ecComponent.init((canvas, width, height) => {
      const scatterChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(scatterChart);

      that.scatterChart = scatterChart;
      scatterChart.setOption(getScatterOption());

      return scatterChart;
    })
    // }, 2000)


  },
  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function () {

  }
})