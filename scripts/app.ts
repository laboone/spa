import chat = require('./Spa');
import $ = require('jquery');

$(() => {
	new chat.Spa($('#spa'));
});
