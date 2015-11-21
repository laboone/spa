import chat = require('./Spa');
import spa = require('./SpaShell')
import $ = require('jquery');

$(() => {
	//new chat.Spa($('#spa'));
	new spa.SpaShell($('#spa'));
});
