const express = require('express')
var os = require("os");
var hostname = os.hostname();
var networkInterfaces = os.networkInterfaces();
var username = "abc";
var password = "12345678";
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send(`Hello World 777, hostname=${hostname}, IP=${networkInterfaces.eth0[0].address}`)
})

app.listen(port, () => {
  console.log(`App is running on port ${port}.`)
})
