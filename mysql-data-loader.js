require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const util = require('util');

const mysql = require('mysql');

const db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
  });
db.connect();
const query = util.promisify(db.query).bind(db);

const IDS = [1,2,3,4,5,6,7,8,10]
const FILE_NAMES = {
    EVIDENCE: "EVIDENCE",
    BOX: "BOX",
    HISTORY: "HISTORY",
};
const FILES_FOLDER_PREFIX = "FILES_";

function decodeEntities(encodedString) {
    if(typeof encodedString !== 'string') return encodedString;

    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}

const cleanAndFormatData = (data) => Object.entries(data)
  .filter(([key, value]) => value !== undefined)
  .reduce((obj, [key, value]) => {
    obj[key] = decodeEntities(value);
    if(typeof obj[key] === 'string') obj[key] = `'${obj[key]}'`
    return obj;
  }, {});

//file extension regex
const re = /(?:\.([^.]+))?$/;

(async () => {
    if (!fs.existsSync(process.env.MIGRATION_TRANSITION_FOLDER)){
        console.error(`Input folder ${process.env.MIGRATION_TRANSITION_FOLDER} not found.`)
        return;
    }

    const files = fs.readdirSync(process.env.MIGRATION_TRANSITION_FOLDER);
    for(let id of IDS){
        let EVIDENCES = null;
        let BOXES = null;
        let HISTORIES = null;

        let boxFiles = []
        if (fs.existsSync(`${process.env.MIGRATION_TRANSITION_FOLDER}/${FILES_FOLDER_PREFIX}${id}`)){
            boxFiles = fs.readdirSync(`${process.env.MIGRATION_TRANSITION_FOLDER}/${FILES_FOLDER_PREFIX}${id}`)
        }
        
        const EVIDENCES_PATH = `${process.env.MIGRATION_TRANSITION_FOLDER}/${FILE_NAMES.EVIDENCE}_${id}.json`;
        if(files.includes(`${FILE_NAMES.EVIDENCE}_${id}.json`)){
            EVIDENCES = Array.from(JSON.parse(fs.readFileSync(EVIDENCES_PATH)));
        }
        const BOXES_PATH = `${process.env.MIGRATION_TRANSITION_FOLDER}/${FILE_NAMES.BOX}_${id}.json`;;
        if(files.includes(`${FILE_NAMES.BOX}_${id}.json`)){
            BOXES = Array.from(JSON.parse(fs.readFileSync(BOXES_PATH)));
        }
        const HISTORIES_PATH = `${process.env.MIGRATION_TRANSITION_FOLDER}/${FILE_NAMES.HISTORY}_${id}.json`;
        if(files.includes(`${FILE_NAMES.HISTORY}_${id}.json`)){
            HISTORIES = Array.from(JSON.parse(fs.readFileSync(HISTORIES_PATH)));
        }

        for(let history of HISTORIES){
          const {
            box, nume, telefon, email, action, date
          } = history;
          const columns = cleanAndFormatData({
            Action: action,
            Date: date,
            Box: box,
            Name: nume,
            Email: email,
            Phone: telefon,
          });
          console.log(`Registering history entry of ${box}`);
          await query(`insert into history_old(${Object.keys(columns).join(', ')}) values (${Object.values(columns).join(', ')})`);
        }
        for(let box of BOXES){
            let clientId = undefined;
            if(box.nume){
                const columns = cleanAndFormatData({
                    Name: box.nume,
                    Phone: box.telefon,
                    Email: box.email,
                })
                clientId = {...await query(`insert into clients(${Object.keys(columns).join(', ')}) values (${Object.values(columns).join(', ')})`)}.insertId;
            }
            const columns = cleanAndFormatData({
                Price: box.pretCurent,
                Location: id,
                Client: clientId,
                Identifier: box.identificator,
                Size: EVIDENCES.find(x=>x.identificator === box.identificator).identificator
            });
            console.log(`Registering Location ${id} - ${box.identificator}, CLIENT: ${box.nume}`)
            const boxId = {...await await query(`insert into boxes(${Object.keys(columns).join(', ')}) values (${Object.values(columns).join(', ')})`)}.insertId;

            const boxFile = boxFiles.find(x=>x.startsWith(box.identificator));
            if(boxFile){
              const fileExtension = re.exec(boxFile)[1];
              const newFileName = `${uuidv4()}.${fileExtension}`;
              const currentPath = `${process.env.MIGRATION_TRANSITION_FOLDER}/${FILES_FOLDER_PREFIX}${id}/${boxFile}`
              const newPath = `${process.env.MIGRATION_FILES_TARGET_FOLDER}/${newFileName}`;
              console.log(`Copying file ${boxFile} of Location ${id} - ${box.identificator}`);
              const columns = cleanAndFormatData({
                ClientId: clientId,
                FileType: 1,
                Name: newFileName,
                OriginalName: boxFile,
              });
              if(clientId){
                if (!fs.existsSync(process.env.MIGRATION_FILES_TARGET_FOLDER)){
                  fs.mkdirSync(process.env.MIGRATION_FILES_TARGET_FOLDER);
                }
                fs.copyFileSync(currentPath, newPath);
                await query(`insert into client_files(${Object.keys(columns).join(', ')}) values (${Object.values(columns).join(', ')})`)
              } else {
                console.log(`unable to find owner of ${boxFile}`);
              }
            }
        }

    };
})();
