const express = require('express')
const app = express()

//dotenv
require('dotenv').config()
const PORT = process.env.PORT

//other
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routers
app.use('/user',require('./routers/user'))

app.listen(PORT,()=>{
    console.log(`Api initialized on port ${PORT}`)
})