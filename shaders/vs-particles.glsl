
attribute float id;
attribute vec3 centerPosition;

varying vec3 vPos;
varying vec3 vNorm;
varying vec3 vMNorm;
varying vec3 vMPos;
varying vec3 vEye;
varying float vID;
varying vec3 vCenterPos;
varying vec4 vAudio;

varying vec2 vUv;
varying float fb;
varying float vFacing;
uniform sampler2D t_audio;
uniform float numOfCubes;
uniform vec3 lightPos;


void main(){

  vUv = uv;
   
  float t = atan( vNorm.z , vNorm.x );
  float l = abs( sin( t *4. ) );
 // vec4 a2 = texture2D( t_audio , vec2( l , 0. ) );

  vCenterPos = centerPosition;
  vID = id;

  vec3 norm = normalize( position-centerPosition );
   

  vec3 mPos = (modelMatrix * vec4( position ,1. )).xyz;
  vec3 eye = cameraPosition - mPos;
  vec3 mNorm = normalize(normalMatrix * normal);
  float m = dot( normalize( eye )  ,normal );//dot( normalize(eye) , mNorm );
  vec4 a =  texture2D( t_audio , vec2( vID / numOfCubes , 0. ) );

  vAudio = a;
  vFacing = m;

  vPos = position.xyz - norm * .1 - norm*length(a);//pow(length( a) /2. , 4.);

  vMPos = (modelMatrix * vec4( vPos ,1. )).xyz;

  vEye = cameraPosition - vMPos;

  vNorm = normal;
  vMNorm = normalize(normalMatrix * normal);

  fb = 0.;

  if( dot( normalize( vEye )  ,normal ) < 0. ){
    fb = 1.;
  }

  
  gl_PointSize = min( 20. , (100. * length( vAudio) * length( vAudio) * length( vAudio))  /  length( (modelViewMatrix * vec4( vPos , 1. )).xyz));
  

  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos , 1. );
}
