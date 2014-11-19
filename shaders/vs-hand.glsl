
varying vec3 vPos;
varying vec3 vNorm;
varying vec3 vMNorm;
varying vec3 vMPos;
varying vec3 vEye;

varying float fb;
varying float vFacing;
uniform sampler2D t_audio;

uniform vec3 lightPos;


void main(){
   
  float t = atan( vNorm.z , vNorm.x );
  float l = abs( sin( t *4. ) );
 // vec4 a2 = texture2D( t_audio , vec2( l , 0. ) );

   

  vec3 mPos = (modelMatrix * vec4( position ,1. )).xyz;
  vec3 eye = cameraPosition - mPos;
  vec3 mNorm = normalize(normalMatrix * normal);
  float m = dot( normalize( eye )  ,normal );//dot( normalize(eye) , mNorm );
  vec4 a =  texture2D( t_audio , vec2( m , 0. ) );

  vFacing = m;

  vPos = position.xyz + normal*pow(length( a) /3. , 10.);

  vMPos = (modelMatrix * vec4( vPos ,1. )).xyz;

  vEye = cameraPosition - vMPos;

  vNorm = normal;

  vNormMat = normalMatrix;
  vMNorm = normalize(normalMatrix * normal);

  fb = 0.;

  if( dot( normalize( vEye )  ,normal ) < 0. ){
    fb = 1.;
  }

   
  

  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos , 1. );
}
