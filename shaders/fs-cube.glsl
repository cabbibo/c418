#extension GL_OES_standard_derivatives : enable



varying vec4 vAudio;
varying vec3 vPos;
varying vec3 vNorm;
varying vec3 vMNorm;
varying vec3 vMPos;
varying vec3 vEye;
varying float fb;
varying float vFacing;

varying float vID;
varying vec3 vCenterPos;
varying vec2 vUv;

uniform vec3 lightPos;

uniform float time;
uniform sampler2D t_audio;
uniform sampler2D t_normal;

//uniform mat3 vNormalMat

uniform vec3 cubeOut;
uniform vec3 cubeIn;

$simplex
$normalMap
$rand

void main(){

  vec2 r =vec2( rand( vUv * vID * time ) ,  rand( vUv.yx * vID * time )); 
  vec3 fNorm = normalMap( t_normal , vMNorm , vUv , vMPos , .2 , 1.2 , r );
  
  vec3 lightDir = normalize(vMPos - lightPos);


  float d = dot( lightDir , -fNorm ); 
  float m = dot( normalize(vEye) , fNorm );

  float t = atan( vNorm.z , vNorm.x );

  float l = abs( sin( t *4. ) );

  vec4 a2 = texture2D( t_audio , vec2( abs( m ) , 0. ) );


  vec3 c = cubeOut;

  if( fb < .5 ){
  
    c = cubeIn;

  }

  gl_FragColor = vAudio  * 2. *vec4( c  *  a2.xyz, length( vAudio )/4.);// + vec4( 0. ,0.,0.,1.);
 // gl_FragColor = vec4( vUv.x , 0. , vUv.y, 1.);
 // gl_FragColor = vec4( fNorm * .5  + .5, 1.);
  //gl_FragColor = vec4( vec3(vFacing * vFacing * vFacing , 1. );


}
