// WINDOWS ON LOAD! FIRST TO RUN!!!

window.onload= function(){
  reset();
  runTheClock();
  setInterval(dateshow, 1000)
} 

// ________________________________________________________________________________________________________________


// TIMEOUT FUNCTIONS

const clicktimeout = document.getElementById("thevideos");
clicktimeout.addEventListener("click", offtimeout, false)

timeoutfn();

function timeoutfn(){
  setTimeout(timeout, 5000);
  setTimeout(offtimeout, 35000)
}

function offtimeout(){
  document.getElementById("clicktotoggle").style.display = "none"
}

function timeout(){
  document.getElementById("clicktotoggle").style.display = "inline-block"
}

// ________________________________________________________________________________________________________________________
// FUNCTIONS TO CALL OUT!

var myIndex = 0;
slideshowvid();
themex();
dateshow();
browswerinfo();
deviceinfo();
runsd();


// ________________________________________________________________________________________________________________
 
 // POP UP FUNCTION!!!!!!!!!!!!!

// function popups(){
//   document.getElementById("popupgraph").style.display = "block";
//   document.getElementById("cok").style.display = "block";
//   document.getElementById("closebutton").style.display = "block";
//   document.getElementById("popupgraph").style.transition ="ease 2s"
  
// }

// setTimeout(popups, 8000)

// function popupdiv(){
//   document.getElementById("popupdiv").style.height = "3.3vw";
//   document.getElementById("popupdiv").style.transition ="ease 2s"
  
// }
// setTimeout(popupdiv, 7000)
// setTimeout(exitpop, 120000)



// ------------------------------------------------------------------

// CLOSE BUTTON

const closebutt = document.querySelector("#closebutton");
closebutt.addEventListener("click", exitpop, false);
function exitpop(){
  document.getElementById("popupgraph").style.display = "none";
  document.getElementById("cok").style.display = "none";
  document.getElementById("closebutton").style.display = "none";
  document.getElementById("popupdiv").style.height = "0vw";
  document.getElementById("popupdiv").style.transition ="ease 2s"
}

// END POP UP FUNCTION



// ________________________________________________________________________________________________________________

// DAY AND NIGHT AUTOMATE


const bright = document.querySelector("#brightbutton")
bright.addEventListener("click", brighten, false);

const dark = document.querySelector("#darkbutton")
dark.addEventListener("click", darken, false);

function themex(){ 
  
  var hd = new Date().getHours()
  var dis = hd >= 7 && hd < 18
  if (dis){ brighten()}
  if (!dis){ darken()}
  } 
  setInterval(themex(), 1000)


  // ------------------------------------------------------------------------------------------
  

// DAY MODE

function brighten(){
 
  document.body.style.background = "linear-gradient(whitesmoke, rgb(146, 145, 144))";
  document.querySelector("#navdiv").style.background = "rgba(245, 245, 245, 0.95)";
  document.querySelector("#mainclkmenu").style.background = "whitesmoke";
  
  var spanElements = document.getElementsByTagName("article");
  for (var i = 0; i<spanElements.length; i++){
    spanElements[i].style.color = "rgb(44, 44, 44)"
  };

  var spanElements4 = document.getElementsByTagName("ul");
  for (var i = 0; i<spanElements4.length; i++){
    spanElements4[i].style.color = "rgb(44, 44, 44)"
    
  };

  var spanElementss = document.getElementsByClassName("circles0");
  for (var i = 0; i<spanElementss.length; i++){
    spanElementss[i].style.border = "none"
  };


  var spanElements8 = document.getElementsByTagName("h4");
  for (var i = 0; i<spanElements8.length; i++){
    spanElements8[i].style.color = "rgb(44, 44, 44)"
    spanElements8[i].style.borderColor = "rgb(44, 44, 44)";
  };

  var spanElements5 = document.getElementsByTagName("p");
  for (var i = 0; i<spanElements5.length; i++){
    spanElements5[i].style.color = "rgb(44, 44, 44)"
  };

  document.querySelector("#downdd2").style.background = "linear-gradient(whitesmoke, rgb(146, 145, 144))";
 document.querySelector("#downdd1").style.background = "linear-gradient(whitesmoke, rgb(146, 145, 144))";
 document.querySelector("#downdd2").style.boxShadow = "0.08vw 0.08vw 0.08vw 0.09vw grey";
 document.querySelector("#downdd1").style.boxShadow = "0.08vw 0.08vw 0.08vw 0.09vw grey";
 document.querySelector("#introdiv").style.boxShadow = "0.08vw 0.08vw 0.08vw 0.09vw grey";
 document.querySelector("#navdiv").style.boxShadow = "0.08vw 0.08vw 0.08vw 0.09vw darkGrey";
 document.querySelector("#browserinfo").style.color = "rgb(44, 44, 44)";
 document.querySelector("#browserinfo")

  var spanElements1 = document.querySelectorAll(".day");
  for (var t = 0; t<spanElements1.length; t++){
    spanElements1[t].style.background = "linear-gradient(whitesmoke, rgb(146, 145, 144))";
    spanElements1[t].style.borderTop = 
    'none';
    spanElements1[t].style.color = "rgb(44, 44, 44)";
  }

  document.querySelector("#themedd").style.borderTop = 
  'none'
  document.querySelector("#p1").style.color = 
  'blanchedalmond'
  document.querySelector(".slider").style.background = "rgb(5, 5, 5)";
  
  
}

// -----------------------------------------------------------------------------------------------------------------------------

// DARK MODE

function darken(){ 
    document.body.style.background = "linear-gradient(rgb(54, 53, 53), rgb(17, 17, 17))";
    document.querySelector("#navdiv").style.background = "rgba(44, 44, 44, 0.95)";
    document.querySelector("#mainclkmenu").style.background = "rgba(44, 44, 44, 0.95)";
    
    var spanElements = document.getElementsByTagName("article");
    for (var i = 0; i<spanElements.length; i++){
      spanElements[i].style.color = "blanchedalmond"
    };

    var spanElementss = document.getElementsByClassName("circles0");
    for (var i = 0; i<spanElementss.length; i++){
      spanElementss[i].style.border = "none"
    };
  
    var spanElements4 = document.getElementsByTagName("ul");
    for (var i = 0; i<spanElements4.length; i++){
      spanElements4[i].style.color = "blanchedalmond"
      
    };
  
    var spanElements8 = document.getElementsByTagName("h4");
    for (var i = 0; i<spanElements8.length; i++){
      spanElements8[i].style.color = "blanchedalmond"
      spanElements8[i].style.borderColor = "blanchedalmond";
    };
  
    var spanElements5 = document.getElementsByTagName("p");
    for (var i = 0; i<spanElements5.length; i++){
      spanElements5[i].style.color = "blanchedalmond"
    };
  
    document.querySelector("#downdd2").style.background = "rgba(44, 44, 44, 0.9)";
   document.querySelector("#downdd1").style.background = "rgba(44, 44, 44, 0.9)";
   document.querySelector("#downdd2").style.boxShadow = "0.08vw 0.08vw 0.08vw 0.09vw rgba(25, 25, 25)";
   document.querySelector("#downdd1").style.boxShadow = "0.08vw 0.08vw 0.08vw 0.09vw rgba(25, 25, 25)";
   document.querySelector("#introdiv").style.boxShadow = "0.08vw 0.08vw 0.08vw 0.09vw rgba(25, 25, 25)";
   document.querySelector("#navdiv").style.boxShadow = "0.08vw 0.08vw 0.08vw 0.09vw rgba(25, 25, 25)";
   document.querySelector("#browserinfo").style.color = "blanchedalmond";
  
    var spanElements1 = document.querySelectorAll(".day");
    for (var t = 0; t<spanElements1.length; t++){
      spanElements1[t].style.background = "rgba(44, 44, 44, 0.95)";
      spanElements1[t].style.borderTop = 
      '0.050vw solid rgba(44, 44, 44)';
      spanElements1[t].style.color = "rgb(44, 44, 44)";
    }
    document.querySelector("#themedd").style.borderTop = 
    '0.050vw solid rgba(44, 44, 44)';
    document.querySelector("#p1").style.color = 
  'blanchedalmond';
  document.querySelector(".slider").style.background = "blanchedalmond"
}


// END THEME AUTOMATE


// ________________________________________________________________________________________________________________


// SLIDESHOWS


function slideshowvid(){
 
var v;
var p = document.getElementsByClassName("videoz");
for (v = 0; v < p.length; v++){
  p[v].style.display = "none";
  p[v].style.transition = "ease 2s";
}
myIndex++;
if(myIndex > p.length){myIndex = 1}
p[myIndex - 1].style.display = "block";
p[myIndex - 1].style.transition = "ease 2s"
setTimeout(slideshowvid, 5000);
}


function carousel2() {
  var i;
  var x = document.getElementsByClassName("mySlides2");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}   
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel2, 20000); // Change image every 2 seconds
}


// ________________________________________________________________________________________________________________________

// MENU BUTTON EFFECT: NOT IN USE


function myFunction(x) {
  x.classList.toggle("change");
}

function display(){
  document.getElementById("menubutton").style.display="block"
}

function hide(){
  document.getElementById("menubutton").style.display="none"
}

// ________________________________________________________________________________________________________________


// MAKE THEME DROPDOWN CHANGE 


// ----------------------------------------------------------------------------------------------

const navs = document.querySelector("#theme")
const navs1 = document.querySelector("#deviceinfo")
const navs2 = document.querySelector("#calculator")
const navs3 = document.querySelector("#down");

// ------------------------------------------------------------------------------------


navs.addEventListener("mouseover", themez, false)
navs.addEventListener("mouseleave", themez1, false)

navs1.addEventListener("mouseover", themez2, false)
navs1.addEventListener("mouseleave", themez3, false)

navs2.addEventListener("mouseover", themez4, false)
navs2.addEventListener("mouseleave", themez5, false)

navs3.addEventListener("mouseover", themez6, false)
navs3.addEventListener("mouseleave", themez7, false)


// ------------------------------------------------------------------------------------------------


function themez(){
  document.querySelector(".theme").innerHTML = "Theme&#x2006; &#x25BE;"
}

function themez1(){
  document.querySelector(".theme").innerHTML = "Theme&#x2006; &#x25BF;"
};

function themez2(){
  document.querySelector(".deviceinfo").innerHTML = "Simple&#x2006; &#x25BE;"
}

function themez3(){
  document.querySelector(".deviceinfo").innerHTML = "Simple&#x2006; &#x25BF;"
};

function themez4(){
  document.querySelector(".calculator").innerHTML = "Typing Test&#x2006; &#x25BE;"
}

function themez5(){
  document.querySelector(".calculator").innerHTML = "Typing Test&#x2006; &#x25BF;"
};

function themez6(){
  document.querySelector(".down").innerHTML = "Device Info&#x2006; &#x25BE;"
}

function themez7(){
  document.querySelector(".down").innerHTML = "Device Info&#x2006; &#x25BF;"
};



// END NAV DROPDOWN EFFECTS


// ________________________________________________________________________________________________________________




// __________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


// TYPING TEST

// --------------------------------------------------------------------------

const testw = document.querySelector(".testwrapper");
const testa = document.querySelector("#testzarea");
const origin = document.querySelector("#originztext p").innerHTML;
const reseta = document.querySelector("#reset");
const ttimer = document.querySelector(".timer");

// ---------------------------------------------------------------------------------

testa.addEventListener("keypress", start, false);
testa.addEventListener("keyup", spellCheck, false);
reseta.addEventListener("click", reset, false);

function start() {
  let textEnteredL = testa.value.length;
  // console.log(textEnteredL);
  if (textEnteredL === 0 && !running) {running = true; interval = setInterval (runTimer, 10)};
}

function spellCheck() {
  let textEnteredL = testa.value;

  let textMatch = origin.substring(0, textEnteredL.length);

  if (textEnteredL == origin) {
    clearInterval (interval);
    testa.style.background = "green"
    testa.style.color = "white"
    testw.style.borderColor = "gold";
  } else {
    if (textEnteredL == textMatch) {
      testa.style.background = "lightblue"
      testa.style.color = "blue"
      testw.style.borderColor = "lightblue"
    } else {
        testa.style.background = "red"
        testa.style.color = "white"
        testw.style.borderColor = "black"}
  }
}

var interval ;

function reset (){
clearInterval(interval);
interval = null;
time = [0,0,0,0];
running = false;

testa.value = "";
ttimer.innerHTML = "00:00:00"
testa.style.background = "white"
testw.style.borderColor = "grey";
}

function lead(timer){
if (timer <= 9) {
timer =  "0" + timer;
}
return timer;
}

function runTimer(){
let currentTime = lead(time[0]) + ":" + lead(time[1]) + ":" + lead(time [2]);
ttimer.innerHTML = currentTime;
time[3]++

time[0] = Math.floor((time[3]/100)/60);
time[1] = Math.floor((time[3]/100) - (time[0]*60));
time[2] = Math.floor(time[3] - (time[1]*100) - (time[0]*6000));
}

// ----------------------------------------------------------------------------------------


// TYPING TEST ENDS!


// ________________________________________________________________________________________________________________




// __________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

// UNNAMED FUNCTION
// ----------------------------------------------------------


var sets = setInterval(glowd, 2500)
sets
function glowd (){setTimeout(disgress, 100)



function disgress(){
    // document.getElementById("slide").style.borderTop =  "0.1vw solid grey";
    document.getElementById("slide").style.background =  "lightyellow";    
    // document.getElementById("slide").style.borderBottom =  "0.1vw solid grey";
    document.getElementById("slide").style.transition = "ease 0.9s"
}

setTimeout(disgress1, 700)
function disgress1(){
    document.getElementById("slide").style.background =  "transparent";  
    // document.getElementById("slide").style.borderTop =  "0.0000000000000001vw solid transparent"
    // document.getElementById("slide").style.borderBottom =  "0.0000000000000001vw solid transparent"   
    document.getElementById("slide").style.transition = "ease 0.9s"
}}

const cncle = document.getElementById("slide")

cncle.addEventListener("mouseover", function(){
    clearInterval(sets)
}, false)


const fioc = document.getElementById("deviceinfodd");
fioc.addEventListener("mouseenter", rox, false)
fioc.addEventListener("mouseleave", stopx, false)

var fioa = document.getElementsByClassName("videoz1")

const entx = document.getElementsByTagName("video")[0, 1 , 2]
entx.addEventListener("mouseleave", stopx, false)


function rox (){
    for (var i = 0; i < fioa.length; i++) {
        fioa[i].play()
    }
}

function stopx(){
    for(var i =  0; i < fioa.length; i++){
        fioa[i].pause()
    }
}
        
// _______________________________________________________________________________________________________________________________ 




// __________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

// VIDEO PLAY ON HOVER

var vid;
var vid1;
function initialize (){
    vid = document.getElementsByClassName("videoz2");
    vid1 = document.getElementsByClassName("videoz");

    for (var i = 0; i < vid1.length; i++){
      vid1[i].addEventListener("click", playedpausedd, false)
      }
    
    for (var i = 0; i < vid.length; i++){
        vid[i].addEventListener("mouseleave", superpaused, false)
        }

    for (var i = 0; i < vid.length; i++){
    vid[i].addEventListener("click", playedpaused, false)
    }

    for (var i = 0; i < vid.length; i++){
    vid[i].addEventListener("dblclick", fullscreened, false)
}
}

window.onload = initialize();

function playedpaused(){
    for (var i = 0; i < vid.length; i++){
    if(vid[i].paused){
        vid[i].play()
    } else {
        vid[i].pause()
    }
}
}

function playedpausedd(){
  for (var i = 0; i < vid1.length; i++){
  if(vid1[i].paused){
      vid1[i].play()
  } else {
      vid1[i].pause()
  }
}
}

function superpaused(){
    for(var i = 0; i < vid.length; i++){
        vid[i].pause()
    }
}

function fullscreened(){
    for (var i = 0; i < vid.length; i++){
    if(vid[i].requestFullScreen){
		vid[i].requestFullScreen();
	} else if(vid[i].webkitRequestFullScreen){
		vid[i].webkitRequestFullScreen();
	} else if(vid[i].mozRequestFullScreen){
		vid[i].mozRequestFullScreen();
	}
}
}

// VIDEO PLAYBACK ENDS HERE

// _______________________________________________________________________________________________________________________________



// __________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

// POP UP VIDEO TEXT

var intervalvar = setInterval(settimerforpopup, 22000);
var bigvideodiv = document.getElementById("bigvideodiv");


bigvideodiv.addEventListener("mouseenter", settimerforpopup, false);

bigvideodiv.addEventListener("click", offtext1, false);


function settimerforpopup(){
  setTimeout(changetext1, 2000);
  setTimeout(changetext2, 8000);
  setTimeout(offtext, 14000);
    intervalvar
}

function changetext1(){
    document.getElementById("controltext").style.transition = "ease 1s"
    document.getElementById("controltext").innerHTML = "Click to toggle play..."
}

function changetext2(){
  document.getElementById("controltext").style.transition = "ease 1s"
  document.getElementById("controltext").innerHTML = "Double click to toggle fullscreen..." 
}

function offtext(){
  document.getElementById("controltext").style.transition = "ease 1s"
  document.getElementById("controltext").innerHTML = " " 
}

function offtext1(){
  document.getElementById("controltext").style.transition = "ease 1s"
  document.getElementById("controltext").innerHTML = " " 
  clearInterval(intervalvar);
  
}

// END OF POP UP VID TEXT

// ___________________________________________________________________________________________________________________________________




// __________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

// RUN THE CLOCK

const resetb = document.getElementsByClassName("mySlides");
const menudd = document.querySelector(".navdivs");
const HOURHAND = document.querySelector("#hourhand");
const MINUTEHAND = document.querySelector("#minutehnd");
const SECONDHAND = document.querySelector("#secondarm");
const SECONDHANDS = document.querySelector("#seccc");
const DATE = document.querySelector("#datebox");

// const SECTRAD = document.querySelector("#trad");
// const SECLEG = document.querySelector("#legacy");

// --------------------------------------------------------------------------------------------

var date = new Date();
// console.log(date);
let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
let dt = date.getDate();

if(dt<10) {
    dt = "0"+dt
  }
  
  let hrPosition = (hr*360/12)+(min*(360/60)/12);
  let minPosition = (min*360/60)+(sec*(360/60)/60);
  let secPosition = sec*360/60;
  let dtPosition = dt
  

function runTheClock() {
    if(hr >= 12 ){
      document.querySelector("#ampm").innerHTML = "PM";
      document.querySelector("#ampm").style.fill = "#defcf9ff";
      document.querySelector("#ampm").style.stroke = "#000000ff"
    }
    if(hr < 12 ){
     document.querySelector("#ampm").innerHTML = "AM"
     document.querySelector("#ampm").style.fill = "white";
     document.querySelector("#ampm").style.stroke = "black"
   }
 
     hrPosition = hrPosition+(3/360);
     minPosition = minPosition+(6/60);
     secPosition = secPosition+6;
     dtPosition = dt;
 
     HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
     MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
     SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
     SECONDHANDS.style.transform = "rotate(" + secPosition + "deg)";
 }
 setInterval(runTheClock, 1000);

 
//  CLOCK FUNCTION ENDS HERE
//  ___________________________________________________________________________________________________________________________________




// __________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

// // RANGE SLIDERS
// ____________________

// ------------------------------------------------------------------------------------------------------

// WHEN RANGE IS 0


var slider = document.getElementById("myRange");

slider.addEventListener('click', function() {
  if (this.value <= 1) {
    document.querySelector("#videotitle").style.transition = "ease 0.5s";
    document.querySelector("#videotitle").style.opacity = "0";
    document.getElementById("videotitle").style.fontSize = "0vw";

      setTimeout(videozz1, 1000)

      function videozz1(){
      document.querySelector(".videoz4").style.height = "0vh";
      document.querySelector(".videoz4").style.transition = "ease 1s";
            
      }

      setTimeout(curtain2, 2500)

      function curtain2(){
        document.getElementById("curtain").style.width = "0vw";
        // document.getElementById("curtain").style.width = "97vw";
        document.getElementById("curtain").style.transition = "ease 2s";
      }

      setTimeout(curtain1, 3500)

      function curtain1(){
        document.getElementById("curtain").style.height = "0vh";
        // document.getElementById("curtain").style.width = "97vw";
        document.getElementById("curtain").style.transition = "ease 2s";
        document.querySelector("#videotitle").style.display = "none";
      }

  }
})


//---------------------------------------------------------------------------------------------------------


// WHEN RANGE IS 100


var slide = document.getElementById("myRange");

slide.addEventListener('click', function() {
  if (this.value > 99) {
      document.getElementById("curtain").style.height = "80vh";
      
      document.getElementById("curtain").style.transition = "ease 1s";

      setTimeout(curt, 1000)

      function curt(){
        document.getElementById("curtain").style.width = "97vw";
        // document.getElementById("curtain").style.width = "97vw";
        document.getElementById("curtain").style.transition = "ease 1s";
        
      }

      setTimeout(videozz, 2500)

      function videozz(){
      
      // document.querySelector(".videoz4").style.width = "70vw";
      document.querySelector(".videoz4").style.transition = "ease 2s";
      
      document.getElementById("videotitle").style.fontSize = "1vw";
      // document.getElementById("videotitle").style.width = "5vh";
      document.querySelector(".videoz4").style.height = "60vh";
      document.querySelector("#videotitle").style.transition = "ease 2s";
      
      document.querySelector("#videotitle").style.display = "block";
      }

      setTimeout(texts, 4600)

      function texts(){
        document.querySelector("#videotitle").style.opacity = "1";
        document.getElementById("videotitle").style.fontSize = "1vw";
        // document.querySelector("#videotitle").style.display = "block";
        // document.querySelector("videotitle").style.width = "5vw";
      }

  }
})


// RANGE SLIDERS ENDS HERE
// ___________________________________________________________________________________________________________________________________




// __________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

// DEVICE INFO FUNCTIONS
// _________________________



function browswerinfo(){
  document.getElementById("demo").innerHTML = "Browser Version:  " + navigator.userAgent;

 if(!navigator.online){document.getElementById("demo1").innerHTML =
 "Browser Status:  " + "Offline"};
 if(navigator.online){document.getElementById("demo1").innerHTML =
 "Browser Status:  " + "Online"};

  document.getElementById("demo2").innerHTML =
  "Browser Language:  " + navigator.language;

 if(!navigator.cookieEnabled){document.getElementById("demo3").innerHTML =
 "Cookie Enabled?  " + " No"} ;
 if(navigator.cookieEnabled){document.getElementById("demo3").innerHTML =
 "Cookie Enabled?  " + " Yes"} ;

 if(!navigator.javaEnabled){document.getElementById("demo4").innerHTML =
 "Java Enabled?  " + " No"} ;
 if(navigator.javaEnabled){document.getElementById("demo4").innerHTML =
 "Java Enabled?  " + " Yes"} ;
  
  setInterval(browswerinfo, 150000);
}

function isMobile() {
  var check = false;
  (function(a){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
      check = true;
  })(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function deviceinfo(){
  if(!isMobile()){
    document.getElementById("demo5").innerHTML = "You are using a Computer."
  };
  if(isMobile()){
    document.getElementById("demo5").innerHTML = "You are using a Mobile Device."
  };

  document.getElementById("demo6").innerHTML = "You have " + navigator.deviceMemory + "GB of RAM Allocated";
};

function runsd(){
  var deviceName = '';

  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      Datalogic: function() {
          return navigator.userAgent.match(/DL-AXIS/i);
      },
      Bluebird: function() {
          return navigator.userAgent.match(/EF500/i);
      },
      Honeywell: function() {
          return navigator.userAgent.match(/CT50/i);
      },
      Zebra: function() {
          return navigator.userAgent.match(/TC70|TC55/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (isMobile.Datalogic() || isMobile.Bluebird() || isMobile.Honeywell() || isMobile.Zebra() || isMobile.BlackBerry() || isMobile.Android() || isMobile.iOS() || isMobile.Windows());
      }
  };

  if (isMobile.Datalogic()){
    document.getElementById("demo6").innerHTML = "Device Type: DataLogic"
  }
  else if (isMobile.Bluebird())
  {
    document.getElementById("demo6").innerHTML = "Device Type: Bluebird"
  }
  else if (isMobile.Honeywell())
  {
    document.getElementById("demo6").innerHTML = "Device Type: Honeywell"
  }
  else if (isMobile.Zebra())
  {
    document.getElementById("demo6").innerHTML = "Device Type: Zebra"
  }
  else if (isMobile.BlackBerry())
  {
    document.getElementById("demo6").innerHTML = "Device Type: Blackberry"
  }
  else if (isMobile.iOS())
  {
    document.getElementById("demo6").innerHTML = "Device Type: Apple"
  }
  else if ((deviceName == '') && (isMobile.Android()))
  {
    document.getElementById("demo6").innerHTML = "Device Type: Andriod"
  }
  else if ((deviceName == '') && (isMobile.Windows()))
  {
    document.getElementById("demo6").innerHTML = "Device Type: Windows"
  }
  return deviceName;
};

// DEVICE INFO ENDS HERE
// ___________________________________________________________________________________________________________________________________




// __________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

// BATTERY FUNCTIONS


navigator.getBattery().then(function(battery) {
  function updateAllBatteryInfo(){
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
      }

  document.getElementById("demo7").innerHTML = "Battery Level is Currently " + Math.floor(battery.level*100)+"%" ;
  

  battery.addEventListener('chargingchange', function(){
    updateChargeInfo();
  });
  function updateChargeInfo(){
    
    if(battery.charging){
    document.querySelector("#ssss").style.fill="black"; 
    document.querySelector("#ssss").style.transition = "ease 2s";
    document.querySelector("#ssss").style.stroke="black";

    document.getElementById("demo8").innerHTML = "Battery is Charging";

  }
    if(!battery.charging){
      document.querySelector("#ssss").style.fill="none";
      document.querySelector("#ssss").style.stroke="none"
      document.querySelector("#ssss").style.transition = "ease 0.2s";

      document.getElementById("demo8").innerHTML = "Battery is Not Charging";
    }
  }
  updateChargeInfo()

  battery.addEventListener('levelchange', function() {
    updateLevelInfo();
  });
  function updateLevelInfo(){
    document.getElementById("demo7").innerHTML = "Battery Level is Currently " + Math.floor(battery.level*100)+"%" ;
    if(battery.level*100 > 99){
      document.getElementById("demo7").innerHTML = "Battery is Fully Charged"  
    document.querySelector("#batterybox").style.fill = "19e42f";
    document.querySelector("#batteryboxtop").style.fill ="19e42f";
    document.querySelector("#per100").style.fill = "19e42f";
    document.querySelector("#per75").style.fill = "19e42f";
    document.querySelector(" #per25").style.fill = "19e42f";
    document.querySelector("#per25").style.fill = "19e42f";
    document.querySelector("#per100").style.transition = "ease 1s";
    document.querySelector("#per75").style.transition = "ease 1s";
    document.querySelector(" #per25").style.transition = "ease 1s";
    document.querySelector("#per25").style.transition = "ease 1s";
    document.querySelector("#batterybox").style.transition = "ease 1s";
    document.querySelector("#batteryboxtop").style.transition = "ease 1s"
    } 
  }

  if(battery.level*100 === 100){
    document.querySelector("#batterybox").style.fill = "19e42f";
    document.querySelector("#batteryboxtop").style.fill ="19e42f";
    document.querySelector("#per100").style.fill = "19e42f";
    document.querySelector("#per75").style.fill = "19e42f";
    document.querySelector(" #per25").style.fill = "19e42f";
    document.querySelector("#per25").style.fill = "19e42f";
    document.querySelector("#per100").style.transition = "ease 1s";
    document.querySelector("#per75").style.transition = "ease 1s";
    document.querySelector(" #per25").style.transition = "ease 1s";
    document.querySelector("#per25").style.transition = "ease 1s";
    document.querySelector("#batterybox").style.transition = "ease 1s";
    document.querySelector("#batteryboxtop").style.transition = "ease 1s"
  } 
  if(battery.level*100 >= 95 && battery.level*100 < 100){
    document.querySelector("#batterybox").style.fill = "19e42f";
    document.querySelector("#batteryboxtop").style.fill ="ffffff";
    document.querySelector("#per100").style.fill = "19e42f";
    document.querySelector("#per75").style.fill = "19e42f";
    document.querySelector(" #per25").style.fill = "19e42f";
    document.querySelector("#per25").style.fill = "19e42f";
    document.querySelector("#per100").style.transition = "ease 1s";
    document.querySelector("#per75").style.transition = "ease 1s";
    document.querySelector(" #per25").style.transition = "ease 1s";
    document.querySelector("#per25").style.transition = "ease 1s";
    document.querySelector("#batterybox").style.transition = "ease 1s";
    document.querySelector("#batteryboxtop").style.transition = "ease 1s"
  } 
  if(battery.level*100 >= 90 && battery.level*100 < 95){
    document.querySelector("#batterybox").style.fill = "ffffff";
    document.querySelector("#batteryboxtop").style.fill ="ffffff";
    document.querySelector("#per100").style.fill = "19e42f";
    document.querySelector("#per75").style.fill = "19e42f";
    document.querySelector(" #per25").style.fill = "19e42f";
    document.querySelector("#per25").style.fill = "19e42f";
    document.querySelector("#per100").style.transition = "ease 1s";
    document.querySelector("#per75").style.transition = "ease 1s";
    document.querySelector(" #per25").style.transition = "ease 1s";
    document.querySelector("#per25").style.transition = "ease 1s";
    document.querySelector("#batterybox").style.transition = "ease 1s";
    document.querySelector("#batteryboxtop").style.transition = "ease 1s"
  } 
  if(battery.level*100 >= 75 && battery.level*100 < 95){
    document.querySelector("#batterybox").style.fill = "ffffff";
    document.querySelector("#batteryboxtop").style.fill ="ffffff";
    document.querySelector("#per100").style.fill = "19e42f";
    document.querySelector("#per75").style.fill = "19e42f";
    document.querySelector(" #per25").style.fill = "19e42f";
    document.querySelector("#per25").style.fill = "19e42f";
    document.querySelector("#per100").style.transition = "ease 1s";
    document.querySelector("#per75").style.transition = "ease 1s";
    document.querySelector(" #per25").style.transition = "ease 1s";
    document.querySelector("#per25").style.transition = "ease 1s";
    document.querySelector("#batterybox").style.transition = "ease 1s";
    document.querySelector("#batteryboxtop").style.transition = "ease 1s"
  } 
  if(battery.level*100 >= 50 && battery.level*100 < 75){
    document.querySelector("#batterybox").style.fill = "ffffff";
    document.querySelector("#batteryboxtop").style.fill ="ffffff";
    document.querySelector("#per100").style.fill = "ffffff";
    document.querySelector("#per75").style.fill = "19e42f";
    document.querySelector(" #per25").style.fill = "19e42f";
    document.querySelector("#per25").style.fill = "19e42f";
    document.querySelector("#per100").style.transition = "ease 1s";
    document.querySelector("#per75").style.transition = "ease 1s";
    document.querySelector(" #per25").style.transition = "ease 1s";
    document.querySelector("#per25").style.transition = "ease 1s";
    document.querySelector("#batterybox").style.transition = "ease 1s";
    document.querySelector("#batteryboxtop").style.transition = "ease 1s"
  } 
  if(battery.level*100 >= 25 && battery.level*100 < 50){
    document.querySelector("#batterybox").style.fill = "ffffff";
    document.querySelector("#batteryboxtop").style.fill ="ffffff";
    document.querySelector("#per100").style.fill = "ffffff";
    document.querySelector("#per75").style.fill = "ffffff";
    document.querySelector(" #per25").style.fill = "19e42f";
    document.querySelector("#per25").style.fill = "19e42f";
    document.querySelector("#per100").style.transition = "ease 1s";
    document.querySelector("#per75").style.transition = "ease 1s";
    document.querySelector(" #per25").style.transition = "ease 1s";
    document.querySelector("#per25").style.transition = "ease 1s";
    document.querySelector("#batterybox").style.transition = "ease 1s";
    document.querySelector("#batteryboxtop").style.transition = "ease 1s"
  } 
  if(battery.level*100 >= 25 && battery.level*100 < 50){
    document.querySelector("#batterybox").style.fill = "ffffff";
    document.querySelector("#batteryboxtop").style.fill ="ffffff";
    document.querySelector("#per100").style.fill = "ffffff";
    document.querySelector("#per75").style.fill = "ffffff";
    document.querySelector(" #per25").style.fill = "19e42f";
    document.querySelector("#per25").style.fill = "19e42f";
    document.querySelector("#per100").style.transition = "ease 1s";
    document.querySelector("#per75").style.transition = "ease 1s";
    document.querySelector(" #per25").style.transition = "ease 1s";
    document.querySelector("#per25").style.transition = "ease 1s";
    document.querySelector("#batterybox").style.transition = "ease 1s";
    document.querySelector("#batteryboxtop").style.transition = "ease 1s"
  } 
  if(battery.level*100 >= 15 && battery.level*100 < 25){
    document.querySelector("#batterybox").style.fill = "ffffff";
    document.querySelector("#batteryboxtop").style.fill ="ffffff";
    document.querySelector("#per100").style.fill = "ffffff";
    document.querySelector("#per75").style.fill = "ffffff";
    document.querySelector(" #per25").style.fill = "ffffff";
    document.querySelector("#per25").style.fill = "19e42f";
    document.querySelector("#per100").style.transition = "ease 1s";
    document.querySelector("#per75").style.transition = "ease 1s";
    document.querySelector(" #per25").style.transition = "ease 1s";
    document.querySelector("#per25").style.transition = "ease 1s";
    document.querySelector("#batterybox").style.transition = "ease 1s";
    document.querySelector("#batteryboxtop").style.transition = "ease 1s"
  } 
  if(battery.level*100 <= 20){
    document.querySelector("#batterybox").style.fill = "ffffff";
    document.querySelector("#batteryboxtop").style.fill ="red";
    document.querySelector("#per100").style.fill = "ffffff";
    document.querySelector("#per75").style.fill = "ffffff";
    document.querySelector(" #per25").style.fill = "ffffff";
    document.querySelector("#per25").style.fill = "red";
    document.querySelector("#per100").style.transition = "ease 1s";
    document.querySelector("#per75").style.transition = "ease 1s";
    document.querySelector(" #per25").style.transition = "ease 1s";
    document.querySelector("#per25").style.transition = "ease 1s";
    document.querySelector("#batterybox").style.transition = "ease 1s";
    document.querySelector("#batteryboxtop").style.transition = "ease 1s"
  } 
});

// BATTERY FUNCTIONS ENDS HERE
// ___________________________________________________________________________________________________________________________________




// __________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

// SHOW DATE
 
function dateshow(){
  const daysnames = [
    "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"
];

const d = new Date();

  var datez = new Date(),

   dayw = datez.getDay(),
   datew = datez.getDate(),
  
  datew = addZero(datew);

  document.getElementById("datetxt").innerHTML = daysnames[d.getDay()]; 
  document.getElementById("sssss").innerHTML = " " + datew
}

function addZero(val){
  return (val <=9) ? ("0" + val) : val;
}


// DATE ENDS HERE
//   _________________________________________________________________________________________________________________________________