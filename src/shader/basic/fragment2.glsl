precision mediump float;
// sampler2D类型的纹理变量
uniform sampler2D uTexture;
// 接收顶点着色器传来的uv
varying vec2 vUv;
void main(){
     // texture2D是用于读取纹理颜色值的函数
    vec4 textureColor = texture2D(uTexture,vUv);
    gl_FragColor = textureColor;
    
}

