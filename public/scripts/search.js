var parentLocation = window.parent.document.location.href;
parentLocation = parentLocation.split("/");
parentLocation = parentLocation[parentLocation.length - 1];

$("#search").click(function () {
   $("#Modal").show();
});

$("#close").click(function () {
   $('#Modal').hide();
});

$(".message").click(function () {
   //document.location.href="/view/"+String(this.querySelector(".message-avatar .text").textContent);
   let path = "/"+parentLocation+"/view/" + String(this.querySelector(".message-avatar .text").textContent);

   let form = document.createElement("form");
   document.body.appendChild(form);
   form.style.display = "none";
   form.method = "GET";
   form.action = path;
   form.submit();
});

document.querySelector(".searchbox input").addEventListener("keyup", (e) => {
   if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById("search").click();
   }
});

document.querySelector("#Modal").style.top = String(document.querySelector(".searchbox").getBoundingClientRect().y + document.querySelector(".searchbox").getBoundingClientRect().height + 5) + "px"

window.addEventListener("resize", () => {
   document.querySelector("#Modal").style.top = String(document.querySelector(".searchbox").getBoundingClientRect().y + document.querySelector(".searchbox").getBoundingClientRect().height + 5) + "px"
});