var mongoose = require("mongoose");

//schema
var schemaEvidenta = new mongoose.Schema({
	identificator: String,
	liber: Boolean,
	dimensiune: String,
});

module.exports = mongoose.model("evidence8", schemaEvidenta);
