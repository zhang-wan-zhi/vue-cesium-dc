<template>
  <div id="viewer-container" class="viewer-container">
    <div class="home" @click="flyToHome">Home</div>
    <div class="loopLook">
      <div class="text">台站巡逻</div>
      <div class="btn start" @click="start">开始</div>
      <div class="btn pause" @click="pause">结束</div>
    </div>
    <div class="left__box">
      <div class="echart__main" id="echart__main"></div>
      <div class="echart__main2" id="echart__main2"></div>
      <div class="echart__main3" id="echart__main3"></div>
    </div>
    <div class="right__box">
      <div class="platform__list">
        <div class="platform"><el-tree
            :data="data"
            @node-click="handleNodeClick"
            :default-expand-all="true"
          ></el-tree></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GridComponent
} from 'echarts/components'
import { PieChart, LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  TitleComponent,
  GridComponent,
  LineChart
])
let flying = undefined
export default {
  name: 'Viewer',
  data() {
    return {
      textHeight: 0,
       data: [
        {
          label: '浙江省',
          children: [
            {
              label: '建德市',
              children: [
                {
                  label: '浙江省新安江地震台'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
       this.flyToPlatform1()
    },
    initViewer() {
      let viewer = undefined
      viewer = new DC.Viewer('viewer-container')
      global.viewer = viewer
      this.addText()
      // 地图工厂, 用于创建各类地图瓦片
      let key = '1c3ff1358b17417f1782dd1ae7bdd00a'
      let baselayer = DC.ImageryLayerFactory.createTdtImageryLayer({
        key,
        style: 'img'
      })
      let baselayer_cva = DC.ImageryLayerFactory.createAmapImageryLayer({
        style: 'cva'
      })
      viewer.addBaseLayer([baselayer, baselayer_cva])
      // 添加地形
      let terrain = DC.TerrainFactory.createUrlTerrain({
        url: 'http://data.marsgis.cn/terrain'
      })
      viewer.addTerrain(terrain)
      // 3dTiles 图层，用于添加 3dTiles 模型数据， 继承于Layer
      let layer = new DC.TilesetLayer('layer') // layer 图层唯一标识
      viewer.addLayer(layer)
      // 3Dtiles 模型要素，继承于Overlay
      let position = new DC.Position(119.26882265, 29.48319717, 100.04) // 定义位置
      let tileset = new DC.Tileset('/josn1/tileset.json')
      tileset.setPosition(position) // 设置位置
      tileset.setHeadingPitchRoll(-10) // 旋转角度
      tileset.setScale(20) // 设置倍数
      tileset.on(DC.MouseEventType.CLICK, this.goTOMoudle)
      layer.addOverlay(tileset)
      /* viewer.flyTo(tileset) */
      /* console.log('zwzzzwwz',viewer.cameraPosition); */
      viewer.flyToPosition(
        new DC.Position(119.26882265, 29.48319717, 7200, 0, -80) // 经纬度，视高，0，视角
      )
      /* this.start() */
      // 显示位置信息
      /* viewer.locationBar.enable = true */
    },
    intoChart() {
      var chartDom = document.getElementById('echart__main')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '台站情况',
          left: '0',
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          bottom: '5%',
          right: '2%',
          textStyle: {
            //图例文字的样式
            color: '#fff'
          }
        },
        series: [
          {
            name: '台站情况',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '正常' },
              { value: 735, name: '异常' }
            ]
          }
        ]
      }

      option && myChart.setOption(option)
    },
    intoChart2() {
      var chartDom = document.getElementById('echart__main2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '站台类型',
          left: '0',
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          bottom: '5%',
          right: '2%',
          textStyle: {
            //图例文字的样式
            color: '#fff'
          }
        },
        series: [
          {
            name: '台站情况',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '测震' },
              { value: 735, name: '强震' },
              { value: 735, name: '前兆' },
              { value: 735, name: 'GNSS' }
            ]
          }
        ]
      }

      option && myChart.setOption(option)
    },
    intoChart3() {
      var chartDom = document.getElementById('echart__main3')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '故障统计',
          left: '0',
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'category',
          data: ['2020-6', '2020-7', '2020-8', '2020-9', '2020-10', '2020-11', '2020-12','2020-8', '2020-9', '2020-10', '2020-11', '2020-12']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [10, 15, 20, 14, 8, 16, 14, 20, 14, 8, 16, 14],
            type: 'line'
          }
        ]
      }

      option && myChart.setOption(option)
    },
    // 位置信息
    addText() {
      let layer2 = new DC.VectorLayer('layer2')
      viewer.addLayer(layer2)
      let positions = new DC.Position(119.26882265, 29.48319717, 400)
      let material = new DC.PolylineDashMaterialProperty({
        color: DC.Color.ORANGE
      })
      let label = new DC.CustomLabel(positions, '新安江地震台站')
      label.setStyle({
        fillColor: DC.Color.YELLOW,
        font: '12px',
        pixelOffset: { x: 0, y: -10 },
        heightReference: 2
      })
      label.setVLine({
        width: 2,
        material
      })
      label.on(DC.MouseEventType.CLICK, this.flyToPlatform1)
      layer2.addOverlay(label)
    },
    // 摄像机循环
    start() {
      flying = new DC.Flying(viewer, {
        loop: true,
        dwellTime: 3
      })
      flying.positions = [
        {
          lng: 119.26899269438597,
          lat: 29.482688438764715,
          alt: 150.80915553527225,
          heading: 346.7577402515688,
          pitch: -31.377540554358188
        },
        {
          lng: 119.26999269438597,
          lat: 29.483688448764715,
          alt: 300.80915553527225,
          heading: 346.7577402515688,
          pitch: -31.377540554358188
        }
      ]
      flying.start()
    },
    pause() {
      flying.pause()
    },
    flyToHome() {
      viewer.flyToPosition(
        new DC.Position(119.26882265, 29.48319717, 7200, 0, -80) // 经纬度，视高，0，视角
      )
      console.log('zwzzzwwz', viewer.cameraPosition)
    },
    flyToPlatform1() {
      viewer.flyToPosition(
        new DC.Position(
          119.26899269438597,
          29.482688438764715,
          150.80915553527225,
          346.7577402515688,
          -31.377540554358188
        ) // 经纬度，视高，0，视角
      )
    },
    goTOMoudle() {
      this.$router.push('/moudle')
    }
  },
  mounted() {
    DC.ready(this.initViewer)
    this.intoChart()
    this.intoChart2()
    this.intoChart3()
  }
}
</script>

<style lang="scss" scoped>
.viewer-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.home {
  width: 200px;
  height: 50px;
  z-index: 999;
  text-align: center;
  line-height: 50px;
  border: #007acc 1px solid;
  background-color: rgb(0, 0, 0, 0.6);
  color: #fff;
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
.loopLook {
  position: fixed;
  display: flex;
  top: 20px;
  left: 80px;
  z-index: 1000;
  min-height: 40px;
  background: rgba(0, 0, 0, 0.6);
  padding: 10px 10px 0 10px;
  border-radius: 10px;
  color: #fff;
  .btn {
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin: 0 5px;
    background-color: rgba(32, 160, 255, 0.2);
    border: 1px solid #cecece;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    outline: none;
  }
}
.left__box {
  position: fixed;
  top: 80px;
  left: 80px;
  z-index: 999;
  padding: 10px;
  border: #007acc 1px solid;
  background-color: rgb(0, 0, 0, 0.6);
  color: #fff;
  .echart__main {
    width: 350px;
    height: 25vh;
    
    border-bottom: #ccc 1px solid;
    margin-bottom: 10px;
  }
  .echart__main2 {
    width: 350px;
    height: 25vh;
    
    border-bottom: #ccc 1px solid;
    margin-bottom: 10px;
  }
  .echart__main3 {
    width: 350px;
    height: 25vh;
    
  }
}
.right__box {
  position: fixed;
  top: 20px;
  right: 70px;
  z-index: 999;
  padding: 10px;
  border: #007acc 1px solid;
  background-color: rgb(0, 0, 0, 0.6);
  color: #fff;
  .platform__list {
    width: 350px;
    .platform {
      width: 350px;
      height: 80vh;
      .el-tree {
        background-color: rgba(0, 0, 0, 0);
      }
    }
  }
}
</style>
