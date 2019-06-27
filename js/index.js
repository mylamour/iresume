if (navigator.language == "zh-CN"){
    en.style.display = "none";
    cn.style.display = "";
}else{
    en.style.display = "";
    cn.style.display = "none";
}
// https://stackoverflow.com/questions/16422124/javascript-detect-browser-scroll-to-the-top
function getScrollTop() {
    if (typeof pageYOffset != 'undefined') {
        //most browsers except IE before #9
        return pageYOffset;
    }
    else {
        var B = document.body; //IE 'quirks'
        var D = document.documentElement; //IE with doctype
        D = (D.clientHeight) ? D : B;
        return D.scrollTop;
    }
}

var lastScrollTop = 0;
window.addEventListener("scroll", function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;

    var iswitch = document.getElementById('switch');
    // var iclock = document.getElementById("clock");


    if (st > lastScrollTop) {
        iswitch.style.display = "none";
        // iclock.style.display = "none";
    } else {
        if (getScrollTop() == 0) {
            iswitch.style.display = "inline";
        }
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);


function change() {
    var cn = document.getElementById('cn');
    var en = document.getElementById('en');

    if (cn.style.display == "none") {
        cn.style.display = "";
        en.style.display = "none";
    } else {
        en.style.display = "";
        cn.style.display = "none";
    }
}


var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = '#00ffff';  //#292929
ctx.lineWidth = 17;
ctx.shadowBlur = 15;
ctx.shadowColor = '#00ffff'

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}

function renderTime() {
    var now = new Date();
    var today = now.toDateString();
    var time = now.toLocaleTimeString();
    var hrs = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mil = now.getMilliseconds();
    var smoothsec = sec + (mil / 1000);
    var smoothmin = min + (smoothsec / 60);

    //Background
    gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300);
    gradient.addColorStop(0, "#03303a"); //292929 03303a
    gradient.addColorStop(1, "black");
    ctx.fillStyle = gradient;
    //ctx.fillStyle = 'rgba(00 ,00 , 00, 1)';
    ctx.fillRect(0, 0, 500, 500);
    //Hours
    ctx.beginPath();
    ctx.arc(250, 250, 200, degToRad(270), degToRad((hrs * 30) - 90));
    ctx.stroke();
    //Minutes
    ctx.beginPath();
    ctx.arc(250, 250, 170, degToRad(270), degToRad((smoothmin * 6) - 90));
    ctx.stroke();
    //Seconds
    ctx.beginPath();
    ctx.arc(250, 250, 140, degToRad(270), degToRad((smoothsec * 6) - 90));
    ctx.stroke();
    //Date
    ctx.font = "25px Helvetica";
    ctx.fillStyle = 'rgba(00, 255, 255, 1)'
    ctx.fillText(today, 175, 250);
    //Time
    ctx.font = "25px Helvetica Bold";
    ctx.fillStyle = 'rgba(00, 255, 255, 1)';
    // ctx.fillText(time+":"+mil, 175, 280);
    ctx.fillText(time, 175, 280);

}
setInterval(renderTime, 40);