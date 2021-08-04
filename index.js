const express = require('express')
const app = express()
const port = 3000
const mariadb = require('mariadb');
const {networkInterfaces} = require('os')


//these two are needed for form data to be parsed
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

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
    res.send('Hei maailma' + req.query.id)
})

//esimerkki json vastauksesta
app.get('/api/work_site/json', (req, res) => {
    const jsonAnswer = {test: "jotain tekstiä", id: req.query.id}
    res.json(jsonAnswer)
})

//async function because nodejs does not wait async calls unless they are defined as such
app.get('/api/work_site/database', async (req, res) => {
    const rows = await asyncFunction() // wait means execution will wait to get answer from this function before proceeding
    console.log(rows)
    res.json(rows)
})

//Haetaan käyttäjä id:n perusteella
app.get('/api/user/', async (req, res) => {
    const rows = await asyncFunction("SELECT * FROM user WHERE user_id=" + req.query.id)
    res.json(rows)
})

//Haetaan työalueet työalue-id:n perusteella
app.get('/api/work_area/', async (req, res) => {
    const rows = await asyncFunction("SELECT * FROM work_area WHERE work_area_id=" + req.query.id)
    res.json(rows)
})

//Haetaan työalueet työalue-id:n perusteella
app.get('/api/work_task/', async (req, res) => {
    const rows = await asyncFunction("SELECT * FROM work_task WHERE work_task_id=" + req.query.id)
    res.json(rows)
})

//json example how to get from POST
app.post('/postjsonexample', express.json({type: '*/*'}), async (req, res) => {
    console.log(JSON.stringify(req.body)) //to get whole body JSON
    console.log(JSON.stringify(req.body.test)) //to get value from JSON like {"test":1,"test2":"something"}
    res.json(req.body)
})

//form example how to get form
app.post('/postjformexample',  async (req, res) => {
    console.log(req.body) //to get whole body JSON
    console.log(JSON.stringify(req.body.test)) //to get value from JSON like {"test":1,"test2":"something"}
    res.json(req.body)
})


//asynce function because database calls are async: they come back when they are ready
async function asyncFunction(querySentence) {
    return await mariadb
        .createConnection({ //set database connection
            host: 'localhost',
            user: 'test',
            password: 'test',
            database: 'test',
        }).then(connection => {
            return connection.query(querySentence) //get row from database return call above
                .then(rows => {
                    console.log(rows)
                    return rows //when ready return to previous return rows
                })
                .catch(err => {
                    console.log('Error is:'+ JSON.stringify(err))
                    return "Error"
                });
        })

}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
