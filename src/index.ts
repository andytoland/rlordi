
import express, { Application, Request, Response} from 'express';
import {doInsertQuery, doReadQuery}  from './db.js' //import the database queries

const app: Application = express();
const port = 3000


//these two are needed for form data to be parsed
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));
//ottaa id:n ja palauttaa id:n
app.get('/api/work_site', (req: Request, res: Response) => {
    res.send('Hei maailma' + req.query.id)
})

//esimerkki json vastauksesta
app.get('/api/work_site/json', (req: Request, res: Response) => {
    const jsonAnswer = {test: "jotain tekstiä", id: req.query.id}
    res.json(jsonAnswer)
})


//Haetaan käyttäjä id:n perusteella
app.get('/api/user/', async (req: Request, res: Response) => {
    const rows = await  doReadQuery("SELECT * FROM user WHERE user_id=" + req.query.id)
    await res.json(rows)
})

//Haetaan työalueet työalue-id:n perusteella
app.get('/api/work_area/', async (req: Request, res: Response) => {
    const rows = await  doReadQuery("SELECT * FROM work_area WHERE work_area_id=" + req.query.id)
    await res.json(rows)
})

//Haetaan työalueet työalue-id:n perusteella
app.get('/api/work_task/', async (req: Request, res: Response) => {
    const rows = await  doReadQuery("SELECT * FROM work_task WHERE work_task_id=" + req.query.id)
    await res.json(rows)
})

//json example how to get from POST
app.post('/postjsonexample', express.json({type: '*/*'}),async (req: Request, res: Response) => {
    console.log(JSON.stringify(req.body)) //to get whole body JSON
    console.log(JSON.stringify(req.body.test)) //to get value from JSON like {"test":1,"test2":"something"}
    await res.json(req.body)
})

//form example how to get form
app.post('/postjformexample',  async (req: Request, res: Response) => {
    console.log(req.body) //to get whole body JSON
    console.log(JSON.stringify(req.body.test)) //to get value from JSON like {"test":1,"test2":"something"}
    await res.json(req.body)
})

//returns simple json from database
app.get('/api/poolstest', async (req: Request, res: Response) => {
    const rows = await doReadQuery("SELECT * FROM test")
    console.log(JSON.stringify(rows))
    res.json(rows)
})
//returns simple json from database
app.get('/api/inserttest', async (req: Request, res: Response) => {
    const rows = await doInsertQuery( `INSERT INTO test (name, number) VALUES("${req.query.name}", ${req.query.number})`)
    console.log(JSON.stringify(rows))
    res.json(rows)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
