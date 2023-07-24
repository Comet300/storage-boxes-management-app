const defaultIconColor = '#adadad';
const focusLoginIconColor = 'rgb(54, 209, 220)';
const focusRegisterIconColor = '#ff5f6d';

(function () {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("err")) {
        let value = urlParams.get("err");
        if (value == "auth") {
            document.querySelector(".form-err").textContent = "Numele de utilizator sau parola sunt incorecte";
            document.querySelector(".form-err").style.marginBottom = "20px";
        } else if (value == "userExists") {
            document.querySelector(".form-err").textContent = "Exista deja un cont cu acest nume de utilizator";
            document.querySelector(".form-err").style.marginBottom = "20px";
        } else if (value == "emailExists") {
            document.querySelector(".form-err").textContent = "Adresa de email este deja asociata unui cont";
            document.querySelector(".form-err").style.marginBottom = "20px";
        } else if (value== "notVerified"){
            document.querySelector(".form-err").textContent = "Contul nu a fost verificat. Asteptai ca administratorul sa va aprobe contul.";
            document.querySelector(".form-err").style.marginBottom = "20px";
        }
    } else if (urlParams.has("msg")) {
        let value = urlParams.get("msg");
        if (value == "verify") {
            document.querySelector(".form-msg").textContent = "Un email a fost trimis."
        } else if (value == "passSuccess") {
            document.querySelector(".form-msg").textContent = "Parola a fost schimbata cu succes!"
        }
    }
})();

document.querySelectorAll(".authWrap input").forEach(el => {
    el.addEventListener('focus', (e) => {
        let icon = e.target.parentElement.querySelector("svg");
        icon.style.fill = focusLoginIconColor;
        e.target.parentElement.classList.add("change");
    })
    el.addEventListener('blur', (e) => {
        let icon = e.target.parentElement.querySelector("svg");
        icon.style.fill = defaultIconColor;
        e.target.parentElement.classList.remove("change");
    })
})


if (document.querySelector(".resetWrap form div.submit"))
    document.querySelector(".resetWrap form div.submit").addEventListener("click", e => {
        const form = document.querySelector(".resetWrap form");
        const pass1 = document.querySelector("#resetPass");
        const pass2 = document.querySelector("#confirmResetPass");
        let valid = true;
        if (pass1.value !== pass2.value) {
            valid = false;
            document.querySelector(".form-err").textContent = "Parolele nu coincid";
            document.querySelector(".form-err").style.marginBottom = "20px";
            return;
        }
        if (valid)
            form.submit();
    });


if (document.querySelector(".registerWrap form div.submit"))
    document.querySelector(".registerWrap form div.submit").addEventListener("click", e => {
        console.log("hi!");
        const form = document.querySelector(".registerWrap form");
        const pass1 = document.querySelector("#pass");
        const pass2 = document.querySelector("#confirmPass");
        let valid = true;
        if (pass1.value !== pass2.value) {
            let labelParola = document.querySelector(`.authWrap label[for=${pass1.attributes.name.value}]`).childNodes[1];
            let labelConfirmParola = document.querySelector(`.authWrap label[for=${pass2.attributes.name.value}]`).childNodes[1];
            labelParola.textContent = "parolele nu coincid";
            labelConfirmParola.textContent = "parolele nu coincid";
            return;
        }
        form.querySelectorAll("input").forEach(item => {
            if (!item.checkValidity()) {
                valid = false;
                let label = document.querySelector(`.authWrap label[for=${item.attributes.name.value}]`).childNodes[1];
                label.textContent = item.validationMessage;
                console.log(new URLSearchParams(window.location.search).getAll("id"));
            } else {
                let label = document.querySelector(`.authWrap label[for=${item.attributes.name.value}]`).childNodes[1];
                label.textContent = "";
            }
        });

        if (valid)
            form.submit();

    })

console.log('hi')