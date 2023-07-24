const mongoose = require("mongoose");

var hisSchema = new mongoose.Schema({
	box: String,
	nume: String,
	email: String,
	telefon: String,
	action: String,
	date: String,
	newBox: String,
	halaCurenta: String,
	halaTinta: String,
});

module.exports = mongoose.model("his10", hisSchema);
