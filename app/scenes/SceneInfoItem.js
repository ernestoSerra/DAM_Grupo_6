alert('SceneSceneInfoItem.js loaded');

function SceneSceneInfoItem() {

};
SceneSceneInfoItem.prototype.initialize = function () {
	alert("SceneSceneInfoItem.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	$('#svecKeyHelp_i885').sfKeyHelp({
		'return':'Volver'
	});
};

SceneSceneInfoItem.prototype.handleShow = function (data) {
	alert("SceneSceneInfoItem.handleShow()");
	// this function will be called when the scene manager show this scene
	pantallaActual='SceneInfoItem';
	var t=peliOserie=='pelicula'?'/movie/':'/tv/';
	$.ajax({
		  type: "GET",
		  crossDomain: true,
		  async: true,
		  dataType: "json",
		  url: API+t+movie_id,
		  data: { api_key: api_key },
		  success: function(data){
			  $("#details").css('background-image', 'url(' + base_url+'w1280'+data.backdrop_path + ')');
			  $("#cover").append('<img src="'+base_url+'w342'+data.poster_path+'"/>');
			  $("#sinopsis").append(data.overview);	
			  $('#puntuacionTotal').append(data.vote_average);
			  obtenerMiPuntuacion();
			  if(peliOserie=='pelicula'){				  	
				  	$("#title").append('<h1>'+data.title+'</h1>');
				  	$("#title").append('<h2>'+data.tagline+'</h2>');	  
			  }else {			  
				  	$("#title").append('<h1>'+data.name+'</h1>');
			  }
			  
			  //mostramos para puntuar si estamos logueados
			  if(session_id!=''){
				  $("#puntua").append("Puntua la pel&iacute;cula con tu mando del 1 al 5");
			  }
			 
			 
		  	
		  		
		  }
		});
	
	
	
	
};

SceneSceneInfoItem.prototype.handleHide = function () {
	alert("SceneSceneInfoItem.handleHide()");
	// this function will be called when the scene manager hide this sceneç
	$("#cover").html('');
	$("#title").html('');
	$("#title").html('');
	$("#sinopsis").html('');
	$("#tuPuntuacion").html('');
	$("#puntua").html('');
	$("#stars").html('');
	$('#puntuacionTotal').html('');
	$('#valoracion').html('');
	
};

SceneSceneInfoItem.prototype.handleFocus = function () {
	alert("SceneSceneInfoItem.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneSceneInfoItem.prototype.handleBlur = function () {
	alert("SceneSceneInfoItem.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneSceneInfoItem.prototype.handleKeyDown = function (keyCode) {
	alert("SceneSceneInfoItem.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
			break;
		case sf.key.RETURN:
			event.preventDefault();
			movie_id = '';
			sf.scene.hide('SceneInfoItem');
			sf.scene.show('ScenePeliculas');
			sf.scene.focus('ScenePeliculas');
			
			break;			
		case sf.key.N1:
			if(session_id!=''){
				puntuar(1*2);			
				$("#stars").html('');
				pintarEstrellas(2);
			}
			
			break;
		case sf.key.N2:
			if(session_id!=''){
				puntuar(2*2);
				$("#stars").html('');
				pintarEstrellas(4);
				
			}
			break;
		case sf.key.N3:
			if(session_id!=''){
				puntuar(3*2);
				$("#stars").html('');
				pintarEstrellas(6);
			}
			break;
		case sf.key.N4:
			if(session_id!=''){
				puntuar(4*2);
				$("#stars").html('');
				pintarEstrellas(8);
			}
			break;
		case sf.key.N5:
			if(session_id!=''){
				puntuar(5*2);
				$("#stars").html('');
				pintarEstrellas(10);
			}
			
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};

function puntuar (puntuacion) {
	$.ajax({
	  type: "POST",
	  crossDomain: true,
	  async: true,
	  dataType: "json",
	  url: API+'/movie/'+movie_id+'/rating',
	  data: { api_key: api_key, session_id: session_id, value: puntuacion },
	  success: function(data){
	  	console.log(data);
	  }
	});
};

function obtenerMiPuntuacion(){
	$.ajax({
		  type: "GET",
		  crossDomain: true,
		  async: true,
		  dataType: "json",
		  url: API+'/movie/'+movie_id+'/account_states',
		  data: { api_key: api_key, session_id : session_id },
		  success: function(data){
			  var miPuntuacion=data.rated.value;
			  if(typeof miPuntuacion != "undefined" ){
				  pintarEstrellas(miPuntuacion);
			  }
		}
	});
	
}

function pintarEstrellas(numEstrellas){
		if(numEstrellas==0){
	  		
	  	}else if(numEstrellas<3){
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  	}else if(numEstrellas<5){
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  	}else if(numEstrellas<7){
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  	}else if(numEstrellas<9){
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  	}else {
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  		$("#stars").append('<img src="images/fav.png" width="50" height="50"/>');
	  	}
	}




