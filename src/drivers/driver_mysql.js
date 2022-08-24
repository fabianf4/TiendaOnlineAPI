var mysql = require('mysql')

const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
const MYSQL_DB = process.env.MYSQL_DB

const connection = mysql.createConnection({
  host : MYSQL_HOST,
  user : MYSQL_USER,
  password : MYSQL_PASSWORD,
  database : MYSQL_DB
})

connection.connect((err)=>{
  if (err){
    console.log('Error '+err)
  }else{
    console.log('Connect success mysql')
  }
})

module.exports = connection