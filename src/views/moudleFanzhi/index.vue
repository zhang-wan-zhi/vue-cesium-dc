<template>
  <div id="viewer-container2" class="viewer-container2">
    <div class="home" @click="flyToHome">Home</div>
    <div class="right__box">
      <div class="platform__list">
        <div class="platform" @click="flyToPlatform1">新安江地震台站</div>
      </div>
    </div>
    <!-- <div class="loopLook">
      <div class="btn start" @click="z++">{{ 'z+' + z }}</div>
      <div class="btn start" @click="y++">{{ 'y+' + y }}</div>
      <div class="btn pause" @click="x++">{{ 'x+' + x }}</div>
    </div>
    <div class="loopLook2">
      <div class="btn start" @click="z--">{{ 'z-' + z }}</div>
      <div class="btn start" @click="y--">{{ 'y-' + y }}</div>
      <div class="btn pause" @click="x--">{{ 'x-' + x }}</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'moudleFanzhi',
  data() {
    return {
      textHeight: 0,
      z: 90,
      y: 0,
      x: 0
    }
  },
  methods: {
    initViewer() {
      let viewer = undefined
      viewer = new DC.Viewer('viewer-container2')
      global.viewer = viewer
      viewer.scene.globe.show = false
      // 地图工厂, 用于创建各类地图瓦片
      // 3dTiles 图层，用于添加 3dTiles 模型数据， 继承于Layer
      let layer = new DC.TilesetLayer('layer') // layer 图层唯一标识
      viewer.addLayer(layer)
      // 3Dtiles 模型要素，继承于Overlay
      let tileset = new DC.Tileset('/josn1/tileset.json')
      global.tileset = tileset
      tileset.setHeadingPitchRoll(this.z, this.y, this.x) // 旋转角度
      tileset.setScale(5) // 设置倍数
      layer.addOverlay(tileset)
      console.log(tileset);
      /* viewer.zoomTo(tileset) */
      viewer.zoomToPosition(
        new DC.Position(116.39123704635078, 39.90686025185025, 2.6005649728332916, 344.4195214614573, -10.155834546447023) // 经纬度，视高，0，视角
      )
      /* viewer.locationBar.enable = true */
    },
    flyToHome() {
      this.$router.push('/')
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
  },
  watch: {
      z: function(val) {
          console.log('zzzzzzzzz',val);
          tileset.setHeadingPitchRoll(1, 0, 0)
      },
      y: function(val) {
          console.log('yyy',val);
          tileset.setHeadingPitchRoll(0, 1, 0)
      },
      x: function(val) {
          console.log('xxx',val);
          tileset.setHeadingPitchRoll(0, 0, 1)
      }
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
.loopLook2 {
  position: fixed;
  display: flex;
  top: 100px;
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
    width: 400px;
    .platform {
      width: 400px;
      height: 50px;
      background-color: rgba(32, 160, 255, 0.2);
      border: 1px solid #cecece;
      border-radius: 4px;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
    }
  }
}
</style>
