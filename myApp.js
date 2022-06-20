const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const readline = require('readline');

// read csv file
const stream = fs.createReadStream('./DBNetz-Betriebsstellenverzeichnis-Stand2021-10.csv');
const rl = readline.createInterface({input: stream});
let dbOperatingSites = [];

rl.on("line", (row) => {
    dbOperatingSites.push(row.split(';'));
});

rl.on("close", () => {
    console.log(dbOperatingSites);
});

// server requests
app.get('/', (req, res) => {
    res.send("DB Betriebstellenverzeichnis");
});

app.get('/:dbSiteCode', (req, res) => {
    let dbSiteCode = req.params.dbSiteCode;
    let dbSite = dbOperatingSites.find(a => a[1] === dbSiteCode);
    if (dbSite) {
        // build json response with descriptors and values
        let completeDbSiteInfo = {};
        for (let i = 0; i < dbOperatingSites[0].length; i++){
            completeDbSiteInfo[dbOperatingSites[0][i]] = dbSite[i];
            console.log(completeDbSiteInfo)
        };
        res.json(completeDbSiteInfo);
    }
});

app.listen(port, () => {
    console.log("App is listening on port 3000")
});
