require("dotenv").config();
const fs = require('fs');

//ORM Mapping for MongoDb
const mongoose = require("mongoose");

//File storage
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

//Evidence entities
const Evidenta1 = require("./models/evidenta1.js");
const Evidenta2 = require("./models/evidenta2.js");
const Evidenta3 = require("./models/evidenta3.js");
const Evidenta4 = require("./models/evidenta4.js");
const Evidenta5 = require("./models/evidenta5.js");
const Evidenta6 = require("./models/evidenta6.js");
const Evidenta7 = require("./models/evidenta7.js");
const Evidenta8 = require("./models/evidenta8.js");
const Evidenta10 = require("./models/evidenta10.js");

//Box entities
const Box1 = require("./models/box1.js");
const Box2 = require("./models/box2.js");
const Box3 = require("./models/box3.js");
const Box4 = require("./models/box4.js");
const Box5 = require("./models/box5.js");
const Box6 = require("./models/box6.js");
const Box7 = require("./models/box7.js");
const Box8 = require("./models/box8.js");
const Box10 = require("./models/box10.js");

//History entities
const his1 = require("./models/his1.js");
const his2 = require("./models/his2.js");
const his3 = require("./models/his3.js");
const his4 = require("./models/his4.js");
const his5 = require("./models/his5.js");
const his6 = require("./models/his6.js");
const his7 = require("./models/his7.js");
const his8 = require("./models/his8.js");
const his10 = require("./models/his10.js");

const q = require("q");

// INITIAL CONFIG
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

let conn;
try {
	conn = mongoose.createConnection(process.env.MONGO_LOCAL_CONN_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	mongoose.connect(process.env.MONGO_LOCAL_CONN_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} catch (err) {
	throw "Baza de date nu poate fi accesata";
}

let gfs;

conn.once("open", () => {
	// Init stream
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection("contracts");
});

// Create storage engine
const storage = new GridFsStorage({
	url: process.env.MONGO_LOCAL_CONN_URL,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			const filename = file.originalname;
			const fileInfo = {
				filename: filename,
				bucketName: "contracts",
			};
			resolve(fileInfo);
		});
	},
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
});



//file extension regex
const re = /(?:\.([^.]+))?$/;

// DATA MIGRATION
const DATA_MAPPINGS=[
    {
        evidence: Evidenta1,
        box: Box1,
        history: his1,
        location: 1,
    },
    {
        evidence: Evidenta2,
        box: Box2,
        history: his2,
        location: 2
    },
    {
        evidence: Evidenta3,
        box: Box3,
        history: his3,
        location: 3
    },
    {
        evidence: Evidenta4,
        box: Box4,
        history: his4,
        location: 4
    },
    {
        evidence: Evidenta5,
        box: Box5,
        history: his5,
        location: 5
    },
    {
        evidence: Evidenta6,
        box: Box6,
        history: his6,
        location: 6
    },
    {
        evidence: Evidenta7,
        box: Box7,
        history: his7,
        location: 7
    },
    {
        evidence: Evidenta8,
        box: Box8,
        history: his8,
        location: 8
    },
    {
        evidence: Evidenta10,
        box: Box10,
        history: his10,
        location: 10
    },
];


const selectiveExecution = {
    PHASE_1: true,
    PHASE_2: true,
};

(async () => {
    // cleanup
    if (fs.existsSync(process.env.MIGRATION_TRANSITION_FOLDER)){
        fs.rmdirSync(process.env.MIGRATION_TRANSITION_FOLDER, { recursive: true, force: true })
    }

    // Phase 1: Extract whole MongoDB Data + files
    if(selectiveExecution.PHASE_1){
        for(let i=0;i<DATA_MAPPINGS.length;i++) {
            const DATA_ENTRY = DATA_MAPPINGS[i];
            const data = {};
            const promises = [
                DATA_ENTRY.evidence.find({}).lean().exec(),
                DATA_ENTRY.box.find({}).lean().exec(),
                DATA_ENTRY.history.find({}).lean().exec()
            ]
            const res = await q.all(promises)
            if(res[0])
            data.evidence = res[0];
            else throw new Error('The MongoDB Fetching is missing data: evidence')
            
            if(res[1])
            data.box = res[1];
            else throw new Error('The MongoDB Fetching is missing data: box')
    
            if(res[2])
            data.history = res[2];
            else throw new Error('The MongoDB Fetching is missing data: history')
    
            if (!fs.existsSync(process.env.MIGRATION_TRANSITION_FOLDER)){
                fs.mkdirSync(process.env.MIGRATION_TRANSITION_FOLDER);
            }
            fs.writeFileSync(`${process.env.MIGRATION_TRANSITION_FOLDER}/EVIDENCE_${DATA_ENTRY.location}.json`, JSON.stringify(data.evidence));
            fs.writeFileSync(`${process.env.MIGRATION_TRANSITION_FOLDER}/BOX_${DATA_ENTRY.location}.json`, JSON.stringify(data.box));
            fs.writeFileSync(`${process.env.MIGRATION_TRANSITION_FOLDER}/HISTORY_${DATA_ENTRY.location}.json`, JSON.stringify(data.history));
            console.log("MONGO DATA SAVED")
            console.log("DOWNLOADING FILES...")
            const boxesWithContracts = data.box.filter(box=>!!box.contract).map(box=>{
                return {id:box.identificator,contract:box.contract}
            });
    
            for(let j=0;j<boxesWithContracts.length; j++){
                const box = boxesWithContracts[j];
                const file = await gfs.files
                .findOne({
                    _id: new mongoose.mongo.ObjectID(box.contract),
                })
                const fileExtension = re.exec(file.filename)[1];
                const readstream = gfs.createReadStream({ _id: file._id, filename: file.filename, contentType: file.contentType, mode: "w" });
    
          
                if (!fs.existsSync(`${process.env.MIGRATION_TRANSITION_FOLDER}/FILES_${DATA_ENTRY.location}`)){
                    fs.mkdirSync(`${process.env.MIGRATION_TRANSITION_FOLDER}/FILES_${DATA_ENTRY.location}`);
                }
                const outputPath = fs.createWriteStream(`${process.env.MIGRATION_TRANSITION_FOLDER}/FILES_${DATA_ENTRY.location}/${box.id}.${fileExtension}`);
                readstream.pipe(outputPath);
                outputPath.on('finish', () => {
                    console.log(`LOCATION: ${DATA_ENTRY.location}, FILE ${j+1} OF ${boxesWithContracts.length} DOWNLOADED`);
                });
            }
        }
    }
    
    if(selectiveExecution.PHASE_2) {
    }
    
})();
