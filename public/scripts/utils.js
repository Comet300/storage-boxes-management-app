//CHANGE FLOORS SYSTEM!

var parentLocation=window.location.href;
parentLocation=parentLocation.split("/");
parentLocation=parentLocation[parentLocation.length-1];
parentLocation=parentLocation.split("?");
parentLocation=parentLocation[0];

var floors = [{
  panZoomObject: "",
  domObject: document.getElementById("parter"),
  label: "parter"
}, {
  panZoomObject: "",
  domObject: document.getElementById("etaj"),
  label: "etaj"
}];
var floor = 0;

window.mobilecheck = (function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
})();

function nextfloor(floor) {
  if (isNaN(floor))
    return;

  let range = floors.length - 1;
  if (floor + 1 > range)
    return 0;
  return floor + 1;
}

function prevfloor(floor) {
  if (isNaN(floor))
    return;

  let range = floors.length - 1;
  if (floor - 1 < 0)
    return range;
  return floor - 1;
}


window.addEventListener('load', (e) => {
  var eventsHandler;
  eventsHandler = {
    haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
    init: function (options) {
      var instance = options.instance,
        initialScale = 1,
        pannedX = 0,
        pannedY = 0
      // Init Hammer
      // Listen only for pointer and touch events
      this.hammer = Hammer(options.svgElement, {
        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
      })
      // Enable pinch
      this.hammer.get('pinch').set({
        enable: true
      })
      // Handle pan
      this.hammer.on('panstart panmove', function (ev) {
        // On pan start reset panned variables
        if (ev.type === 'panstart') {
          pannedX = 0
          pannedY = 0
        }
        // Pan only the difference
        instance.panBy({
          x: ev.deltaX - pannedX,
          y: ev.deltaY - pannedY
        })
        pannedX = ev.deltaX
        pannedY = ev.deltaY
      })
      // Handle pinch
      this.hammer.on('pinchstart pinchmove', function (ev) {
        // On pinch start remember initial zoom
        if (ev.type === 'pinchstart') {
          initialScale = instance.getZoom()
          instance.zoomAtPoint(initialScale * ev.scale, {
            x: ev.center.x,
            y: ev.center.y
          })
        }
        instance.zoomAtPoint(initialScale * ev.scale, {
          x: ev.center.x,
          y: ev.center.y
        })
      })
      // Prevent moving the page on some devices when panning over SVG
      options.svgElement.addEventListener('touchmove', function (e) {
        e.preventDefault();
      });
    },
    destroy: function () {
      this.hammer.destroy()
    }
  }

  window.panZoom = floors[0].panZoomObject = svgPanZoom('#parter', {
    zoomEnabled: true,
    controlIconsEnabled: false,
    fit: 1,
    center: 1,
    contain :1,
    dblClickZoomEnabled: false,
    preventMouseEventsDefault: false,
    customEventsHandler: eventsHandler
  });

  window.panZoom = floors[1].panZoomObject = svgPanZoom('#etaj', {
    zoomEnabled: true,
    controlIconsEnabled: false,
    fit: 1,
    center: 1,
    contain :1,
    dblClickZoomEnabled: false,
    preventMouseEventsDefault: false,
    customEventsHandler: eventsHandler
  });
})

window.onresize = () => {
  let container = document.querySelector(".container");
  container.classList.remove("container");
  container.classList.add("container");

  var object = floors[floor].panZoomObject;
  object.resize();
  object.fit();
  object.center();



};

document.querySelector(".reset").addEventListener("click", () => {
  var object = floors[floor].panZoomObject;
  object.resetZoom();
  object.resetPan();

  if(window.innerWidth<481){
    floors[floor].panZoomObject.zoomOut()
  }

  if(parentLocation=="hala3"){
    if(window.innerWidth<1800)
    floors[floor].panZoomObject.zoomOut()
  }

});

document.querySelector(".plus").addEventListener("click", () => {
  floors[floor].panZoomObject.zoomBy(1.2);
});

document.querySelector(".minus").addEventListener("click", () => {
  floors[floor].panZoomObject.zoomBy(0.9);
});

document.querySelector(".up .control").addEventListener("click", () => {
  let prev = floors[floor].domObject;
  floor = nextfloor(floor);
  let next = floors[floor].domObject;
  prev.classList.add("hide");
  next.classList.remove("hide");


  let object = floors[floor].panZoomObject;
  object.resetZoom();
  object.resetPan();

  object.resize();
  object.fit();
  object.center();

  let text = document.getElementById("levelLabel");
  text.textContent = floors[floor].label;


  if(window.innerWidth<481){
    floors[floor].panZoomObject.zoomOut()
  }
  if(parentLocation=="hala3"){
    if(window.innerWidth<1800)
    floors[floor].panZoomObject.zoomOut()
  }
});

document.querySelector(".down .control").addEventListener("click", () => {
  let prev = floors[floor].domObject;
  floor = prevfloor(floor);
  let next = floors[floor].domObject;
  prev.classList.add("hide");
  next.classList.remove("hide");

  let object = floors[floor].panZoomObject;
  object.resetZoom();
  object.resetPan();

  object.resize();
  object.fit();
  object.center();

  let text = document.getElementById("levelLabel");
  text.textContent = floors[floor].label;


  if(window.innerWidth<481){
    floors[floor].panZoomObject.zoomOut()
    if(parentLocation=="hala3"){
      if(window.innerWidth<1800)
      floors[floor].panZoomObject.zoomOut()
    }
  }
});






//===========================================

var element1 = floors[0].domObject;
var element2 = floors[1].domObject;
var flag = 0;

element1.addEventListener("mousedown", function () {
  flag = 0;
}, false);

element1.addEventListener("mousemove", function () {
  flag = 1;
}, false);

element2.addEventListener("mousedown", function () {
  flag = 0;
}, false);

element2.addEventListener("mousemove", function () {
  flag = 1;
}, false);


var value;
$(".boxa-ocupata, .boxa-libera").click(function () {
  if (flag === 0) {
    document.querySelector("#inputBoxa").value = $(this)[0].nextElementSibling.textContent;
    document.querySelector("#selectForm").setAttribute("action", "/"+parentLocation+"/view/" + String($(this)[0].nextElementSibling.textContent).replace(' ', ''));
    document.querySelector("#selectForm").submit();

    if (window.innerWidth <= 1280) {
      document.querySelector(".menu").style.display = "block";
      document.querySelector(".menuButton").classList.add("change")
    }

  }
});

document.querySelector(".menuButton").addEventListener("click", (e) => {
  e.target.classList.toggle("change")
  if (e.target.classList.contains("change"))
    document.querySelector(".menu").style.display = "block";
  else {
    document.querySelector(".menu").style.display = "none";
  }
})

window.addEventListener("load",()=>{
  if(window.innerWidth<481){
    floors[floor].panZoomObject.zoomOut()
  }
  if(parentLocation=="hala3"){
    if(window.innerWidth<1800)
    floors[floor].panZoomObject.zoomOut()
  }
})


$(document).keydown(function(event) {
  if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
          event.preventDefault();
       }
      // 107 Num Key  +
      // 109 Num Key  -
      // 173 Min Key  hyphen/underscor Hey
      // 61 Plus key  +/= key
  });
  
  $(window).bind('mousewheel DOMMouseScroll', function (event) {
         if (event.ctrlKey == true) {
         event.preventDefault();
         }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('h');
  if (myParam){
    document.querySelector("iframe").contentWindow.location.assign(`/${window.location.pathname.split("/")[1]}/view/${myParam}`);
    if (window.innerWidth <= 1280) {
      document.querySelector(".menu").style.display = "block";
      document.querySelector(".menuButton").classList.add("change")
    }
  }