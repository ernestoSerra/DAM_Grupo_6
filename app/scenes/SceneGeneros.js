alert('SceneSceneGeneros.js loaded');

function SceneSceneGeneros() {

};

SceneSceneGeneros.prototype.initialize = function () {
	alert("SceneSceneGeneros.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	$('#svecKeyHelp_35ow').sfKeyHelp({
		'return':'Volver'
	});
};

SceneSceneGeneros.prototype.handleShow = function (data) {
	alert("SceneSceneGeneros.handleShow()");
	// this function will be called when the scene manager show this scene
	pantallaActual='SceneGeneros';
	$('#generos div.col-xs-2').keynav();
};

SceneSceneGeneros.prototype.handleHide = function () {
	alert("SceneSceneGeneros.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneSceneGeneros.prototype.handleFocus = function () {
	alert("SceneSceneGeneros.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneSceneGeneros.prototype.handleBlur = function () {
	alert("SceneSceneGeneros.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneSceneGeneros.prototype.handleKeyDown = function (keyCode) {
	alert("SceneSceneGeneros.handleKeyDown(" + keyCode + ")");
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
