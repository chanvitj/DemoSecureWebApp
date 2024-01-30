const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World 111')
})

app.listen(port, () => {
  console.log(`App is running on port ${port}.`)
})
