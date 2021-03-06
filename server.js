const express = require('express')
const redis = require('redis')
const path = require('path')
const IO = require('./io-square-redis')
const fs = require('fs')
const bodyparser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const sio = require('socket.io')(http)
const sstream = require('socket.io-stream')
IO.redis.setClient(2)

app.use(express.static(path.resolve('.') + '/public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
  extended: true
}))

app.get('/', function (req, res) {
  res.sendFile(path.resolve('.') + 'public/index.html')
})

app.get('/data/borough', function (req, res) {
  IO.redis.hgetall('borough_counts').then(v => {
    res.send(JSON.stringify(v))
  })
})

app.get('/data/cuisine', function (req, res) {
  IO.redis.hgetall('cuisine_counts').then(v => {
    res.send(JSON.stringify(v))
  })
})

app.get('/data/grade', function (req, res) {
  IO.redis.hgetall('grades').then(v => {
    res.send(v)
  })
})

app.get('/data/score', function (req, res) {
  IO.redis.hgetall('score').then(v => {
    res.send(v)
  })
})

app.get('/data/scoreScatter', function (req, res) {
  IO.redis.hgetall('gradesScatter').then(v => {
    res.send(JSON.stringify(v))
  })
})

const port = 3000
http.listen(port, () => {
  console.log('Running on port ' + port)
})
