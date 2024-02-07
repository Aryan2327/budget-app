import express from 'express'
import cors from 'cors'
import * as db from '../db/db.mjs'

const app = express()
const port = 3001

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions), express.json(), express.urlencoded({ extended: true }))

app.get('/api', (req, res) => {
  res.send('Hello world! This is API v1')
})

app.post('/api/daily', async (req, res) => {
  //const client = await db.getClient()
  //console.log(req.body)
  const body = req.body
  body.data.forEach(async (row) => {
    const vars = [body.date, body.data.expense_type, body.data.expense_amount, body.data.expense_description];
    await db.query('INSERT INTO daily_expenses(date, type, amount, description) VALUES($1, $2, $3, $4)', vars);
  })
  await res.send("Daily expenses submitted.")
  //client.release()
})

app.listen(port, () => {
  console.log(`Api listening on port ${port}`)
})
