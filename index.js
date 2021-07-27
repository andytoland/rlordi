const express = require('express')
const app = express()
const port = 3000
const mariadb = require('mariadb');
const {networkInterfaces} = require('os')

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
    res.send('Hello World!' + req.query.id)
})

//esimerkki json vastauksesta
app.get('/api/work_site/json', (req, res) => {
    const jsonAnswer = {test: "jotain tekstiä", id: 1}
    res.json(jsonAnswer)
})

//async function because nodejs does not wait async calls unless they are defined as such
app.get('/api/work_site/database', async (req, res) => {
    const rows = await asyncFunction() // wait means execution will wait to get answer from this function before proceeding
    console.log(rows)
    res.json(rows)
})

//asynce function because database calls are async: they come back when they are ready
async function asyncFunction() {
    return await mariadb
        .createConnection({ //set database connection
            host: 'localhost',
            user: 'test',
            password: 'test',
            database: 'rakennuslordi',
        }).then(connection => {
            return connection.query("SELECT * FROM test LIMIT 1") //get row from database return call above
                .then(rows => {
                    console.log(rows)
                    return rows //when ready return to previous return rows
                })
                .catch(err => {
                    console.log('Error is:'+ JSON.stringify(err))
                });
        })

}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
