//evidenta si entitatea boxelor pe care vrem sa le creem
//actualizam hala 5= box5 si evidenta5
const Box = require("./box5");
const Evidenta = require("./evidenta5");

let labels = "TE22 TE23 TP22 TP23";
let sizes = {
	TE22: "2x4",
	TE23: "2x4",
	TP22: "2x3",
	TE23: "2x3",
};

labels = labels.split(" ");
var data = [];

labels.forEach((box) => {
	data.push({
		identificator: box,
		nume: "",
		telefon: "",
		email: "",
		pretCurent: "1000",
		achitari: [],
		contract: "",
	});
});

function seed() {
	data.forEach((box) => {
		Box.create(
			{
				identificator: box.identificator,
				nume: box.nume,
				telefon: box.telefon,
				email: box.email,
				pretCurent: box.pretCurent,
				achitari: box.achitari,
				contract: box.contract,
			},
			(err, box) => {
				if (err) console.log(err);
				else {
					console.log("boxa creata");

					console.log("inregistrare stearsa!");

					Evidenta.create(
						{
							identificator: String(box.identificator),
							liber: true,
							dimensiune: sizes[String(box.identificator)],
						},
						(err, ev) => {
							if (err) {
								console.log(err);
							} else {
								console.log("boxa inregistrata!");
							}
						}
					);
				}
			}
		);
	});
}

module.exports = seed;
