function Detector( neededTech , onFailure ){

  this.neededTech = neededTech;
  this.failures = [];
  this.onFailure = onFailure;
  this.detect();

} 

Detector.prototype.detect = function(){


  for(var i = 0 ; i < this.neededTech.length; i++ ){

    var tech = this.neededTech[i];
    if( tech == 'webGL' )
      this.detectWebGL();
    else if( tech == 'audio' )
      this.detectWebAudioAPI();
    else if( tech == 'mobile' )
      this.detectMobile();

  }

  if( this.failures.length > 0 ){

    this.onFailure( this.failures );

    throw new Error('This is not an error. This is just to abort javascript');
  }

};
    
Detector.prototype.detectWebGL =  function(){

  var webGL = function() { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } };

  var gl = webGL();
  
  if( !gl )
    this.addFailure( "WebGL" ,'http://get.webgl.org/');


},

Detector.prototype.detectWebAudioAPI = function(){

  if( !window.AudioContext ){
    this.addFailure( 'Web Audio API' ,'http://caniuse.com/audio-api' ); 
  }

}

Detector.prototype.detectMobile = function(){

  var detectM = function () { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
      return true;
    } else {
      return false;
    }
  }

  var mobile = detectM();

  if( mobile )
    this.addFailure( "Non Mobile" , "http://cabbibo.tumblr.com" );

}

Detector.prototype.addFailure = function( name , link ){
  this.failures.push( [ name , link ] );
}


