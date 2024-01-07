const express = require('express')
const cors = require('cors')
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

app.listen(port, () => {
  console.log(`Api listening on port ${port}`)
})
