/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');


function printText(text) {
    let m = new markov.MarkovMachine(text);
    console.log(m.makeText());

}


function makeFileText(path) {
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
            console.log(`Cannot read file: ${path}:`, err);
            process.exit(1);
        } else {
            printText(data);
        }
        
    });

}


async function makeURLText(path) {
    try {
        let resp = await axios.get(path);
        // console.log(resp.data);
        printText(resp.data);
    }
    catch(err) {
        console.log(`Cannot read URL: ${path}:`, err);
        process.exit(1);
    }
    
}


if (process.argv[2] == "file") {
    let path = process.argv[3];    
    makeFileText(path);
} else if (process.argv[2] == "url") {
    let path = process.argv[3];
    makeURLText(path);
} else {
    console.error('Invalid command:', process.argv[2]);
    process.exit(1);
}