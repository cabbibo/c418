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
uniform sampler2D t_sprite;

//uniform mat3 vNormalMat

uniform vec3 particlesOut;
uniform vec3 particlesIn;

$simplex
$normalMap

void main(){

 // vec3 fNorm = normalMap( t_normal , vMNorm , vUv , vMPos , 2. , 1.2 );
  
  vec3 lightDir = normalize(vMPos - lightPos);


  float d = dot( lightDir , -vMNorm ); 
  float m = dot( normalize(vEye) , vMNorm );

  float t = atan( vNorm.z , vNorm.x );

  float l = abs( sin( t *4. ) );

  vec2 uv = vec2( gl_PointCoord.x , 1.0 - gl_PointCoord.y); 

  float lookup = (uv.x - .5 )*(uv.x - .5 ) + (uv.y-.5)*(uv.y-.5);
 vec4 a2 = texture2D( t_audio , vec2( lookup, 0.) );

 if( lookup> .25 ){discard;}

  vec3 c = particlesOut;

  if( fb < .5 ){
  
    c = particlesIn;

  }

  //vec4 s = texture2D( t_sprite , uv );

  gl_FragColor = a2 * a2 * a2 * vAudio*vAudio* vec4( c , .1);// + vec4( 0. ,0.,0.,1.);
 // gl_FragColor = vec4( vUv.x , 0. , vUv.y, 1.);
 // gl_FragColor = vec4( fNorm * .5  + .5, 1.);
  //gl_FragColor = vec4( vec3(vFacing * vFacing * vFacing , 1. );


}
