const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 20,
  host     : process.env.RDS_HOSTNAME || 'localhost',
  user     : process.env.RDS_USERNAME || 'root',
  password : process.env.RDS_PASSWORD || 'password',
  database : process.env.RDS_DB_NAME || 'ebdb',
  port     : process.env.RDS_PORT || '3306',
});

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs')
app.use('dist', express.static('dist'))

app.get('/api/users', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err
    }

    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
      connection.release()

      if (err) {
        throw err
      }
    
      res.send('The solution is: ' + rows[0].solution)
    })
  })
})

app.use(indexHtml)

function indexHtml(req, res) {
  res.render('index', {
    frontendBaseUrl: process.env.RUNNING_LOCALLY ? 'http://localhost:9018' : '/static',
  })
}

app.listen(port, () => {
  console.log('Node Express server listening on port', port)
})