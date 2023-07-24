const Box = require("./box7");
const Evidenta = require("./evidenta7");

var labels = "E1 E2 E3 E0 S1 S2 S3 S4 S5 S6 S7 S8 S9 D1 D2 D3 D4 D5 D6 D7";
var sizes = {
	S1: "3x2",
	S2: "3x2",
	S3: "3x2",
	S4: "3x2",
	S5: "3x2",
	S6: "3x2",
	S7: "3x2",
	S8: "3x2",
	S9: "3x2",
	D1: "2x2",
	D2: "2x2",
	D3: "2x2",
	D4: "2x2",
	D5: "2x2",
	D6: "2x2",
	D7: "2x2",
	E1: "2x4",
	E2: "2x3",
	E3: "2x4",
	E4: "5.8x12",
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
