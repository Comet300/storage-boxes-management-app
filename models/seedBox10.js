const Box = require("./box10");
const Evidenta = require("./evidenta10");

var labels =
	"S1 S2 S3 S4 S5 S6 S7 S8 S9 S10 S11 S12 D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 C1 C2 C3 C4 C5 C6 C7 C8 C9 C10 C11 C12 C13 C14 C15 C16 C17 C18 E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 E11 E12 E13 E14 E15 E16 E17 E18 E19 E20 E21 E22 E23 E24 E25 E26 E27 E28 E29 E30 E31 E32 E33 E34 E35 E36 E37 E38 E39 E40 E41 E42 E43 E44 E45 E46 E47 E48 E49 E50 E51 E52 E53 E54 E55 E56 E57 E58 E59 E60 E61 E62 E63";
var sizes = {
	S1: "1.7x4",
	S2: "2x4",
	S3: "2x4",
	S4: "2x4",
	S5: "2x4",
	S6: "2x4",
	S7: "2x4",
	S8: "2x4",
	S9: "2x4",
	S10: "2x4",
	S11: "2x4",
	S12: "2x4",
	C1: "2x2",
	C2: "2x2",
	C3: "2x2",
	C4: "2x2",
	C5: "2x2",
	C6: "2x2",
	C7: "2x2",
	C8: "2x2",
	C9: "2x2",
	C10: "2x2",
	C11: "2x2",
	C12: "2x2",
	C13: "2x2",
	C14: "2x2",
	C15: "2x2",
	C16: "2x2",
	C17: "2x2",
	C18: "2x2",
	D1: "1.7x4.5",
	D2: "2x4.5",
	D3: "2x4.5",
	D4: "2x4.5",
	D5: "2x4.5",
	D6: "2x4.5",
	D7: "2x4.5",
	D8: "2x4.5",
	D9: "2x4.5",
	D10: "2x4.5",
	D11: "2x4.5",
	D12: "2x4.5",
	E1: "1.7x2",
	E2: "2x2",
	E3: "2x2",
	E4: "2x2",
	E5: "2x2",
	E6: "2x2",
	E7: "2x2",
	E8: "2x2",
	E9: "2x2",
	E10: "2x2",
	E11: "2x2",
	E12: "2x2",
	E13: "2x2",
	E14: "2x2",
	E15: "2x2",
	E16: "2x2",
	E17: "2x2",
	E18: "2x2",
	E19: "2x2",
	E20: "2x2",
	E21: "2x2",
	E22: "2x2",
	E23: "2x2",
	E24: "2x2",
	E25: "2x2",
	E26: "2x2",
	E27: "2x2",
	E28: "2x2",
	E29: "2x2",
	E30: "2x2",
	E31: "2x2",
	E32: "2x2",
	E33: "2x2",
	E34: "2x2",
	E35: "2x2",
	E36: "2x2",
	E37: "2x2",
	E38: "2x2",
	E39: "2x2",
	E40: "2x2",
	E41: "2x2",
	E42: "2x2",
	E43: "2x2",
	E44: "2x2",
	E45: "2x2",
	E46: "2x2",
	E47: "2x2",
	E48: "2x2",
	E49: "2x2",
	E50: "2x2",
	E51: "2x2",
	E52: "2x2",
	E53: "2x2",
	E54: "2x2",
	E55: "2x2",
	E56: "2x2",
	E57: "2x2",
	E58: "2x2",
	E59: "2x2",
	E60: "2x2",
	E61: "2x2",
	E62: "2x2",
	E63: "2x2",
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

// function seed() {
// 	// Box.remove({}, (err) => {
// 	// if (err) {
// 	// 	console.log(err);
// 	// }
// 	console.log("removed boxes!");

// 	data.forEach((box) => {
// 		Box.create(
// 			{
// 				identificator: box.identificator,
// 				nume: box.nume,
// 				telefon: box.telefon,
// 				email: box.email,
// 				pretCurent: box.pretCurent,
// 				achitari: box.achitari,
// 				contract: box.contract,
// 			},
// 			(err, box) => {
// 				if (err) console.log(err);
// 				else {
// 					console.log("boxa creata");

// 					// Evidenta.remove({}, (err) => {
// 					// if (err) console.log(err);

// 					console.log("inregistrare stearsa!");

// 					Evidenta.create(
// 						{
// 							identificator: String(box.identificator),
// 							liber: true,
// 							dimensiune: sizes[String(box.identificator)],
// 						},
// 						(err, ev) => {
// 							if (err) {
// 								console.log(err);
// 							} else {
// 								console.log("boxa inregistrata!");
// 							}
// 						}
// 					);
// 					// });
// 				}
// 			}
// 		);
// 	});
// 	// });
// }

function seed() {
	Box.remove({}, (err) => {
		if (err) {
			console.log(err);
		}
		Evidenta.remove({}, (err) => {
			if (err) console.log(err);
		});
	});
}
module.exports = seed;
