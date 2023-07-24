const Box = require("./box8");
const Evidenta = require("./evidenta8");

var labels = "S0 S1 S2 S3 S4 S5 D1 D2 D3 D4 D5 D6 D7 E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 E11 E12 E13 E14 E15 E16 E17 E18 E19 E20 E21 E22 E23";
var sizes = {
	S0: "5.7x2.8",
	S1: "6x2",
	S2: "6x2",
	S3: "6x2",
	S4: "6x2",
	S5: "4x1",
	D1: "2.5x2",
	D2: "2.5x2",
	D3: "4x2",
	D4: "4x2",
	D5: "4x2",
	D6: "4x2",
	D7: "4x2",
	E1: "3.2x3",
	E2: "3.2x3",
	E3: "1.2x2",
	E4: "2x2",
	E5: "2x2",
	E6: "2x2",
	E7: "2x2",
	E8: "2x2",
	E9: "1x2",
	E10: "2x2",
	E11: "2x2",
	E12: "2x2",
	E13: "2x2",
	E14: "1x2",
	E15: "2x2",
	E16: "2x2",
	E17: "2x2",
	E18: "2x2",
	E19: "3.8x2",
	E20: "3.8x2",
	E21: "3.8x2",
	E22: "3.8x2",
	E23: "3.8x2",
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
	Box.remove({}, (err) => {
		if (err) {
			console.log(err);
		}
		console.log("removed boxes!");

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

						Evidenta.remove({}, (err) => {
							if (err) console.log(err);

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
						});
					}
				}
			);
		});
	});
}

module.exports = seed;
