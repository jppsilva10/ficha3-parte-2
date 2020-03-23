"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
	var source;
	function messageHandler(ev){
		if(ev.data=="hello frame"){
			source = ev.source;
			source.postMessage('hello main', '*');
    	}
	}
	window.addEventListener("message", messageHandler);

	var anim = document.getElementById("credits");

	function animHandler(ev){
		source.postMessage('creditsended', '*');
	}
	anim.addEventListener("animationend", animHandler);
}

/*
ADD CODE
*/
