var parentLocation=window.location.href;parentLocation=parentLocation.split("/");parentLocation=parentLocation[parentLocation.length-1];parentLocation=parentLocation.split("?");parentLocation=parentLocation[0];var floors=[{panZoomObject:"",domObject:document.getElementById("parter"),label:"parter"},{panZoomObject:"",domObject:document.getElementById("etaj"),label:"etaj"}];var floor=0;
window.mobilecheck=function(){var check=false;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,
4)))check=true})(navigator.userAgent||navigator.vendor||window.opera);return check}();function nextfloor(floor){if(isNaN(floor))return;var range=floors.length-1;if(floor+1>range)return 0;return floor+1}function prevfloor(floor){if(isNaN(floor))return;var range=floors.length-1;if(floor-1<0)return range;return floor-1}
window.addEventListener("load",function(e){var eventsHandler;eventsHandler={haltEventListeners:["touchstart","touchend","touchmove","touchleave","touchcancel"],init:function(options){var instance=options.instance,initialScale=1,pannedX=0,pannedY=0;this.hammer=Hammer(options.svgElement,{inputClass:Hammer.SUPPORT_POINTER_EVENTS?Hammer.PointerEventInput:Hammer.TouchInput});this.hammer.get("pinch").set({enable:true});this.hammer.on("panstart panmove",function(ev){if(ev.type==="panstart"){pannedX=0;pannedY=
0}instance.panBy({x:ev.deltaX-pannedX,y:ev.deltaY-pannedY});pannedX=ev.deltaX;pannedY=ev.deltaY});this.hammer.on("pinchstart pinchmove",function(ev){if(ev.type==="pinchstart"){initialScale=instance.getZoom();instance.zoomAtPoint(initialScale*ev.scale,{x:ev.center.x,y:ev.center.y})}instance.zoomAtPoint(initialScale*ev.scale,{x:ev.center.x,y:ev.center.y})});options.svgElement.addEventListener("touchmove",function(e){e.preventDefault()})},destroy:function(){this.hammer.destroy()}};window.panZoom=floors[0].panZoomObject=
svgPanZoom("#parter",{zoomEnabled:true,controlIconsEnabled:false,fit:1,center:1,contain:1,dblClickZoomEnabled:false,preventMouseEventsDefault:false,customEventsHandler:eventsHandler});window.panZoom=floors[1].panZoomObject=svgPanZoom("#etaj",{zoomEnabled:true,controlIconsEnabled:false,fit:1,center:1,contain:1,dblClickZoomEnabled:false,preventMouseEventsDefault:false,customEventsHandler:eventsHandler})});
window.onresize=function(){var container=document.querySelector(".container");container.classList.remove("container");container.classList.add("container");var object=floors[floor].panZoomObject;object.resize();object.fit();object.center()};document.querySelector(".reset").addEventListener("click",function(){var object=floors[floor].panZoomObject;object.resetZoom();object.resetPan();if(window.innerWidth<481)floors[floor].panZoomObject.zoomOut();if(parentLocation=="hala3")if(window.innerWidth<1800)floors[floor].panZoomObject.zoomOut()});
document.querySelector(".plus").addEventListener("click",function(){floors[floor].panZoomObject.zoomBy(1.2)});document.querySelector(".minus").addEventListener("click",function(){floors[floor].panZoomObject.zoomBy(.9)});
document.querySelector(".up .control").addEventListener("click",function(){var prev=floors[floor].domObject;floor=nextfloor(floor);var next=floors[floor].domObject;prev.classList.add("hide");next.classList.remove("hide");var object=floors[floor].panZoomObject;object.resetZoom();object.resetPan();object.resize();object.fit();object.center();var text=document.getElementById("levelLabel");text.textContent=floors[floor].label;if(window.innerWidth<481)floors[floor].panZoomObject.zoomOut();if(parentLocation==
"hala3")if(window.innerWidth<1800)floors[floor].panZoomObject.zoomOut()});
document.querySelector(".down .control").addEventListener("click",function(){var prev=floors[floor].domObject;floor=prevfloor(floor);var next=floors[floor].domObject;prev.classList.add("hide");next.classList.remove("hide");var object=floors[floor].panZoomObject;object.resetZoom();object.resetPan();object.resize();object.fit();object.center();var text=document.getElementById("levelLabel");text.textContent=floors[floor].label;if(window.innerWidth<481){floors[floor].panZoomObject.zoomOut();if(parentLocation==
"hala3")if(window.innerWidth<1800)floors[floor].panZoomObject.zoomOut()}});var element1=floors[0].domObject;var element2=floors[1].domObject;var flag=0;element1.addEventListener("mousedown",function(){flag=0},false);element1.addEventListener("mousemove",function(){flag=1},false);element2.addEventListener("mousedown",function(){flag=0},false);element2.addEventListener("mousemove",function(){flag=1},false);var value;
$(".boxa-ocupata, .boxa-libera").click(function(){if(flag===0){document.querySelector("#inputBoxa").value=$(this)[0].nextElementSibling.textContent;document.querySelector("#selectForm").setAttribute("action","/"+parentLocation+"/view/"+String($(this)[0].nextElementSibling.textContent).replace(" ",""));document.querySelector("#selectForm").submit();if(window.innerWidth<=1280){document.querySelector(".menu").style.display="block";document.querySelector(".menuButton").classList.add("change")}}});
document.querySelector(".menuButton").addEventListener("click",function(e){e.target.classList.toggle("change");if(e.target.classList.contains("change"))document.querySelector(".menu").style.display="block";else document.querySelector(".menu").style.display="none"});window.addEventListener("load",function(){if(window.innerWidth<481)floors[floor].panZoomObject.zoomOut();if(parentLocation=="hala3")if(window.innerWidth<1800)floors[floor].panZoomObject.zoomOut()});
$(document).keydown(function(event){if(event.ctrlKey==true&&(event.which=="61"||event.which=="107"||event.which=="173"||event.which=="109"||event.which=="187"||event.which=="189"))event.preventDefault()});$(window).bind("mousewheel DOMMouseScroll",function(event){if(event.ctrlKey==true)event.preventDefault()});var urlParams=new URLSearchParams(window.location.search);var myParam=urlParams.get("h");
if(myParam){document.querySelector("iframe").contentWindow.location.assign("/"+window.location.pathname.split("/")[1]+"/view/"+myParam);if(window.innerWidth<=1280){document.querySelector(".menu").style.display="block";document.querySelector(".menuButton").classList.add("change")}};
//----
(function(){function h(g,m,f){function c(a,e){if(!m[a]){if(!g[a]){var l="function"==typeof require&&require;if(!e&&l)return l(a,!0);if(b)return b(a,!0);l=Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l;}l=m[a]={exports:{}};g[a][0].call(l.exports,function(b){return c(g[a][1][b]||b)},l,l.exports,h,g,m,f)}return m[a].exports}for(var b="function"==typeof require&&require,a=0;a<f.length;a++)c(f[a]);return c}return h})()({1:[function(h,g,m){var f=h("./svg-utilities");g.exports={enable:function(c){var b=
c.svg.querySelector("defs");b||(b=document.createElementNS(f.svgNS,"defs"),c.svg.appendChild(b));if(!b.querySelector("style#svg-pan-zoom-controls-styles")){var a=document.createElementNS(f.svgNS,"style");a.setAttribute("id","svg-pan-zoom-controls-styles");a.setAttribute("type","text/css");a.textContent=".svg-pan-zoom-control { cursor: pointer; fill: black; fill-opacity: 0.333; } .svg-pan-zoom-control:hover { fill-opacity: 0.8; } .svg-pan-zoom-control-background { fill: white; fill-opacity: 0.5; } .svg-pan-zoom-control-background { fill-opacity: 0.8; }";
b.appendChild(a)}b=document.createElementNS(f.svgNS,"g");b.setAttribute("id","svg-pan-zoom-controls");b.setAttribute("transform","translate("+(c.width-70)+" "+(c.height-76)+") scale(0.75)");b.setAttribute("class","svg-pan-zoom-control");b.appendChild(this._createZoomIn(c));b.appendChild(this._createZoomReset(c));b.appendChild(this._createZoomOut(c));c.svg.appendChild(b);c.controlIcons=b},_createZoomIn:function(c){var b=document.createElementNS(f.svgNS,"g");b.setAttribute("id","svg-pan-zoom-zoom-in");
b.setAttribute("transform","translate(30.5 5) scale(0.015)");b.setAttribute("class","svg-pan-zoom-control");b.addEventListener("click",function(){c.getPublicInstance().zoomIn()},!1);b.addEventListener("touchstart",function(){c.getPublicInstance().zoomIn()},!1);var a=document.createElementNS(f.svgNS,"rect");a.setAttribute("x","0");a.setAttribute("y","0");a.setAttribute("width","1500");a.setAttribute("height","1400");a.setAttribute("class","svg-pan-zoom-control-background");b.appendChild(a);a=document.createElementNS(f.svgNS,
"path");a.setAttribute("d","M1280 576v128q0 26 -19 45t-45 19h-320v320q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-320h-320q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h320v-320q0 -26 19 -45t45 -19h128q26 0 45 19t19 45v320h320q26 0 45 19t19 45zM1536 1120v-960 q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5t84.5 -203.5z");a.setAttribute("class","svg-pan-zoom-control-element");b.appendChild(a);return b},_createZoomReset:function(c){var b=
document.createElementNS(f.svgNS,"g");b.setAttribute("id","svg-pan-zoom-reset-pan-zoom");b.setAttribute("transform","translate(5 35) scale(0.4)");b.setAttribute("class","svg-pan-zoom-control");b.addEventListener("click",function(){c.getPublicInstance().reset()},!1);b.addEventListener("touchstart",function(){c.getPublicInstance().reset()},!1);var a=document.createElementNS(f.svgNS,"rect");a.setAttribute("x","2");a.setAttribute("y","2");a.setAttribute("width","182");a.setAttribute("height","58");a.setAttribute("class",
"svg-pan-zoom-control-background");b.appendChild(a);a=document.createElementNS(f.svgNS,"path");a.setAttribute("d","M33.051,20.632c-0.742-0.406-1.854-0.609-3.338-0.609h-7.969v9.281h7.769c1.543,0,2.701-0.188,3.473-0.562c1.365-0.656,2.048-1.953,2.048-3.891C35.032,22.757,34.372,21.351,33.051,20.632z");a.setAttribute("class","svg-pan-zoom-control-element");b.appendChild(a);a=document.createElementNS(f.svgNS,"path");a.setAttribute("d","M170.231,0.5H15.847C7.102,0.5,0.5,5.708,0.5,11.84v38.861C0.5,56.833,7.102,61.5,15.847,61.5h154.384c8.745,0,15.269-4.667,15.269-10.798V11.84C185.5,5.708,178.976,0.5,170.231,0.5z M42.837,48.569h-7.969c-0.219-0.766-0.375-1.383-0.469-1.852c-0.188-0.969-0.289-1.961-0.305-2.977l-0.047-3.211c-0.03-2.203-0.41-3.672-1.142-4.406c-0.732-0.734-2.103-1.102-4.113-1.102h-7.05v13.547h-7.055V14.022h16.524c2.361,0.047,4.178,0.344,5.45,0.891c1.272,0.547,2.351,1.352,3.234,2.414c0.731,0.875,1.31,1.844,1.737,2.906s0.64,2.273,0.64,3.633c0,1.641-0.414,3.254-1.242,4.84s-2.195,2.707-4.102,3.363c1.594,0.641,2.723,1.551,3.387,2.73s0.996,2.98,0.996,5.402v2.32c0,1.578,0.063,2.648,0.19,3.211c0.19,0.891,0.635,1.547,1.333,1.969V48.569z M75.579,48.569h-26.18V14.022h25.336v6.117H56.454v7.336h16.781v6H56.454v8.883h19.125V48.569z M104.497,46.331c-2.44,2.086-5.887,3.129-10.34,3.129c-4.548,0-8.125-1.027-10.731-3.082s-3.909-4.879-3.909-8.473h6.891c0.224,1.578,0.662,2.758,1.316,3.539c1.196,1.422,3.246,2.133,6.15,2.133c1.739,0,3.151-0.188,4.236-0.562c2.058-0.719,3.087-2.055,3.087-4.008c0-1.141-0.504-2.023-1.512-2.648c-1.008-0.609-2.607-1.148-4.796-1.617l-3.74-0.82c-3.676-0.812-6.201-1.695-7.576-2.648c-2.328-1.594-3.492-4.086-3.492-7.477c0-3.094,1.139-5.664,3.417-7.711s5.623-3.07,10.036-3.07c3.685,0,6.829,0.965,9.431,2.895c2.602,1.93,3.966,4.73,4.093,8.402h-6.938c-0.128-2.078-1.057-3.555-2.787-4.43c-1.154-0.578-2.587-0.867-4.301-0.867c-1.907,0-3.428,0.375-4.565,1.125c-1.138,0.75-1.706,1.797-1.706,3.141c0,1.234,0.561,2.156,1.682,2.766c0.721,0.406,2.25,0.883,4.589,1.43l6.063,1.43c2.657,0.625,4.648,1.461,5.975,2.508c2.059,1.625,3.089,3.977,3.089,7.055C108.157,41.624,106.937,44.245,104.497,46.331z M139.61,48.569h-26.18V14.022h25.336v6.117h-18.281v7.336h16.781v6h-16.781v8.883h19.125V48.569z M170.337,20.14h-10.336v28.43h-7.266V20.14h-10.383v-6.117h27.984V20.14z");
a.setAttribute("class","svg-pan-zoom-control-element");b.appendChild(a);return b},_createZoomOut:function(c){var b=document.createElementNS(f.svgNS,"g");b.setAttribute("id","svg-pan-zoom-zoom-out");b.setAttribute("transform","translate(30.5 70) scale(0.015)");b.setAttribute("class","svg-pan-zoom-control");b.addEventListener("click",function(){c.getPublicInstance().zoomOut()},!1);b.addEventListener("touchstart",function(){c.getPublicInstance().zoomOut()},!1);var a=document.createElementNS(f.svgNS,
"rect");a.setAttribute("x","0");a.setAttribute("y","0");a.setAttribute("width","1500");a.setAttribute("height","1400");a.setAttribute("class","svg-pan-zoom-control-background");b.appendChild(a);a=document.createElementNS(f.svgNS,"path");a.setAttribute("d","M1280 576v128q0 26 -19 45t-45 19h-896q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h896q26 0 45 19t19 45zM1536 1120v-960q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5 t84.5 -203.5z");
a.setAttribute("class","svg-pan-zoom-control-element");b.appendChild(a);return b},disable:function(c){c.controlIcons&&(c.controlIcons.parentNode.removeChild(c.controlIcons),c.controlIcons=null)}}},{"./svg-utilities":5}],2:[function(h,g,m){var f=h("./svg-utilities"),c=h("./utilities"),b=function(a,b){this.init(a,b)};b.prototype.init=function(a,b){this.viewport=a;this.options=b;this.originalState={zoom:1,x:0,y:0};this.activeState={zoom:1,x:0,y:0};this.updateCTMCached=c.proxy(this.updateCTM,this);this.requestAnimationFrame=
c.createRequestAnimationFrame(this.options.refreshRate);this.viewBox={x:0,y:0,width:0,height:0};this.cacheViewBox();var e=this.processCTM();this.setCTM(e);this.updateCTM()};b.prototype.cacheViewBox=function(){var a=this.options.svg.getAttribute("viewBox");a?(a=a.split(/[\s,]/).filter(function(a){return a}).map(parseFloat),this.viewBox.x=a[0],this.viewBox.y=a[1],this.viewBox.width=a[2],this.viewBox.height=a[3],a=Math.min(this.options.width/this.viewBox.width,this.options.height/this.viewBox.height),
this.activeState.zoom=a,this.activeState.x=(this.options.width-this.viewBox.width*a)/2,this.activeState.y=(this.options.height-this.viewBox.height*a)/2,this.updateCTMOnNextFrame(),this.options.svg.removeAttribute("viewBox")):this.simpleViewBoxCache()};b.prototype.simpleViewBoxCache=function(){var a=this.viewport.getBBox();this.viewBox.x=a.x;this.viewBox.y=a.y;this.viewBox.width=a.width;this.viewBox.height=a.height};b.prototype.getViewBox=function(){return c.extend({},this.viewBox)};b.prototype.processCTM=
function(){var a=this.getCTM();if(this.options.fit||this.options.contain){var b=this.options.fit?Math.min(this.options.width/this.viewBox.width,this.options.height/this.viewBox.height):Math.max(this.options.width/this.viewBox.width,this.options.height/this.viewBox.height);a.a=b;a.d=b;a.e=-this.viewBox.x*b;a.f=-this.viewBox.y*b}this.options.center&&(b=.5*(this.options.height-(this.viewBox.height+2*this.viewBox.y)*a.a),a.e=.5*(this.options.width-(this.viewBox.width+2*this.viewBox.x)*a.a),a.f=b);this.originalState.zoom=
a.a;this.originalState.x=a.e;this.originalState.y=a.f;return a};b.prototype.getOriginalState=function(){return c.extend({},this.originalState)};b.prototype.getState=function(){return c.extend({},this.activeState)};b.prototype.getZoom=function(){return this.activeState.zoom};b.prototype.getRelativeZoom=function(){return this.activeState.zoom/this.originalState.zoom};b.prototype.computeRelativeZoom=function(a){return a/this.originalState.zoom};b.prototype.getPan=function(){return{x:this.activeState.x,
y:this.activeState.y}};b.prototype.getCTM=function(){var a=this.options.svg.createSVGMatrix();a.a=this.activeState.zoom;a.b=0;a.c=0;a.d=this.activeState.zoom;a.e=this.activeState.x;a.f=this.activeState.y;return a};b.prototype.setCTM=function(a){var b=this.isZoomDifferent(a),e=this.isPanDifferent(a);if(b||e){b&&(!1===this.options.beforeZoom(this.getRelativeZoom(),this.computeRelativeZoom(a.a))?(a.a=a.d=this.activeState.zoom,b=!1):(this.updateCache(a),this.options.onZoom(this.getRelativeZoom())));if(e){var f=
this.options.beforePan(this.getPan(),{x:a.e,y:a.f}),g=!1,k=!1;!1===f?(a.e=this.getPan().x,a.f=this.getPan().y,g=k=!0):c.isObject(f)&&(!1===f.x?(a.e=this.getPan().x,g=!0):c.isNumber(f.x)&&(a.e=f.x),!1===f.y?(a.f=this.getPan().y,k=!0):c.isNumber(f.y)&&(a.f=f.y));g&&k||!this.isPanDifferent(a)?e=!1:(this.updateCache(a),this.options.onPan(this.getPan()))}(b||e)&&this.updateCTMOnNextFrame()}};b.prototype.isZoomDifferent=function(a){return this.activeState.zoom!==a.a};b.prototype.isPanDifferent=function(a){return this.activeState.x!==
a.e||this.activeState.y!==a.f};b.prototype.updateCache=function(a){this.activeState.zoom=a.a;this.activeState.x=a.e;this.activeState.y=a.f};b.prototype.pendingUpdate=!1;b.prototype.updateCTMOnNextFrame=function(){this.pendingUpdate||(this.pendingUpdate=!0,this.requestAnimationFrame.call(window,this.updateCTMCached))};b.prototype.updateCTM=function(){var a=this.getCTM();f.setCTM(this.viewport,a,this.defs);this.pendingUpdate=!1;if(this.options.onUpdatedCTM)this.options.onUpdatedCTM(a)};g.exports=function(a,
c){return new b(a,c)}},{"./svg-utilities":5,"./utilities":7}],3:[function(h,g,m){var f=h("./svg-pan-zoom.js");(function(c,b){"function"===typeof define&&define.amd?define("svg-pan-zoom",function(){return f}):"undefined"!==typeof g&&g.exports&&(g.exports=f,c.svgPanZoom=f)})(window,document)},{"./svg-pan-zoom.js":4}],4:[function(h,g,m){var f=h("./uniwheel"),c=h("./control-icons"),b=h("./utilities"),a=h("./svg-utilities"),l=h("./shadow-viewport"),e=function(d,a){this.init(d,a)},q={viewportSelector:".svg-pan-zoom_viewport",
panEnabled:!0,controlIconsEnabled:!1,zoomEnabled:!0,dblClickZoomEnabled:!0,mouseWheelZoomEnabled:!0,preventMouseEventsDefault:!0,zoomScaleSensitivity:.1,minZoom:.5,maxZoom:10,fit:!0,contain:!1,center:!0,refreshRate:"auto",beforeZoom:null,onZoom:null,beforePan:null,onPan:null,customEventsHandler:null,eventsListenerElement:null,onUpdatedCTM:null},p={passive:!0};e.prototype.init=function(d,r){var e=this;this.svg=d;this.defs=d.querySelector("defs");a.setupSvgAttributes(this.svg);this.options=b.extend(b.extend({},
q),r);this.state="none";var n=a.getBoundingClientRectNormalized(d);this.width=n.width;this.height=n.height;this.viewport=l(a.getOrCreateViewport(this.svg,this.options.viewportSelector),{svg:this.svg,width:this.width,height:this.height,fit:this.options.fit,contain:this.options.contain,center:this.options.center,refreshRate:this.options.refreshRate,beforeZoom:function(d,a){if(e.viewport&&e.options.beforeZoom)return e.options.beforeZoom(d,a)},onZoom:function(d){if(e.viewport&&e.options.onZoom)return e.options.onZoom(d)},
beforePan:function(d,a){if(e.viewport&&e.options.beforePan)return e.options.beforePan(d,a)},onPan:function(d){if(e.viewport&&e.options.onPan)return e.options.onPan(d)},onUpdatedCTM:function(d){if(e.viewport&&e.options.onUpdatedCTM)return e.options.onUpdatedCTM(d)}});n=this.getPublicInstance();n.setBeforeZoom(this.options.beforeZoom);n.setOnZoom(this.options.onZoom);n.setBeforePan(this.options.beforePan);n.setOnPan(this.options.onPan);n.setOnUpdatedCTM(this.options.onUpdatedCTM);this.options.controlIconsEnabled&&
c.enable(this);this.lastMouseWheelEventTime=Date.now();this.setupHandlers()};e.prototype.setupHandlers=function(){var d=this,a=null;this.eventListeners={mousedown:function(b){var c=d.handleMouseDown(b,a);a=b;return c},touchstart:function(b){var c=d.handleMouseDown(b,a);a=b;return c},mouseup:function(a){return d.handleMouseUp(a)},touchend:function(a){return d.handleMouseUp(a)},mousemove:function(a){return d.handleMouseMove(a)},touchmove:function(a){return d.handleMouseMove(a)},mouseleave:function(a){return d.handleMouseUp(a)},
touchleave:function(a){return d.handleMouseUp(a)},touchcancel:function(a){return d.handleMouseUp(a)}};if(null!=this.options.customEventsHandler){this.options.customEventsHandler.init({svgElement:this.svg,eventsListenerElement:this.options.eventsListenerElement,instance:this.getPublicInstance()});var b=this.options.customEventsHandler.haltEventListeners;if(b&&b.length)for(var c=b.length-1;0<=c;c--)this.eventListeners.hasOwnProperty(b[c])&&delete this.eventListeners[b[c]]}for(var e in this.eventListeners)(this.options.eventsListenerElement||
this.svg).addEventListener(e,this.eventListeners[e],this.options.preventMouseEventsDefault?!1:p);this.options.mouseWheelZoomEnabled&&(this.options.mouseWheelZoomEnabled=!1,this.enableMouseWheelZoom())};e.prototype.enableMouseWheelZoom=function(){if(!this.options.mouseWheelZoomEnabled){var d=this;this.wheelListener=function(a){return d.handleMouseWheel(a)};f.on(this.options.eventsListenerElement||this.svg,this.wheelListener,!this.options.preventMouseEventsDefault);this.options.mouseWheelZoomEnabled=
!0}};e.prototype.disableMouseWheelZoom=function(){this.options.mouseWheelZoomEnabled&&(f.off(this.options.eventsListenerElement||this.svg,this.wheelListener,!this.options.preventMouseEventsDefault),this.options.mouseWheelZoomEnabled=!1)};e.prototype.handleMouseWheel=function(d){if(this.options.zoomEnabled&&"none"===this.state){this.options.preventMouseEventsDefault&&(d.preventDefault?d.preventDefault():d.returnValue=!1);var b=d.deltaY||1,c=Date.now()-this.lastMouseWheelEventTime;c=3+Math.max(0,30-
c);this.lastMouseWheelEventTime=Date.now();"deltaMode"in d&&0===d.deltaMode&&d.wheelDelta&&(b=0===d.deltaY?0:Math.abs(d.wheelDelta)/d.deltaY);b=-.3<b&&.3>b?b:(0<b?1:-1)*Math.log(Math.abs(b)+10)/c;c=this.svg.getScreenCTM().inverse();d=a.getEventPoint(d,this.svg).matrixTransform(c);this.zoomAtPoint(Math.pow(1+this.options.zoomScaleSensitivity,-1*b),d)}};e.prototype.zoomAtPoint=function(d,a,b){var c=this.viewport.getOriginalState();b?(d=Math.max(this.options.minZoom*c.zoom,Math.min(this.options.maxZoom*
c.zoom,d)),d/=this.getZoom()):this.getZoom()*d<this.options.minZoom*c.zoom?d=this.options.minZoom*c.zoom/this.getZoom():this.getZoom()*d>this.options.maxZoom*c.zoom&&(d=this.options.maxZoom*c.zoom/this.getZoom());b=this.viewport.getCTM();a=a.matrixTransform(b.inverse());d=this.svg.createSVGMatrix().translate(a.x,a.y).scale(d).translate(-a.x,-a.y);d=b.multiply(d);d.a!==b.a&&this.viewport.setCTM(d)};e.prototype.zoom=function(d,b){this.zoomAtPoint(d,a.getSvgCenterPoint(this.svg,this.width,this.height),
b)};e.prototype.publicZoom=function(d,a){a&&(d=this.computeFromRelativeZoom(d));this.zoom(d,a)};e.prototype.publicZoomAtPoint=function(d,c,e){e&&(d=this.computeFromRelativeZoom(d));if("SVGPoint"!==b.getType(c))if("x"in c&&"y"in c)c=a.createSVGPoint(this.svg,c.x,c.y);else throw Error("Given point is invalid");this.zoomAtPoint(d,c,e)};e.prototype.getZoom=function(){return this.viewport.getZoom()};e.prototype.getRelativeZoom=function(){return this.viewport.getRelativeZoom()};e.prototype.computeFromRelativeZoom=
function(d){return d*this.viewport.getOriginalState().zoom};e.prototype.resetZoom=function(){var d=this.viewport.getOriginalState();this.zoom(d.zoom,!0)};e.prototype.resetPan=function(){this.pan(this.viewport.getOriginalState())};e.prototype.reset=function(){this.resetZoom();this.resetPan()};e.prototype.handleDblClick=function(d){this.options.preventMouseEventsDefault&&(d.preventDefault?d.preventDefault():d.returnValue=!1);if(this.options.controlIconsEnabled&&-1<(d.target.getAttribute("class")||"").indexOf("svg-pan-zoom-control"))return!1;
var b=d.shiftKey?1/(2*(1+this.options.zoomScaleSensitivity)):2*(1+this.options.zoomScaleSensitivity);d=a.getEventPoint(d,this.svg).matrixTransform(this.svg.getScreenCTM().inverse());this.zoomAtPoint(b,d)};e.prototype.handleMouseDown=function(d,c){this.options.preventMouseEventsDefault&&(d.preventDefault?d.preventDefault():d.returnValue=!1);b.mouseAndTouchNormalize(d,this.svg);this.options.dblClickZoomEnabled&&b.isDblClick(d,c)?this.handleDblClick(d):(this.state="pan",this.firstEventCTM=this.viewport.getCTM(),
this.stateOrigin=a.getEventPoint(d,this.svg).matrixTransform(this.firstEventCTM.inverse()))};e.prototype.handleMouseMove=function(d){this.options.preventMouseEventsDefault&&(d.preventDefault?d.preventDefault():d.returnValue=!1);"pan"===this.state&&this.options.panEnabled&&(d=a.getEventPoint(d,this.svg).matrixTransform(this.firstEventCTM.inverse()),d=this.firstEventCTM.translate(d.x-this.stateOrigin.x,d.y-this.stateOrigin.y),this.viewport.setCTM(d))};e.prototype.handleMouseUp=function(d){this.options.preventMouseEventsDefault&&
(d.preventDefault?d.preventDefault():d.returnValue=!1);"pan"===this.state&&(this.state="none")};e.prototype.fit=function(){var d=this.viewport.getViewBox();this.zoom(Math.min(this.width/d.width,this.height/d.height),!0)};e.prototype.contain=function(){var d=this.viewport.getViewBox();this.zoom(Math.max(this.width/d.width,this.height/d.height),!0)};e.prototype.center=function(){var d=this.viewport.getViewBox(),a=.5*(this.width-(d.width+2*d.x)*this.getZoom());d=.5*(this.height-(d.height+2*d.y)*this.getZoom());
this.getPublicInstance().pan({x:a,y:d})};e.prototype.updateBBox=function(){this.viewport.simpleViewBoxCache()};e.prototype.pan=function(d){var a=this.viewport.getCTM();a.e=d.x;a.f=d.y;this.viewport.setCTM(a)};e.prototype.panBy=function(d){var a=this.viewport.getCTM();a.e+=d.x;a.f+=d.y;this.viewport.setCTM(a)};e.prototype.getPan=function(){var a=this.viewport.getState();return{x:a.x,y:a.y}};e.prototype.resize=function(){var d=a.getBoundingClientRectNormalized(this.svg);this.width=d.width;this.height=
d.height;d=this.viewport;d.options.width=this.width;d.options.height=this.height;d.processCTM();this.options.controlIconsEnabled&&(this.getPublicInstance().disableControlIcons(),this.getPublicInstance().enableControlIcons())};e.prototype.destroy=function(){var a=this;this.onUpdatedCTM=this.onPan=this.beforePan=this.onZoom=this.beforeZoom=null;null!=this.options.customEventsHandler&&this.options.customEventsHandler.destroy({svgElement:this.svg,eventsListenerElement:this.options.eventsListenerElement,
instance:this.getPublicInstance()});for(var b in this.eventListeners)(this.options.eventsListenerElement||this.svg).removeEventListener(b,this.eventListeners[b],this.options.preventMouseEventsDefault?!1:p);this.disableMouseWheelZoom();this.getPublicInstance().disableControlIcons();this.reset();k=k.filter(function(d){return d.svg!==a.svg});delete this.options;delete this.viewport;delete this.publicInstance;delete this.pi;this.getPublicInstance=function(){return null}};e.prototype.getPublicInstance=
function(){var a=this;this.publicInstance||(this.publicInstance=this.pi={enablePan:function(){a.options.panEnabled=!0;return a.pi},disablePan:function(){a.options.panEnabled=!1;return a.pi},isPanEnabled:function(){return!!a.options.panEnabled},pan:function(b){a.pan(b);return a.pi},panBy:function(b){a.panBy(b);return a.pi},getPan:function(){return a.getPan()},setBeforePan:function(c){a.options.beforePan=null===c?null:b.proxy(c,a.publicInstance);return a.pi},setOnPan:function(c){a.options.onPan=null===
c?null:b.proxy(c,a.publicInstance);return a.pi},enableZoom:function(){a.options.zoomEnabled=!0;return a.pi},disableZoom:function(){a.options.zoomEnabled=!1;return a.pi},isZoomEnabled:function(){return!!a.options.zoomEnabled},enableControlIcons:function(){a.options.controlIconsEnabled||(a.options.controlIconsEnabled=!0,c.enable(a));return a.pi},disableControlIcons:function(){a.options.controlIconsEnabled&&(a.options.controlIconsEnabled=!1,c.disable(a));return a.pi},isControlIconsEnabled:function(){return!!a.options.controlIconsEnabled},
enableDblClickZoom:function(){a.options.dblClickZoomEnabled=!0;return a.pi},disableDblClickZoom:function(){a.options.dblClickZoomEnabled=!1;return a.pi},isDblClickZoomEnabled:function(){return!!a.options.dblClickZoomEnabled},enableMouseWheelZoom:function(){a.enableMouseWheelZoom();return a.pi},disableMouseWheelZoom:function(){a.disableMouseWheelZoom();return a.pi},isMouseWheelZoomEnabled:function(){return!!a.options.mouseWheelZoomEnabled},setZoomScaleSensitivity:function(b){a.options.zoomScaleSensitivity=
b;return a.pi},setMinZoom:function(b){a.options.minZoom=b;return a.pi},setMaxZoom:function(b){a.options.maxZoom=b;return a.pi},setBeforeZoom:function(c){a.options.beforeZoom=null===c?null:b.proxy(c,a.publicInstance);return a.pi},setOnZoom:function(c){a.options.onZoom=null===c?null:b.proxy(c,a.publicInstance);return a.pi},zoom:function(b){a.publicZoom(b,!0);return a.pi},zoomBy:function(b){a.publicZoom(b,!1);return a.pi},zoomAtPoint:function(b,c){a.publicZoomAtPoint(b,c,!0);return a.pi},zoomAtPointBy:function(b,
c){a.publicZoomAtPoint(b,c,!1);return a.pi},zoomIn:function(){this.zoomBy(1+a.options.zoomScaleSensitivity);return a.pi},zoomOut:function(){this.zoomBy(1/(1+a.options.zoomScaleSensitivity));return a.pi},getZoom:function(){return a.getRelativeZoom()},setOnUpdatedCTM:function(c){a.options.onUpdatedCTM=null===c?null:b.proxy(c,a.publicInstance);return a.pi},resetZoom:function(){a.resetZoom();return a.pi},resetPan:function(){a.resetPan();return a.pi},reset:function(){a.reset();return a.pi},fit:function(){a.fit();
return a.pi},contain:function(){a.contain();return a.pi},center:function(){a.center();return a.pi},updateBBox:function(){a.updateBBox();return a.pi},resize:function(){a.resize();return a.pi},getSizes:function(){return{width:a.width,height:a.height,realZoom:a.getZoom(),viewBox:a.viewport.getViewBox()}},destroy:function(){a.destroy();return a.pi}});return this.publicInstance};var k=[];g.exports=function(a,c){var d=b.getSvg(a);if(null===d)return null;for(var l=k.length-1;0<=l;l--)if(k[l].svg===d)return k[l].instance.getPublicInstance();
k.push({svg:d,instance:new e(d,c)});return k[k.length-1].instance.getPublicInstance()}},{"./control-icons":1,"./shadow-viewport":2,"./svg-utilities":5,"./uniwheel":6,"./utilities":7}],5:[function(h,g,m){var f=h("./utilities"),c="unknown";document.documentMode&&(c="ie");g.exports={svgNS:"http://www.w3.org/2000/svg",xmlNS:"http://www.w3.org/XML/1998/namespace",xmlnsNS:"http://www.w3.org/2000/xmlns/",xlinkNS:"http://www.w3.org/1999/xlink",evNS:"http://www.w3.org/2001/xml-events",getBoundingClientRectNormalized:function(b){if(b.clientWidth&&
b.clientHeight)return{width:b.clientWidth,height:b.clientHeight};if(b.getBoundingClientRect())return b.getBoundingClientRect();throw Error("Cannot get BoundingClientRect for SVG.");},getOrCreateViewport:function(b,a){var c=null;c=f.isElement(a)?a:b.querySelector(a);if(!c){var e=Array.prototype.slice.call(b.childNodes||b.children).filter(function(a){return"defs"!==a.nodeName&&"#text"!==a.nodeName});1===e.length&&"g"===e[0].nodeName&&null===e[0].getAttribute("transform")&&(c=e[0])}if(!c){e="viewport-"+
(new Date).toISOString().replace(/\D/g,"");c=document.createElementNS(this.svgNS,"g");c.setAttribute("id",e);if((e=b.childNodes||b.children)&&0<e.length)for(var g=e.length;0<g;g--)"defs"!==e[e.length-g].nodeName&&c.appendChild(e[e.length-g]);b.appendChild(c)}e=[];c.getAttribute("class")&&(e=c.getAttribute("class").split(" "));~e.indexOf("svg-pan-zoom_viewport")||(e.push("svg-pan-zoom_viewport"),c.setAttribute("class",e.join(" ")));return c},setupSvgAttributes:function(b){b.setAttribute("xmlns",this.svgNS);
b.setAttributeNS(this.xmlnsNS,"xmlns:xlink",this.xlinkNS);b.setAttributeNS(this.xmlnsNS,"xmlns:ev",this.evNS);if(null!==b.parentNode){var a=b.getAttribute("style")||"";-1===a.toLowerCase().indexOf("overflow")&&b.setAttribute("style","overflow: hidden; "+a)}},internetExplorerRedisplayInterval:300,refreshDefsGlobal:f.throttle(function(){for(var b=document.querySelectorAll("defs"),a=b.length,c=0;c<a;c++){var e=b[c];e.parentNode.insertBefore(e,e)}},this?this.internetExplorerRedisplayInterval:null),setCTM:function(b,
a,f){var e=this;a="matrix("+a.a+","+a.b+","+a.c+","+a.d+","+a.e+","+a.f+")";b.setAttributeNS(null,"transform",a);"transform"in b.style?b.style.transform=a:"-ms-transform"in b.style?b.style["-ms-transform"]=a:"-webkit-transform"in b.style&&(b.style["-webkit-transform"]=a);"ie"===c&&f&&(f.parentNode.insertBefore(f,f),window.setTimeout(function(){e.refreshDefsGlobal()},e.internetExplorerRedisplayInterval))},getEventPoint:function(b,a){var c=a.createSVGPoint();f.mouseAndTouchNormalize(b,a);c.x=b.clientX;
c.y=b.clientY;return c},getSvgCenterPoint:function(b,a,c){return this.createSVGPoint(b,a/2,c/2)},createSVGPoint:function(b,a,c){b=b.createSVGPoint();b.x=a;b.y=c;return b}}},{"./utilities":7}],6:[function(h,g,m){g.exports=function(){function f(a,b){var c=function(a){!a&&(a=window.event);var c={originalEvent:a,target:a.target||a.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==a.type?0:1,deltaX:0,delatZ:0,preventDefault:function(){a.preventDefault?a.preventDefault():a.returnValue=!1}};"mousewheel"==
d?(c.deltaY=-.025*a.wheelDelta,a.wheelDeltaX&&(c.deltaX=-.025*a.wheelDeltaX)):c.deltaY=a.detail;return b(c)};e.push({element:a,fn:c});return c}function c(a){for(var b=0;b<e.length;b++)if(e[b].element===a)return e[b].fn;return function(){}}function b(a,b,c,e){c="wheel"===d?c:f(a,c);a[m](g+b,c,e?h:!1)}function a(a,b,f,l){f="wheel"===d?f:c(a);a[k](g+b,f,l?h:!1);a:for(b=0;b<e.length;b++)if(e[b].element===a){e.splice(b,1);break a}}var g="",e=[],h={passive:!0};if(window.addEventListener){var m="addEventListener";
var k="removeEventListener"}else m="attachEvent",k="detachEvent",g="on";var d="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll";return{on:function(a,c,e){b(a,d,c,e);"DOMMouseScroll"==d&&b(a,"MozMousePixelScroll",c,e)},off:function(b,c,e){a(b,d,c,e);"DOMMouseScroll"==d&&a(b,"MozMousePixelScroll",c,e)}}}()},{}],7:[function(h,g,m){function f(c){return function(b){window.setTimeout(b,c)}}g.exports={extend:function(c,b){c=c||{};for(var a in b)this.isObject(b[a])?
c[a]=this.extend(c[a],b[a]):c[a]=b[a];return c},isElement:function(c){return c instanceof HTMLElement||c instanceof SVGElement||c instanceof SVGSVGElement||c&&"object"===typeof c&&null!==c&&1===c.nodeType&&"string"===typeof c.nodeName},isObject:function(c){return"[object Object]"===Object.prototype.toString.call(c)},isNumber:function(c){return!isNaN(parseFloat(c))&&isFinite(c)},getSvg:function(c){if(this.isElement(c))var b=c;else if("string"===typeof c||c instanceof String){if(b=document.querySelector(c),
!b)throw Error("Provided selector did not find any elements. Selector: "+c);}else throw Error("Provided selector is not an HTML object nor String");if("svg"===b.tagName.toLowerCase())c=b;else if("object"===b.tagName.toLowerCase())c=b.contentDocument.documentElement;else if("embed"===b.tagName.toLowerCase())c=b.getSVGDocument().documentElement;else{if("img"===b.tagName.toLowerCase())throw Error('Cannot script an SVG in an "img" element. Please use an "object" element or an in-line SVG.');throw Error("Cannot get SVG.");
}return c},proxy:function(c,b){return function(){return c.apply(b,arguments)}},getType:function(c){return Object.prototype.toString.apply(c).replace(/^\[object\s/,"").replace(/\]$/,"")},mouseAndTouchNormalize:function(c,b){if(void 0===c.clientX||null===c.clientX)if(c.clientX=0,c.clientY=0,void 0!==c.touches&&c.touches.length)if(void 0!==c.touches[0].clientX)c.clientX=c.touches[0].clientX,c.clientY=c.touches[0].clientY;else{if(void 0!==c.touches[0].pageX){var a=b.getBoundingClientRect();c.clientX=
c.touches[0].pageX-a.left;c.clientY=c.touches[0].pageY-a.top}}else void 0!==c.originalEvent&&void 0!==c.originalEvent.clientX&&(c.clientX=c.originalEvent.clientX,c.clientY=c.originalEvent.clientY)},isDblClick:function(c,b){if(2===c.detail)return!0;if(void 0!==b&&null!==b){var a=Math.sqrt(Math.pow(c.clientX-b.clientX,2)+Math.pow(c.clientY-b.clientY,2));return 250>c.timeStamp-b.timeStamp&&10>a}return!1},now:Date.now||function(){return(new Date).getTime()},throttle:function(c,b,a){var f=this,e,g,h,k=
null,d=0;a||(a={});var m=function(){d=!1===a.leading?0:f.now();k=null;h=c.apply(e,g);k||(e=g=null)};return function(){var l=f.now();d||!1!==a.leading||(d=l);var n=b-(l-d);e=this;g=arguments;0>=n||n>b?(clearTimeout(k),k=null,d=l,h=c.apply(e,g),k||(e=g=null)):k||!1===a.trailing||(k=setTimeout(m,n));return h}},createRequestAnimationFrame:function(c){var b=null;"auto"!==c&&60>c&&1<c&&(b=Math.floor(1E3/c));return null===b?window.requestAnimationFrame||f(33):f(b)}}},{}]},{},[3]);