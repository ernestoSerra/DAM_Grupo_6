alert('SceneSceneLogin.js loaded');

function SceneSceneLogin() {

};

SceneSceneLogin.prototype.initialize = function () {
	alert("SceneSceneLogin.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	$('#svecLabel_frep').sfLabel({
		text:'Usuario'
	});
	$('#svecLabel_laqt').sfLabel({
		text:'Contraseña'
	});
};

SceneSceneLogin.prototype.handleShow = function (data) {
	alert("SceneSceneLogin.handleShow()");
	// this function will be called when the scene manager show this scene
	var username = '';
	$('#pass').sfTextInput({
		text:'',
		maxlength:30,
		oncomplete: function (text) 
		{
	        if (text) {
	        	password = text;

	        	$.ajax({
				  type: "GET",
				  crossDomain: true,
				  async: true,
				  dataType: "json",
				  url: API+"/authentication/token/new",
				  data: { api_key: api_key },
				  success: function(data){
				  	var request_token = data.request_token;

				  	$.ajax({
					  type: "GET",
					  crossDomain: true,
					  async: true,
					  dataType: "json",
					  url: API+"/authentication/token/validate_with_login",
					  data: { api_key: api_key, request_token: request_token, username: username, password: password },
					  success: function(data){

					  		$.ajax({
							  type: "GET",
							  crossDomain: true,
							  async: true,
							  dataType: "json",
							  url: API+"/authentication/session/new",
							  data: { api_key: api_key, request_token: request_token },
							  success: function(data){

							  	session_id = data.session_id;
							  	localStorage.setItem('session_id', session_id);
				    			if(session_id!=''){
				    				event.preventDefault();
				    				sf.scene.hide('SceneLogin');
									sf.scene.show(pantallaActual);
									sf.scene.focus(pantallaActual);
									$('#svecKeyHelp_vhg4').sfKeyHelp({
										'red':'Cerrar sesión'
									});
				    			}else {
				    				$('#usuario').sfTextInput('focus');
				    	        	$('#usuario').sfTextInput('setKeypadPos', 300, 210);
				    			}
							  	
							  }
							});
					  	
					  }
					});

				  }
				});
	        }
	        else {
	        	//error
	        }
	    }
	});
	$('#usuario').sfTextInput({
		text:'',
		maxlength:30,
		oncomplete: function (text) 
		{
	        if (text) {
	        	username = text;
	        	$('#pass').sfTextInput('focus');
	        	$('#pass').sfTextInput('setKeypadPos', 300, 210);
	        }
	        else {
	        	//error
	        }
	    }
	});
	setTimeout(function(){ $('#usuario').sfTextInput({text:''}) }, 1);
};

SceneSceneLogin.prototype.handleHide = function () {
	alert("SceneSceneLogin.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneSceneLogin.prototype.handleFocus = function () {
	alert("SceneSceneLogin.handleFocus()");
	// this function will be called when the scene manager focus this scene
	$('#usuario').sfTextInput('blur');
	$('#pass').sfTextInput('blur');
	$('#usuario').sfTextInput('focus');
	$('#usuario').sfTextInput('setKeypadPos', 300, 210);
	
};

SceneSceneLogin.prototype.handleBlur = function () {
	alert("SceneSceneLogin.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneSceneLogin.prototype.handleKeyDown = function (keyCode) {
	alert("SceneSceneLogin.handleKeyDown(" + keyCode + ")");
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
			sf.scene.hide('SceneLogin');
			sf.scene.show(pantallaActual);
			sf.scene.focus(pantallaActual);
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};