const Box = require("./box2");
const Evidenta = require("./evidenta2");

var labels = "B1 B2 B3 B4 B5 B6 B7 E1 E2 E3 E4 E5 E6 E7 E8";
var sizes={
    B1:"4x2",
    B2:"5x2",
    B3:"6x2",
    B4:"4x1.7",
    B5:"6x2",
    B6:"5x2",
    B7:"4x2",
    E1:"4x2",
    E2:"5x2",
    E3:"6x2",
    E4:"4x1.7",
    E5:"6x2",
    E6:"5x2",
    E7:"4x2",
    E8:"3x1.7"
}

labels = labels.split(" ");
var data = [];

labels.forEach(box => {
    data.push({
        identificator: box,
        nume: "",
        telefon: "",
        email: "",
        pretCurent: '1000',
        achitari: [],
        contract: "",
    })
});


function seed() {

    Box.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("removed boxes!")

        data.forEach(box => {

            Box.create({
                identificator: box.identificator,
                nume: box.nume,
                telefon: box.telefon,
                email: box.email,
                pretCurent: box.pretCurent,
                achitari: box.achitari,
                contract: box.contract,
            }, (err, box) => {
                if (err)
                    console.log(err)
                else {
                    console.log("boxa creata");

                    Evidenta.remove({}, (err) => {
                        if (err)
                            console.log(err)

                        console.log("inregistrare stearsa!");

                        Evidenta.create({
                            identificator: String(box.identificator),
                            liber: true,
                            dimensiune:sizes[String(box.identificator)]
                        }, (err, ev) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("boxa inregistrata!");
                            }
                        })
                    })


                }
            });

        })
    });

}

module.exports = seed;