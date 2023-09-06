precision mediump float;
// 定义顶点
attribute vec3 position;
//定义位置参数
attribute vec2 uv;
// 传入投影矩阵
uniform mat4 projectionMatrix;
// 传入视图矩阵
uniform mat4 viewMatrix;
// 传入模型矩阵
uniform mat4 modelMatrix;
//接收着色器材质传递的时间参数
uniform float uTime;
// uv传递到片元着色器 varying是从顶点着色器传递到片元着色器的变量
varying vec2 vUv;
void main(){
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    modelPosition.z = sin((modelPosition.x + uTime) * 10.0) * 0.05;
    modelPosition.z += sin((modelPosition.y + uTime) * 10.0) * 0.05;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}

