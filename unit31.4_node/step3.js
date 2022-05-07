const fs = require('fs');
const process = require('process');
const axios = require('axios');


function cat(path, filename) {
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
            console.log(`Error reading ${path}:`, err);
            process.exit(1);
        } else {
            writeFile(data, filename);
        }
        
    })

}

async function webCat(path, filename) {
    try {
        let resp = await axios.get(path);
        writeFile(resp.data, filename);
    }
    catch(err) {
        console.log(`Error fetching ${path}:`, err);
        process.exit(1);
    }
    
}


function writeFile(data, filename) {
    if (filename) {
        fs.writeFile(filename, data, "utf8", err => {
            if (err) {
                console.log(`Couldn't write ${filename}:`, err);
                process.exit(1);
            }
    
        });
    } else {
        console.log(data);
    }

}



if (process.argv[2] == "--out" && process.argv[4].startsWith("http") ) {
    let path = process.argv[4];
    let filename = process.argv[3];
    webCat(path, filename);
} else if (process.argv[2] == "--out" && process.argv[4].startsWith("http") != true) {
    let path = process.argv[4];
    let filename = process.argv[3];
    cat(path, filename);
} else {
    webCat(process.argv[2]);
}



