const Box = require("./box3");
const Evidenta = require("./evidenta3");

var labels = "Birou0 Birou1 B1 B2 B3 B4 B5 B6 B7 B8 B9 B10 B11 B12 B13 B14 B15 B16 B17 B18 B19 B20 E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 E11 E12 E13 E14 E15 E16 E18 E19 C1 C2 C3 C4 C5 C6 C7 C8";
var sizes = {
    Birou0: "2x4",
    B14: "2x4",
    B13: "2x4",
    B12: "2x4",
    B11: "2x4",
    B10: "2x4",
    B9: "2x4",
    B8: "2x5",
    B7: "2x5",
    B6: "2x5",
    B5: "2x5",
    B4: "2x5",
    B3: "2x5",
    B2: "2x5",
    B1: "2x5",
    B15: "2x5.7",
    B16: "2x5.7",
    B17: "2x5.7",
    B18: "2x5.7",
    B19: "2x5.7",
    B20: "2x5.7",
    Birou1: "2x4",
    E16: "2x4",
    E15: "2x4",
    E14: "2x4",
    E13: "2x4",
    E10: "2x4",
    E9: "2x4",
    E1: "2x5",
    E2: "2x5",
    E3: "2x5",
    E4: "2x5",
    E5: "2x5",
    E6: "3x5",
    E7: "2x5",
    E8: "2x5",
    E11: "2x3",
    E12: "2x3",
    E18: "2x3",
    E19: "2x3",
    C1: "2x2",
    C2: "2x2",
    C3: "2x2",
    C4: "2x2",
    C5: "2x2",
    C6: "2x2",
    C7: "2x2",
    C8: "2x2"
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