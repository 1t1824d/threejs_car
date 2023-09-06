precision mediump float;
uniform float uTime;
//varying：从顶点着色器传递到片元着色器的变量。 将uv传递到片元着色器。uv是二维坐标，是物体顶点在纹理上的映射位置（相当于将一个3维物体展开后的对应的二维位置）。传递给片元着色器可以读取该坐标处的颜色，赋值给gl_FragColor，实现贴图效果。
varying vec2 vUv;
void main(){
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1);
    modelPosition.z = sin((modelPosition.x + uTime) * 10.0) * 0.05;
    modelPosition.z += sin((modelPosition.y + uTime) * 10.0) * 0.05;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
