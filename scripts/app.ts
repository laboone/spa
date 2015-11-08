import greeter = require('./greeter');
import $ = require('jquery');

$(() => {
	$(document.body).html(greeter("hello hello"));
});
