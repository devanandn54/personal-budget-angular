const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());


app.get('/home', (req, res) => {
    res.send("Hello from Devanand");

})

app.get('/budget', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err){
            res.status(500).send("Error in reading data file");
            return;
        }
        res.json(JSON.parse(data));
    })
    
})

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
})