import zlib from "zlib";
import * as fs from 'fs';
import { pipeline } from "stream";
const csvFilePath = './sheet.csv';
import * as csv from 'csvtojson';

pipeline(fs.createReadStream(csvFilePath), zlib.createGzip(), fs.createWriteStream("newFile.txt.gz"), (error) => {
    if(error){
        throw error
    } else {
        console.log("Saved!")
    }
})