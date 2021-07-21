<template>
  <div id="app1"></div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      modelPath: '/moudles/2.fbx'
    }
  },
  methods: {
    init() {
      let self = this
      let container = document.getElementById('app1')
      let mouse = new THREE.Vector2()
      self.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        2000
      )
      self.camera.position.set(100, 200, 300)
      self.scene = new THREE.Scene()
      // ground
      var mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
      )
      mesh.rotation.x = -Math.PI / 2
      mesh.receiveShadow = true
      self.scene.add(mesh)

      var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000)
      grid.material.opacity = 0.2
      grid.material.transparent = true
      self.scene.add(grid)

      self.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        precision: 'highp'
      })
      self.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(self.renderer.domElement)

      self.controls = new OrbitControls(self.camera, self.renderer.domElement)
      self.controls.target.set(0, 100, 0)
      self.controls.update()
      var light = new THREE.HemisphereLight(0xffffff, 0x444444)
      light.position.set(0, 200, 0)
      self.scene.add(light)

      light = new THREE.DirectionalLight(0xffffff)
      light.position.set(0, 200, 100)
      light.castShadow = true
      light.shadow.camera.top = 180
      light.shadow.camera.bottom = -100
      light.shadow.camera.left = -120
      light.shadow.camera.right = 120
      self.scene.add(light)
      let fbxLoader = new FBXLoader()
      fbxLoader.load(self.modelPath, function(object) {
        self.scene.add(object)
      })
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.renderer.clear()
      this.renderer.render(this.scene, this.camera)
      this.renderer.clearDepth()
    }
  },
  mounted() {
    this.init()
    this.animate()
  }
}
</script>
<style>
#app1 {
  height: 100%;
  width: 100%;
}
</style>
