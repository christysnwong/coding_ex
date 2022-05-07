const fs = require('fs');
const process = require('process');
const path = process.argv[2];
const axios = require('axios');

function cat(path) {
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
            console.log(`Error reading ${path}:`, err);
            process.exit(1);
        }
        console.log(data)
    })

}

async function webCat(path) {
    try {
        let resp = await axios.get(path);
        console.log(resp.data);
    }
    catch(err) {
        console.log(`Error fetching ${path}:`, err);
        process.exit(1);
    }
    
}


if (path.startsWith("http")) {
    webCat(path);
} else {
    cat(path);
}



