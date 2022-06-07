<!--
 * @Author: shiliangL
 * @Date: 2022-06-06 17:02:37
 * @LastEditTime: 2022-06-07 10:18:18
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div id="app">
    <ECharts
      ref="ECharts"
      :option="chartOptions"
      @ready="ready"
    ></ECharts>
  </div>
</template>

<script>

export default {
  components: {
    ECharts: () => import('@/components/ECharts')
  },
  data() {
    return {
      geoJson: {
        features: []
      },
      parentInfo: [{
        cityName: '全国',
        code: 100000
      }],
      currentIndex: -1,
      chartOptions: {}
    }
  },
  created() {
    this.getGeoJson(100000)
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    ready(chart) {
      this.chart = chart
      if (!this) return
      const geoCoordMap = {
        北京: [116.46, 39.92],
        上海: [121.48, 31.22],
        杭州: [120.19, 30.26],
        深圳: [114.07, 22.62],
        广州: [113.23, 23.16],
        成都: [104.06, 30.67],
        南京: [118.78, 32.04],
        重庆: [106.54, 29.59],
        武汉: [114.31, 30.52],
        厦门: [118.1, 24.46],
        西安: [108.95, 34.27],
        天津: [117.2, 39.13],
        苏州: [120.62, 31.32],
        长沙: [113, 28.21],
        沈阳: [123.38, 41.8],
        济南: [117, 36.65],
        合肥: [117.27, 31.86],
        哈尔滨: [126.63, 45.75],
        大连: [121.62, 38.92],
        无锡: [120.29, 31.59],
        珠海: [113.52, 22.3],
        石家庄: [114.48, 38.03],
        福州: [119.3, 26.08],
        东莞: [113.75, 23.04],
        乌鲁木齐: [87.68, 43.77],
        台州: [121.420757, 28.656386],
        嘉兴: [120.76, 30.77],
        太原: [112.53, 37.87],
        宁波: [121.56, 29.86],
        常州: [119.95, 31.79],
        徐州: [117.2, 34.26],
        昆明: [102.73, 25.04],
        洛阳: [112.44, 34.7],
        郑州: [113.65, 34.76],
        青岛: [120.33, 36.07],
        鄂尔多斯: [109.781327, 39.608266],
        兰州: [103.73, 36.03],
        贵阳: [106.71, 26.57],
        海口: [110.35, 20.02],
        惠州: [114.4, 23.09],
        吉林: [126.57, 43.87],
        克拉玛依: [84.77, 45.59],
        聊城: [115.97, 36.45],
        泉州: [118.58, 24.93],
        潍坊: [119.1, 36.62],
        烟台: [121.39, 37.52],
        长春: [125.35, 43.88],
        大理: [100.27, 25.61],
        石河子: [86.09, 44.31],
        衡阳: [112.58, 26.90],
        呼伦贝尔: [119.77, 49.22],
        娄底: [112.00, 27.70],
        辽源: [125.14, 42.89],
        冀州: [115.60, 37.56],
        铁岭: [123.84, 42.29],
        香港: [114.11, 22.39]
      }
      const data = [
        { name: '北京', value: 360 },
        { name: '上海', value: 183 },
        { name: '杭州', value: 52 },
        { name: '深圳', value: 55 },
        { name: '广州', value: 47 },
        { name: '成都', value: 26 },
        { name: '南京', value: 20 },
        { name: '重庆', value: 6 },
        { name: '武汉', value: 6 },
        { name: '厦门', value: 15 },
        { name: '西安', value: 8 },
        { name: '天津', value: 7 },
        { name: '苏州', value: 8 },
        { name: '长沙', value: 7 },
        { name: '沈阳', value: 6 },
        { name: '济南', value: 6 },
        { name: '合肥', value: 4 },
        { name: '哈尔滨', value: 4 },
        { name: '大连', value: 4 },
        { name: '无锡', value: 4 },
        { name: '珠海', value: 4 },
        { name: '石家庄', value: 3 },
        { name: '福州', value: 3 },
        { name: '东莞', value: 2 },
        { name: '乌鲁木齐', value: 2 },
        { name: '台州', value: 2 },
        { name: '嘉兴', value: 2 },
        { name: '太原', value: 2 },
        { name: '宁波', value: 2 },
        { name: '常州', value: 2 },
        { name: '徐州', value: 2 },
        { name: '昆明', value: 2 },
        { name: '洛阳', value: 2 },
        { name: '郑州', value: 2 },
        { name: '青岛', value: 2 },
        { name: '鄂尔多斯', value: 1 },
        { name: '兰州', value: 1 },
        { name: '贵阳', value: 1 },
        { name: '海口', value: 1 },
        { name: '惠州', value: 1 },
        { name: '吉林', value: 1 },
        { name: '克拉玛依', value: 1 },
        { name: '聊城', value: 1 },
        { name: '泉州', value: 1 },
        { name: '潍坊', value: 1 },
        { name: '烟台', value: 1 },
        { name: '长春', value: 1 },
        { name: '大理', value: 2 },
        { name: '石河子', value: 1 },
        { name: '衡阳', value: 1 },
        { name: '呼伦贝尔', value: 1 },
        { name: '娄底', value: 1 },
        { name: '辽源', value: 1 },
        { name: '翼州', value: 1 },
        { name: '铁岭', value: 1 },
        { name: '中山', value: 1 },
        { name: '香港', value: 12 }
      ]
      const convertData = function(data) {
        const res = []
        for (let i = 0; i < data.length; i++) {
          const geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }
      const convertedData = [
        convertData(data),
        convertData(data.sort(function(a, b) {
          return b.value - a.value
        }).slice(0, 6))
      ]
      data.sort(function(a, b) {
        return a.value - b.value
      })
      const categoryData = []
      // const barData = []
      // const sum = 0
      // const count = data.length
      for (let i = 0; i < data.length; i++) {
        categoryData.push(data[i].name)
        // barData.push(data[i].value)
        // sum += data[i].value
      }
      this.chartOptions = {
        backgroundColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#0f378f' // 0% 处的颜色
          }, {
            offset: 1, color: '#00091a' // 100% 处的颜色
          }]
        },
        title: {
          top: 20,
          x: 'center',
          text: '全国设备安装分布',
          subtext: '',
          textStyle: {
            color: '#ccc'
          }
        },
        geo: {
          show: true,
          map: 'china',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#3a7fd5',
              borderColor: '#0a53e9', // 线
              shadowColor: '#092f8f', // 外发光
              shadowBlur: 20
            },
            emphasis: {
              areaColor: '#0a2dae' // 悬浮区背景
            }
          }
        },
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: '#fff',
            decoration: 'none'
          }
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: {
          show: false,
          data: categoryData
        },
        series: [
          {
            name: '设备量',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#fff'
              }
            }
          },
          {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertedData[0],
            symbolSize: function(val) {
              // return Math.max(val[2] / 10,9);
              if (val[2] < 10) {
                return 6
              }
              if (val[2] >= 10 && val[2] < 100) {
                return 10
              }
              if (val[2] >= 100) {
                return val[2] / 10
              }
            },
            showEffectOn: 'emphasis',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false // true
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 4,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      }
      this.chart.off('click', () => {})
      this.chart.on('click', (e) => this.clickChart(e))
      // this.setIntervalChart()
    },
    clickChart({ data }) {
      this.getGeoJson(data.cityCode || 100000)
    },
    setIntervalChart() {
      clearInterval(this.autoHightLightTimer)
      this.autoHightLightTimer = setInterval(() => {
        const dataLen = this.chartOptions.series[0].data.length
        this.chart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: this.currentIndex })
        this.currentIndex = (this.currentIndex + 1) % dataLen
        this.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        })
        this.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        })
        this.chart.dispatchAction({
          type: 'mapSelect',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        })
        // 显示 tooltip
        this.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        })
      }, 3000)
    },
    getGeoJson(adcode) {
      const { AMapUI, echarts } = window
      if (!AMapUI) return console.log('AMapUI 未加载,请刷新页面保证加载后运行')
      this.chart && this.chart.clear()
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        const districtExplorer = new DistrictExplorer()
        districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
          if (error) return console.error(error)
          const Json = areaNode.getSubFeatures()
          if (Json.length > 0) {
            this.geoJson.features = Json
            echarts.registerMap('china', this.geoJson)
          } else if (Json.length === 0) {
            this.geoJson.features = this.geoJson.features.filter(item => item.properties.adcode === adcode)
            if (this.geoJson.features.length === 0) return
          }
          this.generateOption()
        })
      })
    },
    generateOption() {
      console.log(this.geoJson.features, '=this.geoJson.features=')
      const mapData = this.geoJson.features.map(item => ({
        name: item.properties.name,
        value: Math.random() * 1000,
        cityCode: item.properties.adcode
      }))
      const mapSeriesData = mapData.sort((a, b) => (b.value - a.value))
      this.chartOptions = {
        animationEasing: 'elasticOut',
        animationDelayUpdate: (k) => 5 * k,
        backgroundColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#0f378f' // 0% 处的颜色
          }, {
            offset: 1, color: '#00091a' // 100% 处的颜色
          }]
        },
        tooltip: {
          trigger: 'item',
          formatter: p => {
            let val = p.value
            if (!val) val = 0
            return p.name + ':' + val.toFixed(2)
          }
        },
        title: {
          show: true,
          left: 'center',
          top: '20',
          text: this.parentInfo[this.parentInfo.length - 1].cityName,
          textStyle: {
            fontSize: 18,
            color: '#ccc'
          }
        },
        series: [{
          name: '地图',
          type: 'map',
          map: 'china',
          roam: true, // 是否可缩放
          zoom: 1, // 缩放比例
          data: mapSeriesData,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#3a7fd5',
              borderColor: '#0a53e9', // 线
              shadowColor: '#092f8f', // 外发光
              shadowBlur: 20
            },
            emphasis: {
              areaColor: '#0a2dae'
            }
          },
          layoutSize: 430,
          layoutCenter: ['50%', '50%'], // 属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
          animationDelay: (idx) => idx * 10
        }]
      }
      this.chart && this.chart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: stretch;
}
</style>
