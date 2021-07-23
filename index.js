const express = require('express')
const app = express()
const port = 3000
const mariadb = require('mariadb');
const { networkInterfaces } = require('os')

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
    console.log(results)
}
//ottaa id:n ja palauttaa id:n
app.get('/api/work_site', (req, res) => {
    res.send('Hello World!'+ req.query.id)
})

//esimerkki json vastauksesta
app.get('/api/work_site/json', (req, res) => {
    const jsonAnswer = {test: "jotain tekstiä", id: 1}
    res.json(jsonAnswer)
})

app.get('/api/work_site/database', (req, res) => {
    const rows = asyncFunction()
    res.json(rows)
})

async function asyncFunction() {
    mariadb
        .createConnection({
            host: 'localhost',
            user: 'root',
            password:'root',
            database:'rakennuslordi'
        }).then(conn => {
         return conn.query("SELECT * FROM testitaulu");
    })


}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
