const Box = require("./box1");
const Evidenta = require("./evidenta1");

var labels = "Birou0 Birou1 E1D E1S E2D E2S E3D E3S E4D E4S E5D E5S E6D E6S E7D E7S E8S E9S P0S P1D P1S P2D P2S P3D P3S P4D P4S P5D P5S P6D P6S P7D P7S P8S P9S";
var sizes={
    P0S:"1x5",
    E1S:"3x5",
    P1D:"2x5",
    P2D:"2x5",
    P3D:"2x5",
    P4D:"2x5",
    P5D:"2x5",
    P6D:"2x5",
    P7D:"2x5",
    P1S:"2x5",
    P2S:"2x5",
    P3S:"2x5",
    P4S:"2x5",
    P5S:"2x5",
    P6S:"2x5",
    P7S:"2x5",
    P8S:"2x5",
    P9S:"2x5",
    E1S:"2x5",
    E2S:"2x5",
    E3S:"2x5",
    E4S:"2x5",
    E5S:"2x5",
    E6S:"2x5",
    E7S:"2x5",
    E8S:"2x5",
    E9S:"2x5",
    E1D:"2x5",
    E2D:"2x5",
    E3D:"2x5",
    E4D:"2x5",
    E5D:"2x5",
    E6D:"2x5",
    E7D:"2x5",
    Birou0:"3x3",
    Birou1:"3x3"
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