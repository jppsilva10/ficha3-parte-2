"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
	var source;
	function mh(ev){
        source = messageHandler(ev);
	}
	window.addEventListener("message", mh);

	var elAnim = document.getElementById("animLast");

	elAnim.addEventListener("animationend", animLastAnimEndHandler);

	var video = document.getElementsByTagName("video")[0];

	function veh(ev){
		videoEndHandler(ev, source, veh);
	}
	video.addEventListener("ended", veh);
}


function animLastAnimEndHandler(ev)
{
	var el = ev.target;
	el.removeEventListener("animationend", animLastAnimEndHandler);

	//remove animation elements from the main tag
	el.parentNode.removeChild(el.parentNode.children[0]);
	el.parentNode.removeChild(el.parentNode.children[0]);  //nota: não é 1 porque o que era 1 passou a 0 depois da eliminação do anterior
	var video = document.getElementsByTagName("video")[0];
	video.style.display = "inline";
	video.play();
}

/*
ADD CODE
*/

function videoEndHandler(ev, source, veh){
	var el = ev.target;
	el.removeEventListener("ended", veh);
	el.parentNode.removeChild(el.parentNode.children[0]);
	source.postMessage('videoended', '*');
}

function messageHandler(ev) {
	var source = ev.source;
	if(ev.data=="hello frame"){
		source.postMessage('hello main', '*');
    	return source;
    }
    return null;
}
