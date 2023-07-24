const Box = require("./box5");
const Evidenta = require("./evidenta5");

var labels = "TP1 TP2 TP3 TP4 TP5 TP6 TP7 TP8 TP9 TP10 TP11 TP12 TP13 TP14 TP15 TP16 TP17 TP18 TP19 TP20 TP21 TE1 TE2 TE3 TE4 TE5 TE6 TE7 TE8 TE9 TE10 TE11 TE12 TE13 TE14 TE15 TE16 TE17 TE18 TE19 TE20 TE21";
var sizes={
TE1:"2x2",
TE2:"2x2",
TE3:"2x2",
TE4:"2x2",
TE5:"2x2",
TE6:"2x2",
TE7:"2x2",
TE8:"2x2",
TE9:"2x2",
TE10:"2x5",
TE11:"2x5",
TE12:"2x5",
TE13:"2x5",
TE14:"2x5",
TE15:"2x5",
TE16:"2x5",
TE17:"2x5",
TE18:"2x4",
TE19:"2x4",
TE20:"2x4",
TE21:"2x4",
TP1:"2.5x2",
TP2:"2.5x2",
TP3:"2.5x2",
TP4:"2.5x2",
TP5:"2.5x2",
TP6:"2.5x2",
TP7:"2.5x2",
TP8:"2.5x2",
TP9:"2.5x2",
TP10:"2x5",
TP11:"2x5",
TP12:"2x5",
TP13:"2x5",
TP14:"2x5",
TP15:"2x5",
TP16:"2x5",
TP17:"2x5",
TP18:"2x3",
TP19:"2x3",
TP20:"2x3",
TP21:"2x3"
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