var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};var parentLocation=window.parent.document.location.href;parentLocation=parentLocation.split("/");parentLocation=parentLocation[parentLocation.length-1];parentLocation=parentLocation.split("?");parentLocation=parentLocation[0];var editState=!1,fileObjects={fileInput:document.querySelector(".input-file"),button:document.querySelector(".input-file-trigger")};
function fileClick(a){fileObjects.fileInput.click();return!1}
function fileChange(a){""==document.querySelector("#contractName").textContent?(document.querySelector(".file-label").classList.add("incarcaContract"),document.querySelector(".file-label").classList.remove("schimbaContract")):(document.querySelector(".file-label").classList.remove("incarcaContract"),document.querySelector(".file-label").classList.add("schimbaContract"));document.querySelector(".file-label").classList.remove("contractExistent");document.querySelector(".file-label").classList.remove("contractInexistent")}
function fileDownload(a){window.open("/contracts/"+document.querySelector("#contractName").textContent)}
function positiveState(){1!=editState&&(editState=!0,document.querySelectorAll(".boxContent input").forEach(function(a){a.disabled=!1}),""==document.querySelector("#contractName").textContent?(document.querySelector(".file-label").classList.add("incarcaContract"),document.querySelector(".file-label").classList.remove("schimbaContract")):(document.querySelector(".file-label").classList.remove("incarcaContract"),document.querySelector(".file-label").classList.add("schimbaContract")),document.querySelector(".file-label").classList.remove("contractExistent"),
document.querySelector(".file-label").classList.remove("contractInexistent"),fileObjects.button.removeEventListener("click",fileDownload),fileObjects.button.addEventListener("click",fileClick),fileObjects.fileInput.addEventListener("change",fileChange),document.querySelector(".view-tab").classList.add("hide"),document.querySelector(".edit-tab").classList.remove("hide"),document.querySelector(".errorText").style.bottom=String(document.querySelector(".control").getBoundingClientRect().height+15)+"px",
document.querySelectorAll(".edit-tab .outerButton .buttonLogo").forEach(function(a){fixSize(a)}))}
function negativeState(){0!=editState&&(editState=!1,document.querySelectorAll(".boxContent input").forEach(function(a){a.disabled=!0}),""==document.querySelector("#contractName").textContent?(document.querySelector(".file-label").classList.remove("incarcaContract"),document.querySelector(".file-label").classList.remove("schimbaContract"),document.querySelector(".file-label").classList.remove("contractExistent"),document.querySelector(".file-label").classList.add("contractInexistent")):(document.querySelector(".file-label").classList.remove("incarcaContract"),
document.querySelector(".file-label").classList.remove("schimbaContract"),document.querySelector(".file-label").classList.add("contractExistent"),document.querySelector(".file-label").classList.remove("contractInexistent")),fileObjects.button.removeEventListener("click",fileClick),fileObjects.fileInput.removeEventListener("change",fileChange),fileObjects.button.addEventListener("click",fileDownload));document.querySelector(".view-tab").classList.remove("hide");document.querySelector(".edit-tab").classList.add("hide")}
document.querySelector(".edit").addEventListener("click",function(a){positiveState()});document.querySelector(".cancel").addEventListener("click",function(){negativeState();document.querySelector(".file-return").innerHTML="";document.querySelector("#my-file").files=defaultFiles});var cw=$(".buttonLogo").height();$(".buttonLogo").css({width:cw+"px"});var modal=document.querySelector(".actionModal"),btn=document.querySelector(".action"),span=document.getElementsByClassName("close");
btn.onclick=function(){modal.style.display="block";document.querySelectorAll(".actionModal .outerButton .buttonLogo").forEach(function(a){fixSize(a)})};for(var i=0;i<span.length;i++)span[i].onclick=function(){modal.style.display="none"};window.onclick=function(a){a.target==modal&&(modal.style.display="none")};var monthNames="JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
document.querySelector(".modal-body-pay .cancel").addEventListener("click",function(){for(var a=document.querySelectorAll(".main"),b=0;b<a.length;b++)a[b].classList.remove("hide");b=document.querySelectorAll(".pay");for(var c=0;c<a.length;c++)b[c].classList.add("hide");document.querySelector(".modal-body-pay.pay .message").style.display="none"});
document.querySelector(".modal-body-main .achitare").addEventListener("click",function(){for(var a=document.querySelectorAll(".main"),b=0;b<a.length;b++)a[b].classList.add("hide");b=document.querySelectorAll(".pay");for(var c=0;c<a.length;c++)b[c].classList.remove("hide");document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(function(a){fixSize(a)})});
document.querySelector(".modal-body-main .modificare").addEventListener("click",function(){for(var a=document.querySelectorAll(".main"),b=0;b<a.length;b++)a[b].classList.add("hide");b=document.querySelectorAll(".adjust");for(var c=0;c<a.length;c++)b[c].classList.remove("hide");document.querySelectorAll(".edit-tab .outerButton .buttonLogo").forEach(function(a){fixSize(a)});document.querySelectorAll(".modal-body-adjust .outerButton .buttonLogo").forEach(function(a){fixSize(a)})});
document.querySelector(".modal-body-adjust .cancel").addEventListener("click",function(){for(var a=document.querySelectorAll(".main"),b=0;b<a.length;b++)a[b].classList.remove("hide");b=document.querySelectorAll(".adjust");for(var c=0;c<a.length;c++)b[c].classList.add("hide")});
document.querySelector(".modal-body-main .mutare").addEventListener("click",function(){for(var a=document.querySelectorAll(".main"),b=0;b<a.length;b++)a[b].classList.add("hide");a=document.querySelectorAll(".move");for(b=0;b<a.length;b++)a[b].classList.remove("hide");document.querySelectorAll(".modal-body-move .outerButton .buttonLogo").forEach(function(a){fixSize(a)})});
document.querySelector(".modal-body-move .cancel").addEventListener("click",function(){for(var a=document.querySelectorAll(".main"),b=0;b<a.length;b++)a[b].classList.remove("hide");a=document.querySelectorAll(".move");for(b=0;b<a.length;b++)a[b].classList.add("hide")});function isHidden(a){return null===a.offsetParent}
document.querySelectorAll(".buttonLogo").forEach(function(a){isHidden(a)||(a.style.margin=String((a.parentElement.offsetHeight-a.offsetHeight)/2)+"px",a.style.width=String(a.offsetHeight)+"px")});window.addEventListener("resize",function(){document.querySelectorAll(".buttonLogo").forEach(function(a){isHidden(a)||(a.style.margin=String((a.parentElement.offsetHeight-a.offsetHeight)/2)+"px",a.style.width=String(a.offsetHeight)+"px")})});
function fixSize(a){isHidden(a)||(a.style.width=String(a.offsetHeight)+"px",a.style.margin=String((a.parentElement.offsetHeight-a.offsetHeight)/2)+"px")}
""==document.querySelector("#contractName").textContent?(document.querySelector(".file-label").classList.remove("incarcaContract"),document.querySelector(".file-label").classList.remove("schimbaContract"),document.querySelector(".file-label").classList.remove("contractExistent"),document.querySelector(".file-label").classList.add("contractInexistent")):(document.querySelector(".file-label").classList.remove("incarcaContract"),document.querySelector(".file-label").classList.remove("schimbaContract"),
document.querySelector(".file-label").classList.add("contractExistent"),document.querySelector(".file-label").classList.remove("contractInexistent"));var defaultFiles=document.querySelector("#my-file").files;fileObjects.button.addEventListener("click",fileDownload);
document.querySelector(".pay .confirm").addEventListener("click",function(a){var b=!0;document.querySelectorAll("#payForm input").forEach(function(a){a.checkValidity()||(document.querySelector(".modal-body-pay.pay .message").style.display="block",b=!1)});if(b){a=document.querySelectorAll(".check");for(var c=0;c<a.length;c++)a[c].classList.remove("hide");c=document.querySelector(".check .confirm");var d=c.cloneNode(!0);c.parentNode.replaceChild(d,c);document.querySelector(".check .confirm").addEventListener("click",
function(){submitRouter("pay",document.querySelector("#payForm"),!0)});c=document.querySelectorAll(".pay");for(d=0;d<a.length;d++)c[d].classList.add("hide");document.querySelectorAll(".check .outerButton .buttonLogo").forEach(function(a){fixSize(a)})}document.querySelectorAll(".check .outerButton .buttonLogo").forEach(function(a){fixSize(a)});c=document.querySelector(".check .cancel");d=c.cloneNode(!0);c.parentNode.replaceChild(d,c);document.querySelector(".check .cancel").addEventListener("click",
function(a){a=document.querySelectorAll(".check");for(var b=0;b<a.length;b++)a[b].classList.add("hide");b=document.querySelectorAll(".pay");for(var c=0;c<a.length;c++)b[c].classList.remove("hide");document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(function(a){fixSize(a)})})});
document.querySelector(".adjust .confirm").addEventListener("click",function(a){var b=!0;document.querySelectorAll("#adjustForm input").forEach(function(a){v=!0;try{0>parseInt(a.value)&&(v=!1)}catch(f){return}v||(a.classList.add("absInvalid"),b=!1)});if(b){a=document.querySelectorAll(".check");for(var c=0;c<a.length;c++)a[c].classList.remove("hide");c=document.querySelector(".check .confirm");var d=c.cloneNode(!0);c.parentNode.replaceChild(d,c);document.querySelector(".check .confirm").addEventListener("click",
function(){submitRouter("adjust",document.querySelector("#adjustForm"),!0)});c=document.querySelectorAll(".adjust");for(d=0;d<a.length;d++)c[d].classList.add("hide");document.querySelectorAll(".check .outerButton .buttonLogo").forEach(function(a){fixSize(a)})}document.querySelectorAll(".modal-body-adjust .outerButton .buttonLogo").forEach(function(a){fixSize(a)});c=document.querySelector(".check .cancel");d=c.cloneNode(!0);c.parentNode.replaceChild(d,c);document.querySelector(".check .cancel").addEventListener("click",
function(a){a=document.querySelectorAll(".check");for(var b=0;b<a.length;b++)a[b].classList.add("hide");b=document.querySelectorAll(".adjust");for(var c=0;c<a.length;c++)b[c].classList.remove("hide");document.querySelectorAll(".modal-body-adjust .outerButton .buttonLogo").forEach(function(a){fixSize(a)})})});
document.querySelector(".move .confirm").addEventListener("click",function(a){var b=!0;document.querySelectorAll("#moveForm input").forEach(function(a){a.checkValidity()||(a.classList.add("invalid"),b=!1)});if(b){a=document.querySelectorAll(".check");for(var c=0;c<a.length;c++)a[c].classList.remove("hide");c=document.querySelector(".check .confirm");var d=c.cloneNode(!0);c.parentNode.replaceChild(d,c);document.querySelector(".check .confirm").addEventListener("click",function(){submitRouter("move",
document.querySelector("#moveForm"),!0)});c=document.querySelectorAll(".move");for(d=0;d<a.length;d++)c[d].classList.add("hide");document.querySelectorAll(".check .outerButton .buttonLogo").forEach(function(a){fixSize(a)})}document.querySelectorAll(".modal-body-move .outerButton .buttonLogo").forEach(function(a){fixSize(a)});c=document.querySelector(".check .cancel");d=c.cloneNode(!0);c.parentNode.replaceChild(d,c);document.querySelector(".check .cancel").addEventListener("click",function(a){a=document.querySelectorAll(".check");
for(var b=0;b<a.length;b++)a[b].classList.add("hide");b=document.querySelectorAll(".move");for(var c=0;c<a.length;c++)b[c].classList.remove("hide");document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(function(a){fixSize(a)})})});
document.querySelector(".main .eliberare").addEventListener("click",function(a){a=document.querySelectorAll(".check");for(var b=0;b<a.length;b++)a[b].classList.remove("hide");b=document.querySelector(".check .confirm");var c=b.cloneNode(!0);b.parentNode.replaceChild(c,b);document.querySelector(".check .confirm").addEventListener("click",function(){submitRouter("clear","",!0)});b=document.querySelectorAll(".main");for(c=0;c<a.length;c++)b[c].classList.add("hide");document.querySelectorAll(".modal-body-main .outerButton .buttonLogo").forEach(function(a){fixSize(a)});
document.querySelectorAll(".check .outerButton .buttonLogo").forEach(function(a){fixSize(a)});b=document.querySelector(".check .cancel");c=b.cloneNode(!0);b.parentNode.replaceChild(c,b);document.querySelector(".check .cancel").addEventListener("click",function(a){a=document.querySelectorAll(".check");for(var b=0;b<a.length;b++)a[b].classList.add("hide");b=document.querySelectorAll(".main");for(var c=0;c<a.length;c++)b[c].classList.remove("hide");document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(function(a){fixSize(a)})})});
function submitRouter(a,b,c){b=void 0===b?"":b;c=void 0===c?!1:c;"pay"==a&&c&&b.submit();"adjust"==a&&c&&b.submit();if("move"==a){var d=document.querySelector(".header .identificator").textContent;d=window.parent.document.querySelector("."+d);d.classList.remove("boxa-ocupata");d.classList.add("boxa-libera");d=b.querySelector(".box").value;d=window.parent.document.querySelector("."+d);if(""!=document.querySelector(".boxData #boxForm .Name"))try{d.classList.remove("boxa-libera"),d.classList.add("boxa-ocupata")}catch(e){}c&&
b.submit()}"clear"==a&&(a=document.querySelector(".header .identificator").textContent,a=window.parent.document.querySelector("."+a),a.classList.remove("boxa-ocupata"),a.classList.add("boxa-libera"),a=document.createElement("form"),document.body.appendChild(a),a.style.display="none",a.method="POST",a.action="/"+parentLocation+"/box/"+document.querySelector("body .header .identificator").textContent+"/remove",a.submit())}
document.querySelector(".boxContent .control-wrap .confirm").addEventListener("click",function(a){var b=!0;document.querySelectorAll(".boxData .field").forEach(function(a){a.checkValidity()||(a.classList.add("invalid"),b=!1)});if(b){modal.style.display="block";a=document.querySelectorAll(".check");for(var c=0;c<a.length;c++)a[c].classList.remove("hide");c=document.querySelector(".check .confirm");var d=c.cloneNode(!0);c.parentNode.replaceChild(d,c);c=document.querySelector(".check .cancel");d=c.cloneNode(!0);
c.parentNode.replaceChild(d,c);document.querySelector(".check .confirm").addEventListener("click",function(){if(""!=document.querySelector("#fileForm input").value){document.querySelector(".hiddenName").value=document.querySelector(".Name").value;document.querySelector(".hiddenPhone").value=document.querySelector(".Phone").value;document.querySelector(".hiddenEmail").value=document.querySelector(".Email").value;var a=document.querySelector(".header .identificator").textContent;a=window.parent.document.querySelector("."+
a);a.classList.remove("boxa-libera");a.classList.add("boxa-ocupata");document.querySelector("#fileForm").submit()}else a=document.querySelector(".header .identificator").textContent,a=window.parent.document.querySelector("."+a),""!=document.querySelector(".boxData #boxForm .Name")&&(a.classList.remove("boxa-libera"),a.classList.add("boxa-ocupata")),document.querySelector("#boxForm").submit();a=document.querySelectorAll(".check");for(var b=0;b<a.length;b++)a[b].classList.add("hide");b=document.querySelectorAll(".main");
for(var c=0;c<a.length;c++)b[c].classList.remove("hide");document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(function(a){fixSize(a)});modal.style.display="none"});document.querySelector(".check .cancel").addEventListener("click",function(){for(var a=document.querySelectorAll(".check"),b=0;b<a.length;b++)a[b].classList.add("hide");b=document.querySelectorAll(".main");for(var c=0;c<a.length;c++)b[c].classList.remove("hide");document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(function(a){fixSize(a)});
modal.style.display="none"});c=document.querySelectorAll(".main");for(d=0;d<a.length;d++)c[d].classList.add("hide");document.querySelectorAll(".check .outerButton .buttonLogo").forEach(function(a){fixSize(a)})}});var currentData={nume:document.querySelector(".field.Name").value,telefon:document.querySelector(".field.Phone").value,email:document.querySelector(".field.Email").value};
document.querySelector(".control .outerButton.reset").addEventListener("click",function(a){document.querySelector(".field.Name").value=currentData.nume;document.querySelector(".field.Phone").value=currentData.telefon;document.querySelector(".field.Email").value=currentData.email});var vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),vh=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0);
try{800<window.innerWidth?document.querySelector(".alert").style.bottom=""+(.02*vh+1.4*document.querySelector(".control").offsetHeight-5)+"px":document.querySelector(".alert").style.bottom=""+(.02*vh+1.1*document.querySelector(".control").offsetHeight-5)+"px"}catch(a){}
window.addEventListener("resize",function(a){try{800<window.innerWidth?document.querySelector(".alert").style.bottom=""+(.02*vh+1.4*document.querySelector(".control").offsetHeight-5)+"px":document.querySelector(".alert").style.bottom=""+(.02*vh+1.1*document.querySelector(".control").offsetHeight-5)+"px"}catch(b){}});
try{document.querySelector(".alert .bx.bx-x").addEventListener("click",function(a){try{a.target.parentElement.parentElement.style.opacity="0",setTimeout(function(){a.target.parentElement.parentElement.style.display="none"},600)}catch(b){}})}catch(a){}setTimeout(function(){try{document.querySelector(".alert").style.opacity="0",setTimeout(function(){document.querySelector(".alert").style.display="none"},600)}catch(a){}},5E3);document.addEventListener("click",removeAlertClick);
function removeAlertClick(a){try{var b=document.querySelector(".alert"),c=a.target;do{if(c==b)return;c=c.parentNode}while(c);document.querySelector(".alert").style.opacity="0";setTimeout(function(){document.querySelector(".alert").style.display="none"},600);document.removeEventListener("click",removeAlertClick)}catch(d){}}
var MONTH_NAMES="Ian Feb Mar Apr Mai Iun Iul Aug Sep Oct Noi Dec".split(" "),WEEKDAY_NAMES="Dum Lun Mar Mie Joi Vin Sam".split(" "),DEFAULT_SELECTED_TEXT="Selectati cele doua date",DAY_TIME=864E5,currentMonth=(new Date).getMonth(),currentYear=(new Date).getFullYear(),currentIndicator=null,selectedInitialDate=null,selectedEndDate=null,datepickerBody=document.getElementById("datepicker-body"),datepickerButton=document.getElementById("datepicker-button"),datepickerConfirmButton=document.getElementById("datepicker-clear-button"),
datepickerClearButton=document.getElementById("datepicker-clear-button2"),datepickerContainer=document.getElementById("datepicker-container"),datepickerSelectedText=document.getElementById("datepicker-selected-text"),datepickerNextButton=document.getElementById("datepicker-next-button"),datepickerPreviousButton=document.getElementById("datepicker-previous-button"),datepickerIndicator=document.getElementById("datepicker-indicator"),datepickerWeekTitle=document.getElementById("datepicker-week-title");
datepickerButton.addEventListener("click",function(a){return toggleDatepicker()});datepickerNextButton.addEventListener("click",function(a){return changeIndicator(1)});datepickerPreviousButton.addEventListener("click",function(a){return changeIndicator(-1)});datepickerConfirmButton.addEventListener("click",function(a){return confirmChoice()});datepickerClearButton.addEventListener("click",function(a){return clearSelection()});datepickerIndicator.addEventListener("click",function(a){return fillBody()});
WEEKDAY_NAMES.forEach(function(a){var b=document.createElement("li");b.innerText=a;datepickerWeekTitle.appendChild(b)});datepickerSelectedText.innerText=DEFAULT_SELECTED_TEXT;
function toggleDatepicker(){"flex"===datepickerContainer.style.display?datepickerContainer.style.display="none":(fillMonth(),datepickerContainer.style.display="flex");575<=window.innerWidth?(document.querySelector("#datepicker-container").style.top=-document.querySelector("#datepicker-container").offsetHeight+document.querySelector("#datepicker-button").offsetHeight+"px",document.querySelector("#datepicker-container").style.left=document.querySelector("#datepicker-button").offsetWidth+20+"px",document.querySelector("#datepicker-container").style.width=
"300px",document.querySelector("#datepicker-container").style.height="360px"):575>window.innerWidth&&!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(document.querySelector("#datepicker-container").style.left=0,document.querySelector("#datepicker-container").style.top=-document.querySelector("#datepicker-container").offsetHeight-10+"px",document.querySelector("#datepicker-container").style.width="280px",document.querySelector("#datepicker-container").style.height=
"320px");/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&450>=window.innerWidth&&(document.querySelector("#datepicker-container").style.left=0,document.querySelector("#datepicker-container").style.top=-document.querySelector("#datepicker-container").offsetHeight+25+"px",document.querySelector("#datepicker-container").style.width="230px",document.querySelector("#datepicker-container").style.height="290px")}
function changeIndicator(a){switch(currentIndicator){case "year":currentYear+=a;fillYear();break;case "month":currentMonth+=a;fillMonth();break;case "decade":currentYear+=10*a,fillDecade()}}function fillBody(a){currentIndicator=a=void 0===a?currentIndicator:a;switch(a){case "month":fillYear();break;case "year":fillDecade();break;case "decade":fillYear((new Date).getFullYear());break;default:fillMonth(new Date)}}
function selectDay(a){if(selectedInitialDate||selectedEndDate){if(a.getTime()===selectedInitialDate.getTime()&&a.getTime()===selectedEndDate.getTime())return clearSelection(!0);a.getTime()===selectedInitialDate.getTime()?selectedInitialDate=selectedEndDate:a.getTime()===selectedEndDate.getTime()?selectedEndDate=selectedInitialDate:a>selectedInitialDate&&a<selectedEndDate?Math.abs(a-selectedInitialDate)>=Math.abs(a-selectedEndDate)?selectedEndDate=a:selectedInitialDate=a:a>selectedEndDate?selectedEndDate=
a:a<selectedInitialDate&&(selectedInitialDate=a)}else selectedEndDate=selectedInitialDate=a,datepickerConfirmButton.style.display="inline-block",datepickerClearButton.style.display="inline-block";a.getMonth()!==currentMonth&&(currentMonth=a.getMonth(),currentYear=a.getFullYear());datepickerSelectedText.innerHTML="<b>De la:</b> "+selectedInitialDate.getDate()+" "+MONTH_NAMES[selectedInitialDate.getMonth()]+" "+selectedInitialDate.getFullYear()+"<br /><b>Pana la:</b> "+selectedEndDate.getDate()+" "+
MONTH_NAMES[selectedEndDate.getMonth()]+" "+selectedEndDate.getFullYear();fillMonth()}
function clearSelection(a){datepickerConfirmButton.style.display="none";datepickerClearButton.style.display="none";selectedEndDate=selectedInitialDate=null;datepickerSelectedText.innerHTML=DEFAULT_SELECTED_TEXT;fillMonth(a?void 0:new Date);document.querySelector("#date1").value="";document.querySelector("#date2").value="";document.querySelector("#datepicker .datesPreview .date1").textContent="";document.querySelector("#datepicker .datesPreview .date2").textContent=""}
function fillMonth(a){a=void 0===a?new Date(currentYear,currentMonth):a;currentYear=a.getFullYear();currentMonth=a.getMonth();currentIndicator="month";datepickerBody.innerHTML="";generateMonthDays(a).forEach(function(a){return datepickerBody.appendChild(generateWeekElement(a))});datepickerIndicator.innerText=MONTH_NAMES[a.getMonth()]+" "+a.getFullYear();datepickerWeekTitle.style.display="flex"}
function fillYear(a){currentYear=a=void 0===a?currentYear:a;currentIndicator="year";datepickerBody.innerHTML="";for(var b=0;4>b;b++){var c=document.createElement("ul");c.className="datepicker-week-container";for(var d=0;3>d;d++)c.appendChild(generateMonthElement(new Date(a,3*b+d)));datepickerBody.appendChild(c)}datepickerIndicator.innerText=a;datepickerWeekTitle.style.display="none"}
function fillDecade(a){a=void 0===a?currentYear:a;currentIndicator="decade";a=10*Math.floor(a/10);datepickerBody.innerHTML="";for(var b=0;5>b;b++){var c=document.createElement("ul");c.className="datepicker-week-container";for(var d=0;2>d;d++)c.appendChild(generateYearElement(a+2*b+d));datepickerBody.appendChild(c)}datepickerIndicator.innerText=a+" - "+(a+9);datepickerWeekTitle.style.display="none"}
function generateMonthDays(a){a=void 0===a?new Date:a;var b=[];a=new Date(a.getFullYear(),a.getMonth(),1);a=new Date(a.getFullYear(),a.getMonth(),1-a.getDay());for(var c=0;6>c;c++){b[c]=[];for(var d=0;7>d;d++)b[c][d]=new Date(a),a=new Date(a.setDate(a.getDate()+1));weekday=0}return b}
function generateDayElement(a){var b=document.createElement("li");b.innerText=a.getDate();b.className="datepicker-list-item-container";0<=Date.now()-a&&Date.now()-a<=DAY_TIME&&(b.className+=" datepicker-list-item-today");a.getMonth()!==currentMonth&&(b.className+=" datepicker-list-item-outday");b.addEventListener("mousedown",function(b){return selectDay(a)});selectedInitialDate&&selectedEndDate&&(a.getTime()===selectedInitialDate.getTime()||a.getTime()===selectedEndDate.getTime()?b.className+=" datepicker-list-item-selected":
a>selectedInitialDate&&a<selectedEndDate&&(b.className+=" datepicker-list-item-between"));return b}function generateWeekElement(a){var b=document.createElement("ul");b.className="datepicker-week-container";a.forEach(function(a){return b.appendChild(generateDayElement(a))});return b}
function generateMonthElement(a){a=void 0===a?new Date(currentYear):a;var b=document.createElement("li");b.innerText=MONTH_NAMES[a.getMonth()];b.className="datepicker-list-item-container";(new Date).getMonth()===a.getMonth()&&(new Date).getFullYear()===a.getFullYear()&&(b.className+=" datepicker-list-item-today");b.addEventListener("click",function(b){return fillMonth(new Date(currentYear,a.getMonth()))});if(selectedInitialDate&&selectedEndDate)if(a.getFullYear()===selectedInitialDate.getFullYear()&&
a.getMonth()===selectedInitialDate.getMonth()||a.getFullYear()===selectedEndDate.getFullYear()&&a.getMonth()===selectedEndDate.getMonth())b.className+=" datepicker-list-item-selected";else if(a.getFullYear()===selectedInitialDate.getFullYear()||a.getFullYear()===selectedEndDate.getFullYear())if(selectedInitialDate.getFullYear()===selectedEndDate.getFullYear())a.getMonth()>selectedInitialDate.getMonth()&&a.getMonth()<selectedEndDate.getMonth()&&(b.className+=" datepicker-list-item-between");else{if(a.getFullYear()===
selectedInitialDate.getFullYear()&&a.getMonth()>selectedInitialDate.getMonth()||a.getFullYear()===selectedEndDate.getFullYear()&&a.getMonth()<selectedEndDate.getMonth())b.className+=" datepicker-list-item-between"}else a.getFullYear()>selectedInitialDate.getFullYear()&&a.getFullYear()<selectedEndDate.getFullYear()&&(b.className+=" datepicker-list-item-between");return b}
function generateYearElement(a){var b=document.createElement("li");b.innerText=a;b.className="datepicker-list-item-container";(new Date).getFullYear()===a&&(b.className+=" datepicker-list-item-today");b.addEventListener("click",function(b){return fillYear(a)});selectedInitialDate&&selectedEndDate&&(a===selectedInitialDate.getFullYear()||a===selectedEndDate.getFullYear()?b.className+=" datepicker-list-item-selected":a>selectedInitialDate.getFullYear()&&a<selectedEndDate.getFullYear()&&(b.className+=
" datepicker-list-item-between"));return b}
function confirmChoice(){document.querySelector("#date1").value=selectedInitialDate.getDate()+" "+MONTH_NAMES[selectedInitialDate.getMonth()]+" "+selectedInitialDate.getFullYear();document.querySelector("#date2").value=selectedEndDate.getDate()+" "+MONTH_NAMES[selectedEndDate.getMonth()]+" "+selectedEndDate.getFullYear();document.querySelector("#datepicker .datesPreview .date1").textContent=selectedInitialDate.getDate()+" "+MONTH_NAMES[selectedInitialDate.getMonth()]+" "+selectedInitialDate.getFullYear();
document.querySelector("#datepicker .datesPreview .date2").textContent=selectedEndDate.getDate()+" "+MONTH_NAMES[selectedEndDate.getMonth()]+" "+selectedEndDate.getFullYear();toggleDatepicker()}
575>window.innerWidth?(document.querySelector("#datepicker-container").style.left=0,document.querySelector("#datepicker-container").style.top=-document.querySelector("#datepicker-container").offsetHeight-10+"px",document.querySelector("#datepicker-container").style.width="280px",document.querySelector("#datepicker-container").style.height="320px"):(document.querySelector("#datepicker-container").style.top=-document.querySelector("#datepicker-container").offsetHeight+document.querySelector("#datepicker-button").offsetHeight+
"px",document.querySelector("#datepicker-container").style.left=document.querySelector("#datepicker-button").offsetWidth+20+"px",document.querySelector("#datepicker-container").style.width="300px",document.querySelector("#datepicker-container").style.height="360px");
window.addEventListener("resize",function(){575>window.innerWidth?(document.querySelector("#datepicker-container").style.left=0,document.querySelector("#datepicker-container").style.top=-document.querySelector("#datepicker-container").offsetHeight-20+"px",document.querySelector("#datepicker-container").style.width="280px",document.querySelector("#datepicker-container").style.height="320px"):(document.querySelector("#datepicker-container").style.top=-document.querySelector("#datepicker-container").offsetHeight+
document.querySelector("#datepicker-button").offsetHeight+"px",document.querySelector("#datepicker-container").style.left=document.querySelector("#datepicker-button").offsetWidth+20+"px",document.querySelector("#datepicker-container").style.width="300px",document.querySelector("#datepicker-container").style.height="360px")});$(".modal-body-pay .priceInputWrap .price").on("input",function(){$(".modal-body-pay #payForm .paySum").val($(this).val())});
document.querySelector(".modal-body-pay .outerButton.cancel").addEventListener("click",function(){document.querySelector(".modal-body-pay #payForm #date1").value="";document.querySelector(".modal-body-pay #payForm #date2").value="";document.querySelector(".modal-body-pay #payForm .paySum").value="";document.querySelector(".modal-body-pay .datesPreview .date1").textContent="";document.querySelector(".modal-body-pay .datesPreview .date2").textContent="";document.querySelector(".modal-body-pay .priceInputWrap .price").value=
"";clearSelection()});$(".modal-body-move input").keypress(function(a){a.preventDefault()});
$("#boxSelection").click(function(a){$("#boxes").show();390<window.innerWidth?($(".limitBox")[0].style.top=String($("#boxSelection").offset().top-$(".modal-body-move").offset().top)+"px",$(".limitBox")[0].style.left=String($("#boxSelection").offset().left-$(".modal-body-move").offset().left+$("#boxSelection")[0].getBoundingClientRect().width+10)+"px"):($(".limitBox")[0].style.top=String($("#boxSelection").offset().top-$(".modal-body-move").offset().top+$("#boxSelection")[0].getBoundingClientRect().height+
10)+"px",$(".limitBox")[0].style.left=String($("#boxSelection").offset().left-$(".modal-body-move").offset().left)+"px")});$(document).mouseup(function(a){var b=$("#boxes");b.is(a.target)||0!==b.has(a.target).length||b.hide()});
document.querySelectorAll("#boxes .boxLabel").forEach(function(a){a.addEventListener("click",function(){document.querySelector("#boxSelection").textContent=a.textContent;document.querySelector(".moveForm .box").value=a.textContent;document.querySelector(".moveForm .hala").value=a.getAttribute("hala");$("#boxes").hide()})});window.addEventListener("resize",function(){$("#boxes").hide()});