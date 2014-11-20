 
vec3 normalMap( sampler2D texture , vec3 n , vec2 uv , vec3 p ,float tScale, float nScale ){
  vec3 q0 = dFdx( p.xyz );
  vec3 q1 = dFdy( p.xyz );
  vec2 st0 = dFdx( uv.st );
  vec2 st1 = dFdy( uv.st );

  vec3 S = normalize(  q0 * st1.t - q1 * st0.t );
  vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
  vec3 N = normalize( n );

  vec3 mapN = texture2D( texture , uv * tScale ).xyz * 2.0 - 1.0;
  mapN.xy = nScale * mapN.xy;
 
  mat3 tsn = mat3( S, T, N );
  vec3 fNormal =  normalize( tsn * mapN ); 

  return fNormal;
}

vec3 normalMap( sampler2D texture , vec3 n , vec2 uv , vec3 p ,float tScale, float nScale, vec2 offset ){
  vec3 q0 = dFdx( p.xyz );
  vec3 q1 = dFdy( p.xyz );
  vec2 st0 = dFdx( uv.st );
  vec2 st1 = dFdy( uv.st );

  vec3 S = normalize(  q0 * st1.t - q1 * st0.t );
  vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
  vec3 N = normalize( n );

  vec3 mapN = texture2D( texture , (uv+offset) * tScale ).xyz * 2.0 - 1.0;
  mapN.xy = nScale * mapN.xy;
 
  mat3 tsn = mat3( S, T, N );
  vec3 fNormal =  normalize( tsn * mapN ); 

  return fNormal;
}
