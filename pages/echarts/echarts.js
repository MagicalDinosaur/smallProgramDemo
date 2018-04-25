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
      width:"100%",
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

  var data = [];
  var data2 = [];

  for (var i = 0; i < 10; i++) {
    data.push(
      [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 40)
      ]
    );
    data2.push(
      [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]
    );
  }

  var axisCommon = {
    axisLabel: {
      textStyle: {
        color: '#C8C8C8'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#C8C8C8'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#C8C8C8',
        type: 'solid'
      }
    }
  };

  return {
    color: ["#FF7070", "#60B6E3"],
    backgroundColor: '#eee',
    xAxis: axisCommon,
    yAxis: axisCommon,
    legend: {
      data: ['aaaa', 'bbbb']
    },
    visualMap: {
      show: false,
      max: 100,
      inRange: {
        symbolSize: [20, 70]
      }
    },
    series: [{
      type: 'scatter',
      name: 'aaaa',
      data: data
    },
    {
      name: 'bbbb',
      type: 'scatter',
      data: data2
    }
    ],
    animationDelay: function (idx) {
      return idx * 50;
    },
    animationEasing: 'elasticOut'
  };
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