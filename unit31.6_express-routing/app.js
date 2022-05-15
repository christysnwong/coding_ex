const express = require('express');

const app = express();

class InputError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status;
      console.error(this.stack);
    }
}


app.get('/mean', function(req, res, next) {

    try {

        const { nums } = req.query;
        let mean = 0;

        if (nums !== "") {
            let numsArr = nums.split(',').map(num => {

                if (!isNaN(+num)) {
                    return +num;
                } else {
                    throw new InputError("Invalid input! Numbers are required.", 400);
                }
            })

            mean = numsArr.reduce( (sum, num) => sum + num) / numsArr.length;
           
            return res.json({
                operation: "mean",
                value: mean
            })

        } else {
            throw new InputError("No inputs are detected. Numbers are required.", 400);

        }

    } catch (err) {
        next(err);
    }

})

app.get('/median', function(req, res, next) {

    try {

        const { nums } = req.query;
        let median = 0;

        if (nums !== "") {
            let numsArr = nums.split(',').map(num => {

                if (!isNaN(+num)) {
                    return +num;
                } else {
                    throw new InputError("Invalid input! Numbers are required.", 400);
                }
            })

            numsArr.sort( (a, b) => a - b);

            let median_idx = (numsArr.length + 1)/2 - 1;

            if (Number.isInteger(median_idx)) {
                median = numsArr[median_idx];
                
            } else {
                median = (numsArr[Math.floor(median_idx)] + numsArr[Math.ceil(median_idx)]) / 2
            }
            
           
            return res.json({
                operation: "median",
                value: median
            })

        } else {
            throw new InputError("No inputs are detected. Numbers are required.", 400);

        }

    } catch (err) {
        next(err);
    }

})


app.get('/mode', function(req, res, next) {

    try {
        console.log(req.query);
        const { nums } = req.query;
        let mode = [];
        let count = 0;
        let numsCount = {};

        if (nums !== "") {
            let numsArr = nums.split(',').map(num => {

                if (!isNaN(+num)) {
                    return +num;
                } else {
                    throw new InputError("Invalid input! Numbers are required.", 400);
                }
            })

            numsArr.sort( (a, b) => a - b);
            console.log(numsArr);

            for (let i = 0; i < numsArr.length - 1; i++) {
                

                if (numsArr[i] === numsArr[i+1]) {

                    if (numsArr[i] in numsCount) {
                        numsCount[numsArr[i]] = numsCount[numsArr[i]] + 1;
                    } else {
                        numsCount[numsArr[i]] = 1;
                    }
                    
                } else {
                    if (!(numsArr[i] in numsCount)) {
                        numsCount[numsArr[i]] = 0;
                    }
                    
                }

            }

            if (!(numsArr[numsArr.length - 1] in numsCount)) {
                numsCount[numsArr[numsArr.length - 1]] = 0;
            }

            console.log(numsCount);

            

            for (let key in numsCount) {
                if (numsCount[key] > count) {

                  count = numsCount[key];
                }

            }


            if (count === 0) {
                mode.push("No mode is found.");
            } else {
                for (let key in numsCount) {
                
                    if (numsCount[key] == count) {
                        mode.push(+key);
                    }
    
                }
    
            }
            
           
            return res.json({
                operation: "mode",
                value: mode
            })

        } else {
            throw new InputError("No inputs are detected. Numbers are required.", 400);

        }

    } catch (err) {
        next(err);
    }

})



app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
})


app.listen(3000, function () {
    console.log('App on port 3000');
})