"use strict";

const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const readline = require('readline');

//TODO: tests

// read csv file
const stream = fs.createReadStream('./DBNetz-Betriebsstellenverzeichnis-Stand2021-10.csv');
const rl = readline.createInterface({input: stream});
let dbOperatingSites = [];

rl.on("line", (row) => {
    dbOperatingSites.push(row.split(';'));
});

// server requests
function generateCompleteSiteInfo(descriptors, values){
    let completeDbSiteInfo = {};
    for (let i = 0; i < descriptors[0].length; i++){
            completeDbSiteInfo[descriptors[0][i]] = values[i];
    };
    return completeDbSiteInfo;
};

app.get('/', (req, res) => {
    res.send("DB Betriebsstellenverzeichnis");
});

app.get('/:dbSiteCode', (req, res) => {
    let dbSiteCode = req.params.dbSiteCode;
    let requestedDbSite = dbOperatingSites.find(elem => elem[1] === dbSiteCode);
    if (requestedDbSite) {
        res.json(generateCompleteSiteInfo(dbOperatingSites, requestedDbSite));
    } else {
        res.send("Betriebsstelle nicht vorhanden")
    };
});

app.listen(port, () => {
    console.log("App is listening on port 3000")
});
