const express = require('express')
const path = require('node:path')
const app = express()
var pg = require('pg')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

app.listen(process.env.PORT || 3001, function () {
  console.log(`The server is up at PORT ${process.env.PORT || 3001}`)
})

var elephantSqlUrl = process.env.DATABASE_URL
var client = new pg.Client(elephantSqlUrl)
client.connect(function (err) {
  if (err) {
    return console.error('Could not connect to postgres', err)
  } else console.log('Connected to postgres')
})

app.post('/db', async (request, response) => {
  let column = request.body.column
  let type = request.body.type
  let text = request.body.text
  let sortBy = request.body.sortBy
  let sortOrder = request.body.sortOrder
  let currPage = request.body.currPage
  let condition
  if (type === 'more') condition = '>'
  if (type === 'less') condition = '<'
  if (type === 'equals') {
    condition = '='
    text = text.toString()
  }
  let limit = 10
  let offset = (currPage - 1) * 10
  var pagesCount = 1

  try {
    var data
    var selectExpr = 'SELECT * FROM welbex'
    var orderExpr = `ORDER BY ${sortBy} ${sortOrder}`
    var limitExpr = `limit ${limit} offset ${offset}`
    var whereExpr = ''
    if (column === 'name') {
      if (type === 'equals') {
        whereExpr = `WHERE name::citext='${text}'::citext`
      } else if (type === 'contains') {
        whereExpr = `WHERE strpos(name::citext, '${text}'::citext) > 0`
      }
    } else if (column !== '') {
      if (text !== undefined && text !== '') {
      whereExpr = `WHERE ${column} ${condition} ${text}`}
    }
    var query = `${selectExpr} ${whereExpr} ${orderExpr} ${limitExpr}`
    //console.log(query)
    data = await client.query(query)

    countData = await client.query(`select count(*) from welbex ${whereExpr}`)
    recordsCount = countData.rows[0].count
    pagesCount = Math.ceil(recordsCount / 10)
    if (pagesCount === 0) {
      pagesCount = 1
    }

    const displayedItems = data.rows
    response.send({ displayedItems, pagesCount })
  } catch (err) {
    console.log(err.stack)
  }
})

// this should be after all other endpoints, do not move
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
})
