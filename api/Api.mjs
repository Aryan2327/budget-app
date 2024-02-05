import express from 'express'
import cors from 'cors'
import * as db from '../db/db.mjs'

const app = express()
const port = 3001

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.get('/api', (req, res) => {
  res.send('Hello world! This is API v1')
})

app.get('/api/daily', async (req, res) => {
  //const client = await db.getClient()
  const result = await db.query('SELECT * FROM daily_expenses')
  res.send(result)
})

app.listen(port, () => {
  console.log(`Api listening on port ${port}`)
})
