<!--
 * @Author: shiliangL
 * @Date: 2022-06-06 17:02:37
 * @LastEditTime: 2022-06-09 09:49:46
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
      this.chart.off('click', () => {})
      this.chart.on('click', (e) => this.clickChart(e))
    },
    clickChart({ data }) {
      this.getGeoJson(data.cityCode || 100000)
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
          zoom: 1.1, // 缩放比例
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
