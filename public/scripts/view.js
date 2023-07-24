var parentLocation = window.parent.document.location.href;
parentLocation = parentLocation.split("/");
parentLocation = parentLocation[parentLocation.length - 1];
parentLocation = parentLocation.split("?");
parentLocation = parentLocation[0];

var editState = false;

let fileObjects = {
    fileInput: document.querySelector(".input-file"),
    button: document.querySelector(".input-file-trigger")
}

function fileClick() {
    fileObjects.fileInput.click();
    return false;
}

function fileChange() {
    if (document.querySelector("#contractName").textContent == "") {
        document.querySelector(".file-label").classList.add("incarcaContract")
        document.querySelector(".file-label").classList.remove("schimbaContract")
        document.querySelector(".file-label").classList.remove("contractExistent")
        document.querySelector(".file-label").classList.remove("contractInexistent")
    } else {
        document.querySelector(".file-label").classList.remove("incarcaContract")
        document.querySelector(".file-label").classList.add("schimbaContract")
        document.querySelector(".file-label").classList.remove("contractExistent")
        document.querySelector(".file-label").classList.remove("contractInexistent")
    }
}

function fileDownload() {
    window.open("/contracts/" + document.querySelector("#contractName").textContent); //DE AJUSTAT CU DB
}


function positiveState() { //ENABLE EDIT
    if (editState != true) {
        editState = true;

        //smth else
        document.querySelectorAll(".boxContent input").forEach(item => {
            item.disabled = false;
        });

        //button.removeEventListener()
        //fileInpu.removeEventListener();

        if (document.querySelector("#contractName").textContent == "") {
            document.querySelector(".file-label").classList.add("incarcaContract")
            document.querySelector(".file-label").classList.remove("schimbaContract")
            document.querySelector(".file-label").classList.remove("contractExistent")
            document.querySelector(".file-label").classList.remove("contractInexistent")
        } else {
            document.querySelector(".file-label").classList.remove("incarcaContract")
            document.querySelector(".file-label").classList.add("schimbaContract")
            document.querySelector(".file-label").classList.remove("contractExistent")
            document.querySelector(".file-label").classList.remove("contractInexistent")
        }

        fileObjects.button.removeEventListener("click", fileDownload);
        fileObjects.button.addEventListener("click", fileClick);
        fileObjects.fileInput.addEventListener("change", fileChange);

        //HIDE VIEW BUTTONS!
        document.querySelector(".view-tab").classList.add("hide");
        document.querySelector(".edit-tab").classList.remove("hide");

        document.querySelector(".errorText").style.bottom = String(document.querySelector(".control").getBoundingClientRect().height + 15) + "px";

        document.querySelectorAll(".edit-tab .outerButton .buttonLogo").forEach(item => {
            fixSize(item);
        });

    }

}

function negativeState() { //DISABLE EDIT
    if (editState != false) {
        editState = false;

        //smth else
        document.querySelectorAll(".boxContent input").forEach(item => {
            item.disabled = true;
        });

        if (document.querySelector("#contractName").textContent == "") {
            document.querySelector(".file-label").classList.remove("incarcaContract")
            document.querySelector(".file-label").classList.remove("schimbaContract")
            document.querySelector(".file-label").classList.remove("contractExistent")
            document.querySelector(".file-label").classList.add("contractInexistent")
        } else {
            document.querySelector(".file-label").classList.remove("incarcaContract")
            document.querySelector(".file-label").classList.remove("schimbaContract")
            document.querySelector(".file-label").classList.add("contractExistent")
            document.querySelector(".file-label").classList.remove("contractInexistent")
        }


        fileObjects.button.removeEventListener("click", fileClick);
        fileObjects.fileInput.removeEventListener("change", fileChange);
        fileObjects.button.addEventListener("click", fileDownload);


    }

    document.querySelector(".view-tab").classList.remove("hide");
    document.querySelector(".edit-tab").classList.add("hide");

}


document.querySelector(".edit").addEventListener("click", function (event) {
    positiveState()
    return;
});

document.querySelector(".cancel").addEventListener("click", () => {
    negativeState();
    document.querySelector(".file-return").innerHTML = "";
    document.querySelector("#my-file").files = defaultFiles;

    return;
});

//=================
//Button logo dynamic size
var cw = $('.buttonLogo').height();
$('.buttonLogo').css({
    'width': cw + 'px'
});


//=================

/*
//INCARCA CONTRACT:
var fileInput  = document.querySelector( ".input-file" ),  
    button     = document.querySelector( ".input-file-trigger" ),
    the_return = document.querySelector(".file-return");

button.addEventListener( "click", function( event ) {
   fileInput.click();
   return false;
});

fileInput.addEventListener( "change", function( event ) {  
    the_return.innerHTML = this.value;  
});  

*/

var modal = document.querySelector(".actionModal")

var btn = document.querySelector(".action");

var span = document.getElementsByClassName("close");

btn.onclick = function () {
    modal.style.display = "block";
    document.querySelectorAll(".actionModal .outerButton .buttonLogo").forEach(item => {
        fixSize(item);
    });
}

for (let i = 0; i < span.length; i++)
    span[i].onclick = function () {
        modal.style.display = "none";
    }
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

//========================================PAY========================================
document.querySelector(".modal-body-pay .cancel").addEventListener("click", () => {
    let mains = document.querySelectorAll(".main");
    for (let i = 0; i < mains.length; i++) {
        mains[i].classList.remove("hide");
    }
    let pays = document.querySelectorAll(".pay");
    for (let i = 0; i < mains.length; i++) {
        pays[i].classList.add("hide");
    }

    document.querySelector(".modal-body-pay.pay .message").style.display = "none";

});

document.querySelector(".modal-body-main .achitare").addEventListener("click", () => {
    let mains = document.querySelectorAll(".main");
    for (let i = 0; i < mains.length; i++) {
        mains[i].classList.add("hide");
    }
    let pays = document.querySelectorAll(".pay");
    for (let i = 0; i < mains.length; i++) {
        pays[i].classList.remove("hide");
    }
    document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(item => {
        fixSize(item);
    });
});


//========================================CHANGE PRICE========================================

document.querySelector(".modal-body-main .modificare").addEventListener("click", () => {
    let mains = document.querySelectorAll(".main");
    for (let i = 0; i < mains.length; i++) {
        mains[i].classList.add("hide");
    }
    let adjusts = document.querySelectorAll(".adjust");
    for (let i = 0; i < mains.length; i++) {
        adjusts[i].classList.remove("hide");
    }
    document.querySelectorAll(".edit-tab .outerButton .buttonLogo").forEach(item => {
        fixSize(item);
    });

    document.querySelectorAll(".modal-body-adjust .outerButton .buttonLogo").forEach(item => {
        fixSize(item);
    });
});

document.querySelector(".modal-body-adjust .cancel").addEventListener("click", () => {
    let mains = document.querySelectorAll(".main");
    for (let i = 0; i < mains.length; i++) {
        mains[i].classList.remove("hide");
    }
    let adjusts = document.querySelectorAll(".adjust");
    for (let i = 0; i < mains.length; i++) {
        adjusts[i].classList.add("hide");
    }
});


//========================================MOVE========================================

document.querySelector(".modal-body-main .mutare").addEventListener("click", () => {
    let mains = document.querySelectorAll(".main");
    for (let i = 0; i < mains.length; i++) {
        mains[i].classList.add("hide");
    }
    let moves = document.querySelectorAll(".move");
    for (let i = 0; i < moves.length; i++) {
        moves[i].classList.remove("hide");
    }

    document.querySelectorAll(".modal-body-move .outerButton .buttonLogo").forEach(item => {
        fixSize(item);
    });
});

document.querySelector(".modal-body-move .cancel").addEventListener("click", () => {
    let mains = document.querySelectorAll(".main");
    for (let i = 0; i < mains.length; i++) {
        mains[i].classList.remove("hide");
    }
    let moves = document.querySelectorAll(".move");
    for (let i = 0; i < moves.length; i++) {
        moves[i].classList.add("hide");
    }
});



//auto set logo

function isHidden(el) {
    return (el.offsetParent === null)
}

document.querySelectorAll(".buttonLogo").forEach(item => {
    if (!isHidden(item)) {
        item.style.margin = String((item.parentElement.offsetHeight - item.offsetHeight) / 2) + "px";
        item.style.width = String(item.offsetHeight) + "px";
    }
});

window.addEventListener("resize", () => {
    document.querySelectorAll(".buttonLogo").forEach(item => {
        if (!isHidden(item)) {
            item.style.margin = String((item.parentElement.offsetHeight - item.offsetHeight) / 2) + "px";
            item.style.width = String(item.offsetHeight) + "px";
        }
    })
});

function fixSize(item) {
    if (!isHidden(item)) {
        item.style.width = String(item.offsetHeight) + "px";
        item.style.margin = String((item.parentElement.offsetHeight - item.offsetHeight) / 2) + "px";
    }
}

if (document.querySelector("#contractName").textContent == "") {
    document.querySelector(".file-label").classList.remove("incarcaContract")
    document.querySelector(".file-label").classList.remove("schimbaContract")
    document.querySelector(".file-label").classList.remove("contractExistent")
    document.querySelector(".file-label").classList.add("contractInexistent")
} else {
    document.querySelector(".file-label").classList.remove("incarcaContract")
    document.querySelector(".file-label").classList.remove("schimbaContract")
    document.querySelector(".file-label").classList.add("contractExistent")
    document.querySelector(".file-label").classList.remove("contractInexistent")
}

var defaultFiles = document.querySelector("#my-file").files;
fileObjects.button.addEventListener("click", fileDownload);

//================================================================
//=========================CONFORM BUTTONS========================
//================================================================



//============================FROM PAY============================
document.querySelector(".pay .confirm").addEventListener("click", (e) => {

    //check form
    let valid = true;
    document.querySelectorAll("#payForm input").forEach(item => {
        let v = item.checkValidity();
        if (!v) {
            document.querySelector(".modal-body-pay.pay .message").style.display = "block";
            valid = false;
        }
    });



    if (valid) {
        let mains = document.querySelectorAll(".check");
        for (let i = 0; i < mains.length; i++) {
            mains[i].classList.remove("hide");
        }

        var el = document.querySelector('.check .confirm'),
            elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);


        document.querySelector(".check .confirm").addEventListener("click", () => {
            submitRouter("pay", document.querySelector("#payForm"), true);
        });

        let pays = document.querySelectorAll(".pay");
        for (let i = 0; i < mains.length; i++) {
            pays[i].classList.add("hide");
        }

        document.querySelectorAll(".check .outerButton .buttonLogo").forEach(item => {
            fixSize(item);
        });

    }

    document.querySelectorAll(".check .outerButton .buttonLogo").forEach(item => {
        fixSize(item);
    });

    el = document.querySelector('.check .cancel'),
        elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);

    document.querySelector(".check .cancel").addEventListener("click", (e) => {

        let mains = document.querySelectorAll(".check");
        for (let i = 0; i < mains.length; i++) {
            mains[i].classList.add("hide");
        }

        let pays = document.querySelectorAll(".pay");
        for (let i = 0; i < mains.length; i++) {
            pays[i].classList.remove("hide");
        }
        document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(item => {
            fixSize(item);
        });

    })

});





//============================FROM ADJUST============================
document.querySelector(".adjust .confirm").addEventListener("click", (e) => {

    //check form
    let valid = true;
    document.querySelectorAll("#adjustForm input").forEach(item => {
        v = true;
        try {
            let value = parseInt(item.value);
            if (value < 0)
                v = false;
        } catch (e) {
            return;
        }
        if (!v) {
            item.classList.add("absInvalid")
            valid = false;
        }
    });

    if (valid) {
        let mains = document.querySelectorAll(".check");
        for (let i = 0; i < mains.length; i++) {
            mains[i].classList.remove("hide");
        }

        var el = document.querySelector('.check .confirm'),
            elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);

        document.querySelector(".check .confirm").addEventListener("click", () => {
            submitRouter("adjust", document.querySelector("#adjustForm"), true);
        });

        let pays = document.querySelectorAll(".adjust");
        for (let i = 0; i < mains.length; i++) {
            pays[i].classList.add("hide");
        }

        document.querySelectorAll(".check .outerButton .buttonLogo").forEach(item => {
            fixSize(item);
        });
    }

    document.querySelectorAll(".modal-body-adjust .outerButton .buttonLogo").forEach(item => {
        fixSize(item);
    });


    el = document.querySelector('.check .cancel'),
        elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);

    document.querySelector(".check .cancel").addEventListener("click", (e) => {

        let mains = document.querySelectorAll(".check");
        for (let i = 0; i < mains.length; i++) {
            mains[i].classList.add("hide");
        }

        let pays = document.querySelectorAll(".adjust");
        for (let i = 0; i < mains.length; i++) {
            pays[i].classList.remove("hide");
        }

        document.querySelectorAll(".modal-body-adjust .outerButton .buttonLogo").forEach(item => {
            fixSize(item);
        });

    })

})




//============================FROM MOVE============================
document.querySelector(".move .confirm").addEventListener("click", (e) => {

    //check form
    let valid = true;
    document.querySelectorAll("#moveForm input").forEach(item => {
        let v = item.checkValidity();
        if (!v) {
            item.classList.add("invalid")
            valid = false;
        }
    });

    if (valid) {
        let mains = document.querySelectorAll(".check");
        for (let i = 0; i < mains.length; i++) {
            mains[i].classList.remove("hide");
        }

        var el = document.querySelector('.check .confirm'),
            elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);

        document.querySelector(".check .confirm").addEventListener("click", () => {
            submitRouter("move", document.querySelector("#moveForm"), true);
        });

        let pays = document.querySelectorAll(".move");
        for (let i = 0; i < mains.length; i++) {
            pays[i].classList.add("hide");
        }

        document.querySelectorAll(".check .outerButton .buttonLogo").forEach(item => {
            fixSize(item);
        });
    }

    document.querySelectorAll(".modal-body-move .outerButton .buttonLogo").forEach(item => {
        fixSize(item);
    });

    el = document.querySelector('.check .cancel'),
        elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);

    document.querySelector(".check .cancel").addEventListener("click", (e) => {

        let mains = document.querySelectorAll(".check");
        for (let i = 0; i < mains.length; i++) {
            mains[i].classList.add("hide");
        }

        let pays = document.querySelectorAll(".move");
        for (let i = 0; i < mains.length; i++) {
            pays[i].classList.remove("hide");
        }

        document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(item => {
            fixSize(item);
        });

    })

})



//============================FROM CLEAR========================================================

document.querySelector(".main .eliberare").addEventListener("click", (e) => {

    let mains = document.querySelectorAll(".check");
    for (let i = 0; i < mains.length; i++) {
        mains[i].classList.remove("hide");
    }

    var el = document.querySelector('.check .confirm'),
        elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);

    document.querySelector(".check .confirm").addEventListener("click", () => {
        submitRouter("clear", "", true);
    });

    let pays = document.querySelectorAll(".main");
    for (let i = 0; i < mains.length; i++) {
        pays[i].classList.add("hide");
    }
    document.querySelectorAll(".modal-body-main .outerButton .buttonLogo").forEach(item => {
        fixSize(item);
    });

    document.querySelectorAll(".check .outerButton .buttonLogo").forEach(item => {
        fixSize(item);
    });


    el = document.querySelector('.check .cancel'),
        elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);

    document.querySelector(".check .cancel").addEventListener("click", (e) => {

        let mains = document.querySelectorAll(".check");
        for (let i = 0; i < mains.length; i++) {
            mains[i].classList.add("hide");
        }

        let pays = document.querySelectorAll(".main");
        for (let i = 0; i < mains.length; i++) {
            pays[i].classList.remove("hide");
        }

        document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(item => {
            fixSize(item);
        });

    })

})


//================================================================================================================

function submitRouter(source, form = "", valid = false) {

    if (source == "pay") {

        //send form
        if (valid) {
            form.submit();
        }
    }

    if (source == "adjust") {

        //send form
        if (valid) {
            form.submit();
        }
    }
    if (source == "move") {


        let whichBox = document.querySelector(".header .identificator").textContent;
        let theBox = window.parent.document.querySelector(`.${whichBox}`);
        theBox.classList.remove("boxa-ocupata");
        theBox.classList.add("boxa-libera");

        whichBox = form.querySelector(".box").value;
        theBox = window.parent.document.querySelector(`.${whichBox}`);
        if (document.querySelector(".boxData #boxForm .Name") != "") {
            try {
                theBox.classList.remove("boxa-libera");
                theBox.classList.add("boxa-ocupata");
            } catch (err) {}
        }
        //send form
        if (valid) {
            form.submit();
        }
    }
    if (source == "clear") {

        let whichBox = document.querySelector(".header .identificator").textContent;
        let theBox = window.parent.document.querySelector(`.${whichBox}`);
        theBox.classList.remove("boxa-ocupata");
        theBox.classList.add("boxa-libera");

        let form = document.createElement("form");
        document.body.appendChild(form);
        form.style.display = "none";
        form.method = "POST";
        form.action = '/' + parentLocation + '/box/' + document.querySelector("body .header .identificator").textContent + "/remove";
        form.submit();

    }

}


//================================================================
//================================================================

//BOX FORM:

document.querySelector(".boxContent .control-wrap .confirm").addEventListener("click", (e) => {
    //check form
    let valid = true;
    document.querySelectorAll(".boxData .field").forEach(item => {
        let v = item.checkValidity();
        if (!v) {
            item.classList.add("invalid")
            valid = false;
        }
    });

    if (valid) {
        modal.style.display = "block";

        let mains = document.querySelectorAll(".check");
        for (let i = 0; i < mains.length; i++) {
            mains[i].classList.remove("hide");
        }

        var el = document.querySelector('.check .confirm'),
            elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);

        var el = document.querySelector('.check .cancel'),
            elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);

        document.querySelector(".check .confirm").addEventListener("click", () => {

            if (document.querySelector("#fileForm input").value != "") {
                document.querySelector(".hiddenName").value = document.querySelector(".Name").value;
                document.querySelector(".hiddenPhone").value = document.querySelector(".Phone").value;
                document.querySelector(".hiddenEmail").value = document.querySelector(".Email").value;
                let whichBox = document.querySelector(".header .identificator").textContent;
                let theBox = window.parent.document.querySelector(`.${whichBox}`);
                theBox.classList.remove("boxa-libera");
                theBox.classList.add("boxa-ocupata")
                document.querySelector("#fileForm").submit();
            } else {
                let whichBox = document.querySelector(".header .identificator").textContent;
                let theBox = window.parent.document.querySelector(`.${whichBox}`);
                if (document.querySelector(".boxData #boxForm .Name") != "") {
                    theBox.classList.remove("boxa-libera");
                    theBox.classList.add("boxa-ocupata")
                }
                document.querySelector("#boxForm").submit();
            }


            let mains = document.querySelectorAll(".check");
            for (let i = 0; i < mains.length; i++) {
                mains[i].classList.add("hide");
            }

            let pays = document.querySelectorAll(".main");
            for (let i = 0; i < mains.length; i++) {
                pays[i].classList.remove("hide");
            }

            document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(item => {
                fixSize(item);
            });

            modal.style.display = "none";
        });

        document.querySelector(".check .cancel").addEventListener("click", () => {

            let mains = document.querySelectorAll(".check");
            for (let i = 0; i < mains.length; i++) {
                mains[i].classList.add("hide");
            }

            let pays = document.querySelectorAll(".main");
            for (let i = 0; i < mains.length; i++) {
                pays[i].classList.remove("hide");
            }

            document.querySelectorAll(".modal-body-pay .outerButton .buttonLogo").forEach(item => {
                fixSize(item);
            });

            modal.style.display = "none";

        });

        let pays = document.querySelectorAll(".main");
        for (let i = 0; i < mains.length; i++) {
            pays[i].classList.add("hide");
        }

        document.querySelectorAll(".check .outerButton .buttonLogo").forEach(item => {
            fixSize(item);
        });

    }

});

let currentData = {
    nume: document.querySelector(".field.Name").value,
    telefon: document.querySelector(".field.Phone").value,
    email: document.querySelector(".field.Email").value
}

document.querySelector(".control .outerButton.reset").addEventListener("click", (e) => {
    document.querySelector(".field.Name").value = currentData.nume;
    document.querySelector(".field.Phone").value = currentData.telefon;
    document.querySelector(".field.Email").value = currentData.email;
})


const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

try {
    if(window.innerWidth>800)
    document.querySelector(".alert").style.bottom = "" + (.02 * vh + 1.4*document.querySelector(".control").offsetHeight-5) + "px";
    else
    document.querySelector(".alert").style.bottom = "" + (.02 * vh + 1.1*document.querySelector(".control").offsetHeight-5) + "px";
} catch (err) {}

window.addEventListener("resize", (e) => {

    try {
        if(window.innerWidth>800)
        document.querySelector(".alert").style.bottom = "" + (.02 * vh + 1.4*document.querySelector(".control").offsetHeight-5) + "px";
        else
        document.querySelector(".alert").style.bottom = "" + (.02 * vh + 1.1*document.querySelector(".control").offsetHeight-5) + "px";
    } catch (err) {}

})

try{
    document.querySelector(".alert .bx.bx-x").addEventListener("click",(e)=>{
        try{
            e.target.parentElement.parentElement.style.opacity = "0";
            setTimeout(function(){ e.target.parentElement.parentElement.style.display = "none"; }, 600);
        }
        catch(e){}
    })
}catch(err){}

setTimeout(function(){
try{
    document.querySelector(".alert").style.opacity = "0";
    setTimeout(function(){ document.querySelector(".alert").style.display = "none"; }, 600);
}catch(e){}
}, 5000);

document.addEventListener("click", removeAlertClick);
function removeAlertClick(evt){
    try{
    const flyoutElement = document.querySelector(".alert");
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement == flyoutElement) {
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.

    document.querySelector(".alert").style.opacity = "0";
    setTimeout(function(){ document.querySelector(".alert").style.display = "none"; }, 600);
    document.removeEventListener("click", removeAlertClick);}
    catch(err){}
}
