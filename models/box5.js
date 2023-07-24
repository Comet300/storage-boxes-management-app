const mongoose = require("mongoose")


var boxSchema = new mongoose.Schema({
    identificator: String,
    nume: String,
    telefon: String,
    email: String,
    pretCurent: String,
    achitari: [{
        date1:String,
        date2:String,
        suma:String,
        inregistrat:{type:Boolean, default:false},
        dataAchitare:String
    }],
    contract: String
});

module.exports = mongoose.model("Box5", boxSchema);