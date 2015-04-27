alert('SceneScenePeliculas.js loaded');

function SceneScenePeliculas() {

};
var arrayIds;
SceneScenePeliculas.prototype.initialize = function () {
	alert("SceneScenePeliculas.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	$('#svecImage_cph1').sfImage({
		src:'images\\left.png'
	});
	$('#svecImage_xu71').sfImage({
		src:'images\\rigth.png'
	});
	$('#svecKeyHelp_9lc7').sfKeyHelp({
		'return':'Volver'
	});
};

SceneScenePeliculas.prototype.handleShow = function (data) {
	alert("SceneScenePeliculas.handleShow()");
	
	
	// this function will be called when the scene manager show this scene
	if(actualizarCarousel==true){
		rrayIds = new Array();
		pantallaActual='ScenePeliculas';
		var identificador;
		var urlApi ='';
		if(peliOserie=='pelicula'){
			urlApi=API+"/discover/movie?api_key="+api_key+"&with_genres="+genero;
		}else{
			urlApi=API+"/discover/tv?api_key="+api_key+"&with_genres="+genero;
		}
			
			$.ajax({
				  type: "GET",
				  crossDomain: true,
				  async: true,
				  dataType: "json",
				  url: urlApi ,
				  success: function(data){
					arrayIds=new Array();
				  	alert('success');
				  	for (var i = 0; i <= 11; i++) {
				  		arrayIds[i]=data.results[i].id;
				  		$("#carousel").append('<img src="'+base_url+'w342'+data.results[i].poster_path+'" width="0" height="0" />');
				  	}
				  },
				  error: function(){
				  	alert('errorAqui');
				  }
				});

			var delayCarousel=1000;
			setTimeout(function(){
				var _center = {
						width: 466,
						height: 660,
						marginLeft: 0,
						marginTop: 0,
						marginRight: 0,
						border:"1px solid white"
					};
					var _left = {
						width: 235,
						height: 350,
						marginLeft: 0,
						marginTop: 150,
						marginRight: -60
					};
					var _right = {
						width: 235,
						height: 350,
						marginLeft: -60,
						marginTop: 150,
						marginRight: 0,
					};
					var _outRight = {
						width: 150,
						height: 100,
						marginLeft: 150,
						marginTop: 200,
						marginRight: -200
					};
					$('#carousel').carouFredSel({
						width: 816,
						height: 700,
						align: false,
						auto: false,
						responsive: true,
						circular:true,
						infinite:false,
						items: {
							visible: 3,
							width: 100
						},
						scroll: {
							items: 1,
							duration: 200,
							onBefore: function( data ) {
								//data.items.old.eq( 0 ).animate(_outLeft);
								data.items.visible.eq( 0 ).animate(_left).css({border:"none"});
								data.items.visible.eq( 1 ).animate(_center);
								data.items.visible.eq( 2 ).animate(_right).css({ zIndex: 1,border: "none" });
								data.items.visible.eq( 2 ).next().css(_outRight).css({ zIndex: 0 });
				 
								setTimeout(function() {
									data.items.old.eq( 0 ).css({ zIndex: 1 });
									data.items.visible.eq( 0 ).css({ zIndex: 2 });
									data.items.visible.eq( 1 ).css({ zIndex: 3 });
									data.items.visible.eq( 2 ).css({ zIndex: 2 });
								}, 200);
							}
						}
					});
					
					$('#carousel').children().eq( 0 ).css(_left).css({ zIndex: 2 });
					$('#carousel').children().eq( 1 ).css(_center).css({ zIndex: 3 });
					$('#carousel').children().eq( 2 ).css(_right).css({ zIndex: 2 });
					$('#carousel').children().eq( 3 ).css(_outRight).css({ zIndex: 1 });
					var p = $("#carousel").triggerHandler("currentPosition")+1;
					alert("show p: "+p);
					
			},delayCarousel);
	}
	var p = $("#carousel").triggerHandler("currentPosition")+1;
	alert("show p: "+p);
	alert(arrayIds.length);

};

SceneScenePeliculas.prototype.handleHide = function () {
	alert("SceneScenePeliculas.handleHide()");
	// this function will be called when the scene manager hide this scene	

	
	
};

SceneScenePeliculas.prototype.handleFocus = function () {
	alert("SceneScenePeliculas.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneScenePeliculas.prototype.handleBlur = function () {
	alert("SceneScenePeliculas.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneScenePeliculas.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScenePeliculas.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:			
			$("#carousel").trigger("prevPage");
			break;
		case sf.key.RIGHT:

			$("#carousel").trigger("nextPage");
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:	
			var indice = $('#carousel').triggerHandler("currentPosition")+1;
			if(indice==12){
				indice=0;
			}
			identificador = arrayIds[indice];
			actualizarCarousel=false;
			movie_id = identificador;
			sf.scene.hide('ScenePeliculas');
			sf.scene.show('SceneInfoItem');
			sf.scene.focus('SceneInfoItem');
			break;
		case sf.key.RETURN:
			event.preventDefault();
			actualizarCarousel=true;
			$("#carousel").html('');
			$('#carousel').trigger("slideTo",0);
			movie_id='';
			genero='';
			sf.scene.hide('ScenePeliculas');
			sf.scene.show('SceneGeneros');
			sf.scene.focus('SceneGeneros');
			break;
			
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};