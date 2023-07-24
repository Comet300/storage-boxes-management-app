$('.modal-body-move input').keypress(function (e) {
    e.preventDefault();
});

$("#boxSelection").click(function (e) {
    var container = $("#boxes");
    container.show();

    const value = 10;

    if (window.innerWidth > 390) {
        $(".limitBox")[0].style.top = String($('#boxSelection').offset().top - $('.modal-body-move').offset().top) + "px";
        $(".limitBox")[0].style.left = String($('#boxSelection').offset().left - $('.modal-body-move').offset().left + $("#boxSelection")[0].getBoundingClientRect().width + value) + "px";
    } else {
        $(".limitBox")[0].style.top = String($('#boxSelection').offset().top - $('.modal-body-move').offset().top + $("#boxSelection")[0].getBoundingClientRect().height + value) + "px";
        $(".limitBox")[0].style.left = String($('#boxSelection').offset().left - $('.modal-body-move').offset().left) + "px";
    }
});

$(document).mouseup(function (e) {
    var container = $("#boxes");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});

    document.querySelectorAll("#boxes .boxLabel").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector("#boxSelection").textContent = item.textContent;
            document.querySelector(".moveForm .box").value = item.textContent;
            document.querySelector(".moveForm .hala").value=item.getAttribute("hala");
            $("#boxes").hide();
        })
    });

    window.addEventListener("resize", () => {
        $("#boxes").hide();
    })
