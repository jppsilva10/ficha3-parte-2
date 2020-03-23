"use strict";

/*
const opacDisabled = 0.3;  //transparência para botões desactivados
const imgFolder = "../resources/image/";
const txtFolder = "../resources/text/";
const audioVolume = 1;
*/

(function()
{
	window.addEventListener("load", main);
}());


function main()
{
	/*
	ADD CODE
	*/
    window.addEventListener("message", messageHandler);
    
	var img_num = 1;
	var img = document.getElementById("photo");
	img.src = "../resources/image/01.jpg";
	var text = document.getElementById("text");
	text.src = "../resources/text/01.txt";
	var aud = document.getElementsByTagName("audio")[0];
	aud.play();

	
	var Bbtn = document.getElementById("backBtn");
    var Nbtn = document.getElementById("nextBtn");
    var Fbtn = document.getElementById("firstBtn");
    var Lbtn = document.getElementById("lastBtn");
    var Sbtn = document.getElementById("slideShowBtn");
    var soundBtn = document.getElementById("soundBtn");

    var tID;
    function slideShowHandler(ev){
        buttonDisable(Fbtn);
        buttonDisable(Bbtn);
        buttonDisable(Lbtn);
        buttonDisable(Nbtn);
        buttonDisable(Sbtn);
        var data = new Date();
        var tIni = data.getTime();
        tID = setInterval(update, 2000, tIni);
    }
    function update(){
        if(img_num<16){
            img_num++;
            loadImg(img, img_num);
            loadText(text, img_num);
        }
    }
    Sbtn.addEventListener("click", slideShowHandler);

    function endSlideShow(ev){
        if(ev.code=="Escape"){
            clearInterval(tID);
            if(img_num!=1){
                buttonEnable(Fbtn);
                buttonEnable(Bbtn);
            }
            if(img_num!=16){
                buttonEnable(Lbtn);
                buttonEnable(Nbtn);
            }
            buttonEnable(Sbtn);
        }
    }
    window.addEventListener("keyup", endSlideShow);

    console.log(soundBtn.src);
    soundBtn.addEventListener("click", function(){
        var c = soundBtn.childNodes;
        if(aud.volume == 0){
            aud.volume = 1;
            c[0].src = "../resources/extra/soundOnBtn.png";
        }
        else{
            aud.volume = 0;
            c[0].src = "../resources/extra/soundOffBtn.png";
        }
    }, true);

	function buttonClickHandler(ev){
        var btn = ev.target.parentNode;
        if(btn==Bbtn){
            img_num--;
            loadImg(img, img_num);
            loadText(text, img_num);
            if(img_num== 15){
                buttonEnable(Nbtn);
                buttonEnable(Lbtn);
            }
            if (img_num== 1){
                buttonDisable(Fbtn);
                buttonDisable(Bbtn);
            }
        }
        if(btn==Fbtn){
            if(img_num== 16){
                buttonEnable(Nbtn);
                buttonEnable(Lbtn);
            }
            img_num=1;
            loadImg(img, img_num);
            loadText(text, img_num);
            buttonDisable(Fbtn);
            buttonDisable(Bbtn);
        }
        if(btn==Nbtn){
            img_num++;
            loadImg(img, img_num);
            loadText(text, img_num);
            if(img_num== 2){
                buttonEnable(Bbtn);
                buttonEnable(Fbtn);
            }
            if (img_num== 16){
                buttonDisable(Nbtn);
                buttonDisable(Lbtn);
            }
        }
        if(btn==Lbtn){
            if(img_num== 1){
                buttonEnable(Bbtn);
                buttonEnable(Fbtn);
            }
            img_num=16;
            loadImg(img, img_num);
            loadText(text, img_num);
            buttonDisable(Nbtn);
            buttonDisable(Lbtn);
        }
	}

    Bbtn.addEventListener("click", buttonClickHandler);
    buttonDisable(Bbtn);
	Fbtn.addEventListener("click", buttonClickHandler);
	buttonDisable(Fbtn);
	Nbtn.addEventListener("click", buttonClickHandler);
	Lbtn.addEventListener("click", buttonClickHandler);
}


/*
ADD CODE
*/

function loadImg(img, img_num){
    if(img_num<10)
        img.src = "../resources/image/0" + img_num + ".jpg";
    else
        img.src = "../resources/image/" + img_num + ".jpg";
}

function loadText(text, text_num){
    if(text_num<10)
        text.src = "../resources/text/0" + text_num + ".txt";
    else
        text.src = "../resources/text/" + text_num + ".txt";
}

function buttonDisable(btn){
    btn.style.opacity=0.3;
    btn.style.cursor= "initial";
    btn.disabled= true;
}

function buttonEnable(btn){
    btn.style.opacity=1;
    btn.style.cursor= "pointer";
    btn.disabled= false;
}

function messageHandler(ev) {
    var source = ev.source;
    if(ev.data=="helo frame"){
        source.postMessage('hello main', '*');
    }
}