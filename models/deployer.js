const payments = require("./payments");

async function deploy() {
	console.log("deploying");
	payments.find({}).then((data) => {
		data.forEach((item) => {
			item.save();
		});
		console.log("done");
	});
}

module.exports = deploy;
