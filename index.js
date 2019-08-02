    const {exec} = require('child_process');

    const express = require('express')
    const app = express()

    app.get('/', function (req, res) {
             exec('git add . && git commit -m "add file" ', (error, stdout, stderr) => {
                 console.log(stdout)
                if (error) {
                console.error(`exec error: ${error}`);
                return;
                }
                
            }); 
        
    res.send('file added')
    })

    app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
    })

