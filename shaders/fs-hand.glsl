varying vec3 vPos;
varying vec3 vNorm;
varying vec3 vMNorm;
varying vec3 vMPos;
varying vec3 vEye;
varying float fb;
varying float vFacing;


uniform vec3 lightPos;

uniform float time;
uniform sampler2D t_audio;

uniform vec3 handOut;
uniform vec3 handIn;

$simplex

void main(){

  vec3 lightDir = normalize(vMPos - lightPos);

  float d = dot( lightDir , -vMNorm ); 
  float m = dot( normalize(vEye) , vMNorm );

  float t = atan( vNorm.z , vNorm.x );

  float l = abs( sin( t *4. ) );

  vec4 a2 = texture2D( t_audio , vec2( abs( m ) , 0. ) );

  float al = length( a2 );
  float s = snoise( vPos * vec3( .01 , .01 , 10.1 ) );


  if( abs(s) > al*al * .5 ){
    discard;
  }

  float s2 = (s +.1 )  * .5;
  vec4 a = texture2D( t_audio , vec2( abs(s), 0. ) );


  vec3 c = handOut;

  if( fb < .5 ){
  
    c = handIn;

  }

  gl_FragColor = vec4( c  * a.xyz * a2.xyz, 1.);
  //gl_FragColor = vec4( vec3(vFacing * vFacing * vFacing , 1. );


}
