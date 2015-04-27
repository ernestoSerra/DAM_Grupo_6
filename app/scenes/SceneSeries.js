alert('SceneSceneSeries.js loaded');

function SceneSceneSeries() {

};
var arrayIds = new Array();
SceneSceneSeries.prototype.initialize = function () {
	alert("SceneSceneSeries.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	$('#svecKeyHelp_yhq7').sfKeyHelp({
		'return':'Atrás'
	});
};

SceneSceneSeries.prototype.handleShow = function (data) {
	alert("SceneSceneSeries.handleShow()");
	// this function will be called when the scene manager show this scene
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
					height: 700,
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
		},delayCarousel);
};

SceneSceneSeries.prototype.handleHide = function () {
	alert("SceneSceneSeries.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneSceneSeries.prototype.handleFocus = function () {
	alert("SceneSceneSeries.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneSceneSeries.prototype.handleBlur = function () {
	alert("SceneSceneSeries.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneSceneSeries.prototype.handleKeyDown = function (keyCode) {
	alert("SceneSceneSeries.handleKeyDown(" + keyCode + ")");
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
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};