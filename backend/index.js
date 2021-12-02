const ConnecttoMongo = require('./db');
const express = require('express')

ConnecttoMongo();

const app = express()
const port = 4000

app.use(express.json())

app.use('/api/auth',require ('./routes/auth'))
app.use('/api/notes',require ('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})