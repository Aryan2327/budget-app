import express from 'express'
import cors from 'cors'
import * as db from '../db/db.mjs'

const app = express()
const port = 3001

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions), express.json())

app.get('/api', (req, res) => {
  res.send('Hello world! This is API v1')
})

app.post('/api/daily', async (req, res) => {
  const client = await db.getClient()
  const body = req.body
  const expense_data = body.data
  const date = body.curDate
  //console.log(`API Log: ${JSON.stringify(body)}`)

  for (const object of expense_data) {
    const vars = [date, object.expense_type, object.expense_amount, object.expense_description];
    await client.query('INSERT INTO daily_expenses(date, type, amount, description) VALUES($1, $2, $3, $4)', vars);
  }

  await res.send("Daily expenses submitted.")
  client.release()
})

app.listen(port, () => {
  console.log(`Api listening on port ${port}`)
})
