const csvFilePath = './sheet.csv';
const csv = require('csvtojson');
const fs = require('fs');

csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        console.log(jsonObj);
        fs.writeFile('newFile.txt', jsonObj, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            // success case, the file was saved
            console.log('Lyric saved!');
        });
    });

// Async / await usage
// const jsonArray = await csv().fromFile(csvFilePath);
