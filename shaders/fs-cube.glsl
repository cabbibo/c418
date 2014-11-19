#extension GL_OES_standard_derivatives : enable



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

uniform vec3 cubeOut;
uniform vec3 cubeIn;

$simplex
$normalMap

void main(){

  vec3 lightDir = normalize(vMPos - lightPos);

  float d = dot( lightDir , -vMNorm ); 
  float m = dot( normalize(vEye) , vMNorm );

  float t = atan( vNorm.z , vNorm.x );

  float l = abs( sin( t *4. ) );

  vec4 a2 = texture2D( t_audio , vec2( abs( m ) , 0. ) );

  float al = length( a2 );
  float s = snoise( vPos * vec3( .01 , .01 , 10.1 ) );

  vec3 fNorm = normalMap( t_normal , vNorm , vUv , vPos , 2. , .2 );


  if( abs(s) > al*al * .5 ){
   // discard;
  }

  float s2 = (s +.1 )  * .5;
  vec4 a = texture2D( t_audio , vec2( abs(s), 0. ) );


  vec3 c = cubeOut;

  if( fb < .5 ){
  
    c = cubeIn;

  }

  //gl_FragColor = vec4( c  * a.xyz * a2.xyz, 1.);
  gl_FragColor = vec4( vUv.x , 0. , vUv.y, 1.);
  gl_FragColor = vec4( fNorm * .5  + .5, 1.);
  //gl_FragColor = vec4( vec3(vFacing * vFacing * vFacing , 1. );


}
