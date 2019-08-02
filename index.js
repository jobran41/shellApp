    const {exec} = require('child_process');

    const express = require('express')
    const app = express()

    app.get('/', function (req, res) {
        //const { stdout, stderr } =  exec('bash -c ls -l');

             exec('git add . && git commit -m "add file" ', (error, stdout, stderr) => {
                 console.log(stdout)
                if (error) {
                console.error(`exec error: ${error}`);
                return;
                }
                
            }); 
         
    
    res.send('Hello World!')
    })

    app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
    })

