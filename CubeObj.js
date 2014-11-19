function CubeObj( numOf ){
  

  /*this.diffusionRenderer = new DiffusionRenderer;
  
  var g = new THREE.BufferGeometry();

  console.log( this.totalVerts );

  //6 = faces per cube
  //6 = verts per face
  //6 * 6 = verts per cube
  

  var tv = this.totalVerts;
  
  var aPos  = new THREE.BufferAttribute(new Float32Array( tv * 3 ), 3 );
  var aNorm = new THREE.BufferAttribute(new Float32Array( tv * 3 ), 3 );
  var aUV   = new THREE.BufferAttribute(new Float32Array( tv * 1 ), 1 );
  var aID   = new THREE.BufferAttribute(new Float32Array( tv * 1 ), 1 );
  var aEdge = new THREE.BufferAttribute(new Float32Array( tv * 1 ), 1 );
  var aFade = new THREE.BufferAttribute(new Float32Array( tv * 1 ), 1 );

  g.addAttribute( 'position', aPos ); 
  g.addAttribute( 'normal', aNorm );
  g.addAttribute( 'id', aID );
  g.addAttribute( 'edge', aEdge );
  g.addAttribute( 'fade', aFade );

  var positions = g.getAttribute( 'position' ).array;
  var normals   = g.getAttribute( 'normal' ).array;
  var ids       = g.getAttribute( 'id' ).array;
  var edges     = g.getAttribute( 'edge' ).array;
  var fades     = g.getAttribute( 'fade' ).array;*/

  this.numOf = numOf || 300;

  this.cubes = [];

  this.dir = [
    [1 , 0 , 0 ],
    [0 , 1 , 0 ],
    [0 , 0 , 1 ],
    [-1 , 0 , 0 ],
    [0 , -1 , 0 ],
    [0 , 0 , -1 ],
  ]

  this.getCubes([0,0,0]);

  var geo = this.createGeometry();
  console.log(this.cubes );

  return geo;

}

CubeObj.prototype.getCubes = function( cP ){

  if( this.cubes.length < this.numOf ){


    var d = (Math.random() < .5) ? this.dir[5] : this.dir[4];

    //d = (Math.random() < .3) ? d : this.dir[3];
    if( Math.random() > .01 ){
      d = this.dir[ Math.floor(Math.random() * 6) ];
    }
    var nP = [ cP[0] + d[0] , cP[1] + d[1] , cP[2] + d[2] ];

    var same = false;
    for( var i = 0; i < this.cubes.length; i++ ){

      if(
        this.cubes[i][0] == nP[0] &&
        this.cubes[i][1] == nP[1] &&
        this.cubes[i][2] == nP[2] 
      ){
        console.log('true');
        same = true;
        break;
      }

    }

    if( same == false ){

      this.cubes.push( nP );
      this.getCubes( nP );

    }else{

      this.getCubes( cP );

    }

  }

}


CubeObj.prototype.createGeometry = function(){

  //this.diffusionRenderer = new DiffusionRenderer;
  
  var g = new THREE.BufferGeometry();

  //console.log( this.totalVerts );

  //6 = faces per cube
  //6 = verts per face
  //6 * 6 = verts per cube
  
  var tv = 6 * 6 * this.cubes.length;

  console.log( tv );
 
  var centerPositions = new Float32Array( tv * 3 );
  var positions       = new Float32Array( tv * 3 );
  var normals         = new Float32Array( tv * 3 );
  var uvs             = new Float32Array( tv * 2 );
  var ids             = new Float32Array( tv * 1 );
  



  var aCPos = new THREE.BufferAttribute( centerPositions  , 3 );
  var aPos  = new THREE.BufferAttribute( positions        , 3 );
  var aNorm = new THREE.BufferAttribute( normals          , 3 );
  var aUV   = new THREE.BufferAttribute( uvs              , 2 );
  var aID   = new THREE.BufferAttribute( ids              , 1 );


  for( var i =0; i < this.cubes.length; i++ ){


    this.assignCube( 
      i,
      centerPositions,
      positions,
      normals,
      uvs,
      ids
    );


  }

  g.addAttribute( 'centerPosition'  , aCPos   ); 
  g.addAttribute( 'position'        , aPos    ); 
  g.addAttribute( 'normal'          , aNorm   );
  g.addAttribute( 'uv'              , aUV     );
  g.addAttribute( 'id'              , aID     );

  return g;

}


CubeObj.prototype.assignFace = function(){


}

CubeObj.prototype.assignCube = function( index , c , p , n , uv , id ){
  
  // i = index
  // c = centerPositions
  // p = positions
  // n = normals
  // uv = uvs 
  // id = ids
  var vertIndex = 6 * 6 * index;
  var vI = vertIndex;
  var cubePos = this.cubes[index];

  for( var i = 0; i < 6; i++ ){

    var dir = this.dir[i];
    var iOpp = (i + 3)%6;

    for( var j = 0; j < 6; j ++ ){

      
      //console.log( ( vI + ( i * 6 ) + j ) * 3 );
      // Assigning centerPosition, which is same for every face
      c[ ( vI + ( i * 6 ) + j ) * 3  + 0 ] = cubePos[0];
      c[ ( vI + ( i * 6 ) + j ) * 3  + 1 ] = cubePos[1];
      c[ ( vI + ( i * 6 ) + j ) * 3  + 2 ] = cubePos[2];

      // each face should have direction
      n[ ( vI + ( i * 6 ) + j ) * 3  + 0 ] = dir[0];
      n[ ( vI + ( i * 6 ) + j ) * 3  + 1 ] = dir[1];
      n[ ( vI + ( i * 6 ) + j ) * 3  + 2 ] = dir[2];

      id[ ( vI + ( i * 6 ) + j ) ] = index;

    }


    var v = [];

    var v = [
      [cubePos[0],cubePos[1],cubePos[2]],
      [cubePos[0],cubePos[1],cubePos[2]],
      [cubePos[0],cubePos[1],cubePos[2]],
      [cubePos[0],cubePos[1],cubePos[2]]
    ]

    // Getting us to center Edge of cube
    for( var j = 0; j < 4; j++ ){
      v[j][0] += dir[0] * .5; 
      v[j][1] += dir[1] * .5; 
      v[j][2] += dir[2] * .5;
    }


    // Getting the other directions that we need to move verts in
    var oDirs = [];

    if( i == 0 ){

      oDirs = [
        [  0 ,  1 ,  1 ],
        [  0 , -1 ,  1 ],
        [  0 ,  1 , -1 ],
        [  0 , -1 , -1 ]
      ]

    }else if( i == 1 ){

       oDirs = [
        [  1 , 0 ,  1 ],
        [ -1 , 0 ,  1 ],
        [  1 , 0 , -1 ],
        [ -1 , 0 , -1 ]
      ]

    }else if( i == 2 ){

       oDirs = [
        [  1 ,  1 , 0],
        [ -1 ,  1 , 0],
        [  1 , -1 , 0],
        [ -1 , -1 , 0]
      ]

    }else if( i == 3 ){

      oDirs = [
        [  0 ,  1 ,  1 ],
        [  0 , -1 ,  1 ],
        [  0 ,  1 , -1 ],
        [  0 , -1 , -1 ]
      ]

    }else if( i == 4 ){

       oDirs = [
        [  1 , 0 ,  1 ],
        [ -1 , 0 ,  1 ],
        [  1 , 0 , -1 ],
        [ -1 , 0 , -1 ]
      ]

    }else if( i == 5 ){

       oDirs = [
        [  1 ,  1 , 0],
        [ -1 ,  1 , 0],
        [  1 , -1 , 0],
        [ -1 , -1 , 0]
      ]

    }


/*
    for( var j = i; j < 6+i; j++ ){
      var r = j % 6;
      if( r !== i && r !== iOpp ){
        oDirs.push( this.dir[ r ] );
      }
    }*/

    if( oDirs.length !== v.length ) console.log( 'WAT?~?~?!!?!?' );

    for( var j = 0; j < 4; j ++ ){
      v[j][0] += oDirs[j][0] * .5; 
      v[j][1] += oDirs[j][1] * .5; 
      v[j][2] += oDirs[j][2] * .5; 
    }
 
    p[ ( vI + ( i * 6 ) + 0 ) * 3  + 0 ] = v[0][0];
    p[ ( vI + ( i * 6 ) + 0 ) * 3  + 1 ] = v[0][1];
    p[ ( vI + ( i * 6 ) + 0 ) * 3  + 2 ] = v[0][2];

    uv[ ( vI + ( i * 6 ) + 0 ) * 2  + 0 ] = 0;
    uv[ ( vI + ( i * 6 ) + 0 ) * 2  + 1 ] = 0;

    p[ ( vI + ( i * 6 ) + 1 ) * 3  + 0 ] = v[1][0];
    p[ ( vI + ( i * 6 ) + 1 ) * 3  + 1 ] = v[1][1];
    p[ ( vI + ( i * 6 ) + 1 ) * 3  + 2 ] = v[1][2];

    uv[ ( vI + ( i * 6 ) + 1 ) * 2  + 0 ] = 0;
    uv[ ( vI + ( i * 6 ) + 1 ) * 2  + 1 ] = 1;

    p[ ( vI + ( i * 6 ) + 2 ) * 3  + 0 ] = v[2][0];
    p[ ( vI + ( i * 6 ) + 2 ) * 3  + 1 ] = v[2][1];
    p[ ( vI + ( i * 6 ) + 2 ) * 3  + 2 ] = v[2][2];

    uv[ ( vI + ( i * 6 ) + 2 ) * 2  + 0 ] = 1;
    uv[ ( vI + ( i * 6 ) + 2 ) * 2  + 1 ] = 0;

    p[ ( vI + ( i * 6 ) + 3 ) * 3  + 0 ] = v[2][0];
    p[ ( vI + ( i * 6 ) + 3 ) * 3  + 1 ] = v[2][1];
    p[ ( vI + ( i * 6 ) + 3 ) * 3  + 2 ] = v[2][2];

    uv[ ( vI + ( i * 6 ) + 3 ) * 2  + 0 ] = 1;
    uv[ ( vI + ( i * 6 ) + 3 ) * 2  + 1 ] = 0;


    p[ ( vI + ( i * 6 ) + 4 ) * 3  + 0 ] = v[1][0];
    p[ ( vI + ( i * 6 ) + 4 ) * 3  + 1 ] = v[1][1];
    p[ ( vI + ( i * 6 ) + 4 ) * 3  + 2 ] = v[1][2];

    uv[ ( vI + ( i * 6 ) + 4 ) * 2  + 0 ] = 0;
    uv[ ( vI + ( i * 6 ) + 4 ) * 2  + 1 ] = 1;


    p[ ( vI + ( i * 6 ) + 5 ) * 3  + 0 ] = v[3][0];
    p[ ( vI + ( i * 6 ) + 5 ) * 3  + 1 ] = v[3][1];
    p[ ( vI + ( i * 6 ) + 5 ) * 3  + 2 ] = v[3][2];

    uv[ ( vI + ( i * 6 ) + 5 ) * 2  + 0 ] = 1;
    uv[ ( vI + ( i * 6 ) + 5 ) * 2  + 1 ] = 1;
  
  }





}
