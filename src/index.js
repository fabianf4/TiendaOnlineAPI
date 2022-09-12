const express = require('express')
const app = express()

//cors
const cors = require('cors')
app.use(cors({
    origin: '*'
}))

//dotenv
require('dotenv').config()
const PORT = process.env.PORT

//other
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routers
app.use('/user',require('./routers/user'))
app.use('/products',require('./routers/products'))

app.get('/',(req,res)=>{
    res.status(200).json({
        "status": "The API is working correctly"
    })
})

app.listen(PORT,()=>{
    console.log(`Api initialized on port ${PORT}`)
})