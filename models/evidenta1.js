var mongoose = require("mongoose")

//schema
var schemaEvidenta = new mongoose.Schema({
    identificator: String,
    liber: Boolean,
    dimensiune:String
})

/*
        Evidenta1.findOne({}).then(found=>{
            found.cevaNou=true;
            found.save();
        })
*/

module.exports = mongoose.model("Evidenta", schemaEvidenta, "evidence1");