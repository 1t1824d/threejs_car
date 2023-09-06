import * as THREE from 'three';
window.THREE = THREE
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// 引入相机控件`MapControls`
import { MapControls } from 'three/examples/jsm/controls/MapControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

import TWEEN from '@tweenjs/tween.js'
/* 
**
*/
let ContainerIDDiv = document.querySelector("#ContainerID")
let width = ContainerIDDiv.getBoundingClientRect().width
let height = ContainerIDDiv.getBoundingClientRect().height
console.log(`width,height`, width, height);

/* 
**
*/
//  1.创建场景
const scene = new THREE.Scene()

//  2.创建并添加相机
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000)
camera.position.set(4.25, 1.4, -4.5);
scene.add(camera)


/* 
**
*/

//加载管理器
let event = {}
event.onLoad = () => {

}
event.onProgress = (url, num, total) => {
    console.log(`url,num,total`, url, num, total, `${Math.round(num / total * 100)}%`);
}
event.onError = () => {

}
let textureManage = new THREE.LoadingManager(
    event.onLoad,
    event.onProgress,
    event.onError
)

/* 
**
*/
let ambientLight = new THREE.AmbientLight(0x444444, 1)
scene.add(ambientLight)

let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(30, 30, 30)
directionalLight.castShadow = true
scene.add(directionalLight)
const texture = new THREE.TextureLoader().load(require("../assets/models/back.jpg"))
var spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4);
spotLight.position.set(0, 5, 0);
spotLight.target.position.set(0, 0, 0);
spotLight.castShadow = true; // 投射阴影
spotLight.shadow.bias = -0.002; // 减少阴影失真
spotLight.shadow.mapSize.width = 4096;
spotLight.shadow.mapSize.height = 4096;
spotLight.map = texture
scene.add(spotLight);




/* 
**
*/
//纹理贴图加载器TextureLoader
let textureLoader = new THREE.TextureLoader()
// .load()方法加载图像，返回一个纹理对象Texture
// let texture = textureLoader.load(require('../assets/img/tube.png'))
// //UV坐标U方向阵列模式
// texture.wrapS = THREE.RepeatWrapping;
// //纹理沿着管道方向阵列(UV坐标U方向)
// texture.repeat.x = 20;
/* 
**
*/


// //创建一个空的几何体对象
// const geometry = new THREE.BufferGeometry(); 
// //类型化数组创建顶点数据
// const vertices = new Float32Array([
//     0, 0, 0, //顶点1坐标
//     50, 0, 0, //顶点2坐标
//     0, 100, 0, //顶点3坐标
//     0, 0, 10, //顶点4坐标
//     0, 0, 100, //顶点5坐标
//     50, 0, 10, //顶点6坐标
// ]);
// // 创建属性缓冲区对象
// //3个为一组，表示一个顶点的xyz坐标
// const attribue = new THREE.BufferAttribute(vertices, 3); 
// // 设置几何体attributes属性的位置属性
// geometry.attributes.position = attribue;
// // 矩形平面，有索引，两个三角形，有2个顶点重合，有4个顶点
// // 每个顶点的法线数据和顶点位置数据一一对应
// const normals = new Float32Array([
//     0, 0, 1, //顶点1法线( 法向量 )
//     0, 0, 1, //顶点2法线
//     0, 0, 1, //顶点3法线
//     0, 0, 1, //顶点4法线
// ]);
// // 设置几何体的顶点法线属性.attributes.normal
// geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

// // 点渲染模式
// const material = new THREE.PointsMaterial({
//     color: 0xffff00,
//     size: 10.0 //点对象像素尺寸
// }); 

// const points = new THREE.Points(geometry, material); //点模型对象
// // 线材质对象
// const material2 = new THREE.LineBasicMaterial({
//     color: 0xff0000 //线条颜色
// }); 
// // 创建线模型对象
// const line = new THREE.Line(geometry, material2);

// const material3 = new THREE.MeshBasicMaterial({
//     color: 0x0000ff, //材质颜色
//     side: THREE.FrontSide, //默认只有正面可见
// });

// let mesh=new THREE.Mesh(geometry,material3)
// scene.add(points,line,mesh)
// // 创建球体
// var sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 ,
//     emissiveIntensity:1.0});
// var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphere.position.y = 1; // 将球体放置在平面上方
// sphere.castShadow = true; // 投射阴影
// scene.add(sphere);
let cubeTextureLoader = new THREE.CubeTextureLoader(textureManage)
let envcubeTexture = cubeTextureLoader.load(
    [
        require('../assets/textures/cube/Bridge2/posx.jpg'),
        require('../assets/textures/cube/Bridge2/negx.jpg'),
        require('../assets/textures/cube/Bridge2/posy.jpg'),
        require('../assets/textures/cube/Bridge2/negy.jpg'),
        require('../assets/textures/cube/Bridge2/posz.jpg'),
        require('../assets/textures/cube/Bridge2/negz.jpg')

    ]
)
scene.background = envcubeTexture
scene.environment = envcubeTexture
// 创建平面
var planeGeometry = new THREE.PlaneGeometry(20, 20);
var planeMaterial = new THREE.MeshPhysicalMaterial({
    side: THREE.DoubleSide,
    color: 0x808080,
    metalness: 0,
    roughness: 0.1,
    transparent: true,
    opacity: 1,
    emissiveIntensity: 1.0
})

var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2; // 将平面旋转至水平方向
plane.receiveShadow = true; // 接收阴影
scene.add(plane);
const geometry = new THREE.CylinderGeometry(10, 10, 20, 20)
const material = new THREE.MeshPhysicalMaterial({
    color: 0x6c6c6c,
    side: THREE.DoubleSide,
    emissiveIntensity: 1.0
})

const cylinder = new THREE.Mesh(geometry, material)
scene.add(cylinder)

let doors = []
let wheels = [];
let carStatus;
// 车身材质
let bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: "#6e2121",
    metalness: 1,
    roughness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    envMapIntensity: 2.5,
    ior: 1.5,//折射率
});


// 玻璃材质
let glassMaterial = new THREE.MeshStandardMaterial({
    color: "#793e3e",
    metalness: 0.25,
    roughness: 0,
    transmission: 1.0 //透光性.transmission属性可以让一些很薄的透明表面，例如玻璃，变得更真实一些。
})

let gLTFLoader = new GLTFLoader(textureManage)
gLTFLoader.loadAsync(require('../assets/models/Lamborghini.glb'))
    .then(model => {
        console.log(`model`, model);
        const carModel = model.scene
        carModel.rotation.y = Math.PI
        carModel.traverse(obj => {
            console.log(`obj`, obj);
            if (obj.name === 'Object_103' || obj.name == 'Object_64' || obj.name == 'Object_77') {
                // 车身
                obj.material = bodyMaterial

            } else if (obj.name === 'Object_90') {
                // 玻璃
              obj.material = glassMaterial
            } else if (obj.name === 'Empty001_16' || obj.name === 'Empty002_20') {
                // 门
                doors.push(obj)
            } else {

            }
            obj.castShadow = true;
        })
        wheels.push(
            carModel.getObjectByName('<Wheel003_2'),
            carModel.getObjectByName('<Wheel_0'),
        );
        console.log(`wheels`, wheels);
        let glassMesh = model.scene.getObjectByName('Object_90')
        console.log(`glassMesh`, glassMesh);

        directionalLight.target.position.copy(model.scene.position)
        spotLight.target.position.copy(model.scene.position)
        // spotLight.target是一个模型对象Object3D，默认在坐标原点
        //spotLight.target添加到场景中.target.position才会起作用
        scene.add(model.scene, spotLight, spotLight, directionalLight.target)
    })

/* 
**
*/

//  4.设置渲染器并渲染场景
const renderer = new THREE.WebGL1Renderer({
    // 设置对数深度缓冲区，优化深度冲突问题
    logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true,
}) //初始化渲染器
renderer.shadowMap.enabled = true
renderer.setSize(width, height)  //设置渲染的尺寸大小
// renderer.setClearColor(0xffffff,0.0)
// renderer.setClearAlpha(0.0)
//新版本，加载gltf，不需要执行下面代码解决颜色偏差
renderer.outputColorSpace = THREE.SRGBColorSpace;//设置为SRGB颜色空间
renderer.toneMapping = THREE.ACESFilmicToneMapping;
ContainerIDDiv.appendChild(renderer.domElement);// 将webgl渲染的内容添加到body


/* 
**
*/

// 引入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 5.添加控制器-轨道控制器 可以使得相机围绕目标进行轨道运动  通过不断地重新渲染来实现移动视角的效果
const controls = new OrbitControls(camera, renderer.domElement);
// 10.设置控制器阻尼 更真实  需要在每一帧重新生成时调用controls.update();
controls.enableDamping = true;

controls.maxDistance = 9
controls.minDistance = 1

controls.minPolarAngle = 0
controls.maxPolarAngle = 80 / 360 * 2 * Math.PI
/* 
**
*/
// 创建后处理对象EffectComposer，WebGL渲染器作为参数
// const composer = new EffectComposer(renderer);
// // 创建一个渲染器通道，场景和相机作为参数
// const renderPass = new RenderPass(scene, camera);
// // 设置renderPass通道
// composer.addPass(renderPass);
// // OutlinePass第一个参数v2的尺寸和canvas画布保持一致
// const v2 = new THREE.Vector2(width, height);
// // const v2 = new THREE.Vector2(800, 600);
// const outlinePass = new OutlinePass(v2, scene, camera);
// // 一个模型对象
// outlinePass.selectedObjects = [plane];
// // 设置OutlinePass通道
// composer.addPass(outlinePass);


/* 
**
*/
let clock = new THREE.Clock()
function render(time) {//递归实现每一帧的重新渲染
    //  let time = clock.getElapsedTime()
    controls.update()
    // composer.render();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    //  const time = - performance.now() / 1000;

    // for ( let i = 0; i < wheels.length; i ++ ) {

    //     wheels[ i ].rotation.x = time/ 1000 * Math.PI * 2;

    // }

    //grid.position.z = - ( time ) % 1;
    TWEEN.update(time)

}
render();

/* 
**
*/

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

/* 
**
*/
window.addEventListener("resize", () => {
    width = ContainerIDDiv.getBoundingClientRect().width
    height = ContainerIDDiv.getBoundingClientRect().height
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)

})

/* 
**
*/

window.addEventListener("dblclick", () => {
    let fullscreen = document.fullscreenElement
    if (!fullscreen) {
        renderer.domElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})


/* 
**
*/

window.addEventListener('click', onPointClick);
function onPointClick(event) {
    console.log(`event`, event);
    let pointer = {}
    pointer.x = (event.offsetX / width) * 2 - 1;
    pointer.y = - (event.offsetY / height) * 2 + 1;


    var vector = new THREE.Vector2(pointer.x, pointer.y)
    var raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(vector, camera)
    let intersects = raycaster.intersectObjects(scene.children);


    intersects.forEach((item) => {
        if (item.object.name === 'Object_64' || item.object.name === 'Object_77') {
            //   carIn()
            if (!carStatus || carStatus === 'close') {
                carOpen()
            } else {
                carClose()
            }
            console.log(intersects)
        }
    })


}
function carOpen() {
    carStatus = 'open'
    for (let i = 0; i < doors.length; i++) {
        setAnimationDoor({ x: 0 }, { x: Math.PI / 3 }, doors[i])
    }
}

function carClose() {
    carStatus = 'close'
    for (let i = 0; i < doors.length; i++) {
        setAnimationDoor({ x: Math.PI / 3 }, { x: 0 }, doors[i])
    }
}

function carIn() {
    setAnimationCamera({ cx: 4.25, cy: 1.4, cz: -4.5, ox: 0, oy: 0.5, oz: 0 }, { cx: -0.27, cy: 0.83, cz: 0.60, ox: 0, oy: 0.5, oz: -3 });
}

function carOut() {
    setAnimationCamera({ cx: -0.27, cy: 0.83, cz: 0.6, ox: 0, oy: 0.5, oz: -3 }, { cx: 4.25, cy: 1.4, cz: -4.5, ox: 0, oy: 0.5, oz: 0 });
}

function setAnimationDoor(start, end, mesh) {
    const tween = new TWEEN.Tween(start).to(end, 1000).easing(TWEEN.Easing.Quadratic.Out)
    tween.onUpdate((that) => {
        mesh.rotation.x = that.x
    })
    tween.start()
}

function setAnimationCamera(start, end) {
    const tween = new TWEEN.Tween(start).to(end, 3000).easing(TWEEN.Easing.Quadratic.Out)
    tween.onUpdate((that) => {
        //  camera.postition  和 controls.target 一起使用
        camera.position.set(that.cx, that.cy, that.cz)
        controls.target.set(that.ox, that.oy, that.oz)
    })
    tween.start()
}

import * as dat from 'dat.gui';
function initGUI() {
    var obj = {
        bodyColor: '#6e2121',
        glassColor: '#aaaaaa',
        carOpen,
        carClose,
        carIn,
        carOut
    };

    const gui = new dat.GUI();
    gui.addColor(obj, "bodyColor").name('车身颜色').onChange((value) => {
        bodyMaterial.color.set(value)
    })

    gui.addColor(obj, "glassColor").name('玻璃颜色').onChange((value) => {
        glassMaterial.color.set(value)
    })

    gui.add(obj, "carOpen").name('打开车门')
    gui.add(obj, "carClose").name('关门车门')

    gui.add(obj, "carIn").name('车内视角')
    gui.add(obj, "carOut").name('车外视角')
}
initGUI()
/* 
**
 */
