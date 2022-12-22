//require ('dotenv').config()
const express=require('express')
const mysql=require('mysql')
const myconn=require('express-myconnection')
const routes=require('./routes')
const cors= require('cors')

const app=express()
app.use(cors())

app.set('port',9000)

const dbOptions={
    host:process.env.DB_HOST || 'localhost',
    port:process.env.DB_PORT || '3306',
    user:process.env.DB_USER || 'MinTic',
    password:process.env.DB_PWD || 'JsgrMc1',
    database:process.env.DB_NAME || 'ciclo4mtic'
}

/// middlewares
app.use(myconn(mysql,dbOptions,'single'))
app.use(express.json())


/// routes
app.get('/',(req,res)=>{
    res.send('Welcome to my APP 2022')
})

app.use('/api',routes)
 

app.listen(app.get('port'),()=>{
    console.log(`El puerto corre en: ${app.get('port')}`)
})