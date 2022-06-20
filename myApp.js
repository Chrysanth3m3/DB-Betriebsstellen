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

// write get request for detailes data
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("App is listening on port 3000")
})
