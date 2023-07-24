const Box = require("./box4");
const Evidenta = require("./evidenta4");

var labels = "E1S E2S E3S E4S E5S E6S E7S E8S E8C E9C E10C E11C E12C E13C E14C E15C E16C E17C E18C E19C E20C E21C E1D E2D E3D E4D E5D E6D E7D E8D E9D E10D E11D E12D E13D E14D S0 S1 S2 S3 S4 S5 S6 S7 S8 C1 C2 C3 C4 C5 C6 C7 D1 D2 D3 D4 D5 D6 D7";
var sizes={
    S0:"2x5",
    S1:"2x5",
    S2:"2x5",
    S3:"2x5",
    S4:"2x5",
    S5:"2x5",
    S6:"2x5",
    S7:"2x5",
    S8:"2x5",
    C1:"2x4",
    C2:"2x4",
    C3:"2x4",
    C4:"2x4",
    C5:"2x4",
    C6:"2x4",
    C7:"2x4",
    D1:"2x5",
    D2:"2x5",
    D3:"2x5",
    D4:"2x5",
    D5:"2x5",
    D6:"2x5",
    D7:"2x5",
    E1S:"4x5",
    E2S:"2x5",
    E3S:"2x5",
    E4S:"2x5",
    E5S:"2x5",
    E6S:"2x5",
    E7S:"2x5",
    E8S:"2x5",
    E9C:"2x2",
    E10C:"2x2",
    E11C:"2x2",
    E12C:"2x2",
    E13C:"2x2",
    E14C:"2x2",
    E15C:"2x2",
    E16C:"2x2",
    E17C:"2x2",
    E18C:"2x2",
    E19C:"2x2",
    E20C:"2x2",
    E21C:"2x2",
    E8C:"2x2",
    E1D:"2x2",
    E2D:"2x2",
    E3D:"2x2",
    E4D:"2x2",
    E5D:"2x2",
    E6D:"2x2",
    E7D:"2x2",
    E8D:"2x2",
    E9D:"2x2",
    E10D:"2x2",
    E11D:"2x2",
    E12D:"2x2",
    E13D:"2x2",
    E14D:"2x2",
    E1:"2x2",
    E2:"2x2",
    E3:"2x2",
    E4:"3x2",
    DE1:"2x2",
    DE2:"2x2"
}

var labelsTmp = "E1 E2 E3 E4 DE1 DE2 E0 D9 D8";

var sizesTmp={
    E1:"2x2",
    E2:"2x2",
    E3:"2x2",
    E4:"3x2",
    DE1:"2x2",
    DE2:"2x2",
    E0:"4x2",
    D9:"2x2",
    D8:"2x2"
}

labelsTmp = labelsTmp.split(" ");
var data = [];

labelsTmp.forEach(box => {
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

function seed(){
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

                    Evidenta.create({
                        identificator: String(box.identificator),
                        liber: true,
                        dimensiune:sizesTmp[String(box.identificator)]
                    }, (err, ev) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("boxa inregistrata!");
                        }
                    })


            }
        });

    })
}

/*
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
*/
module.exports = seed;