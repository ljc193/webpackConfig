import 'jquery';
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.css"
import "./css/cssReset.css"
import './css/app.scss';
const menuList = require('./js/menu.js');

function Wrarch() {
}
Wrarch.prototype.randerHeader = function() {
	var headDom = $('#menu_wrapper .navbar-nav'),listr="";
	for(var i=0;i<menuList.length;i++) {
		if(menuList[i].url!=="index") {
			listr += "<li><a href=/" + menuList[i].url + ".html >" + menuList[i].englishNam + "</a></li>"
		}
	}
	headDom.append(listr)
	 $('#menu_wrapper .navbar-nav li a').each(function(){  
		if($($(this))[0].href==String(window.location))  
			$(this).parent().addClass('active');  
	});  
}

var wrarch = new Wrarch();

wrarch.randerHeader();


