const mongoose = require("mongoose");

var paymentsSchema = new mongoose.Schema({
	hala1: {
		suma: {
			type: Number,
			default: 0,
		},
	},
	hala2: {
		suma: {
			type: Number,
			default: 0,
		},
	},
	hala3: {
		suma: {
			type: Number,
			default: 0,
		},
	},
	hala4: {
		suma: {
			type: Number,
			default: 0,
		},
	},
	hala5: {
		suma: {
			type: Number,
			default: 0,
		},
	},
	hala6: {
		suma: {
			type: Number,
			default: 0,
		},
	},
	hala7: {
		suma: {
			type: Number,
			default: 0,
		},
	},
	hala8: {
		suma: {
			type: Number,
			default: 0,
		},
	},
	hala10: {
		suma: {
			type: Number,
			default: 0,
		},
	},
	luna: String,
});

module.exports = mongoose.model("payments", paymentsSchema, "payments");
