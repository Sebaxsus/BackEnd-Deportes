require('dotenv').config()
const express=require('express')
const mysql=require('mysql2')
const myconn=require('express-myconnection')
const routes=require('./routes')
const cors= require('cors')


const app=express()

app.use(cors())
const PORT = process.env.PORT || 9000

app.set('port', PORT)

const dbOptions={
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    
    
    
    
    
}

/// middlewares
app.use(myconn(mysql,dbOptions,'single'))
app.use(express.json())
app.use('/api',routes)
//app.use(express.urlencoded({extended: false}))


/// routes
app.get('/',(req,res)=>{
    res.send('Welcome to my APP 2022')
})



/*app.get('/login',(req,res)=>{
    res.send(`<html>
       <head>
          <title>Inicio de Sesión</title>
       </head>
       <body>
          <form method="POST" action="/auth">
             UserName: <input type="text" name="user"><br />
             Password: <input type="password" name="password"><br/>
             <input type="submit" value="Login" />
          </form>
       </body>
    </html>`)
  })

app.post('/auth',(req,res)=>{
    const {username,password} = req.body
    const user={username: username}
  
    const accesToken= generarToken(user)
    res.header('autorization',accesToken).json({
      message: 'autenticado',
      token: accesToken
    })
    localStorage.setItem("token", accesToken)
    //localStorafe.getItem("token") conseguir
  })
  
  function generarToken(user){
    return jwt.sign(user,process.env.claveJwt+"",{expiresIn: '15m'})
  }
 
  function validacionToken(req, res, next){
    const accesToken=req.headers['autorization']
    if(!accesToken) res.send('Acceso Denegado')

    jwt.verify(accesToken, process.env.claveJwt+"",(err,user)=>{
        if(err){
            res.send("Acceso Denegado, Token Invalido, Expirado o Inexistente")
        }else{
            next()
        }
    })
  }*/

app.listen(PORT,()=>{
    console.log(`El puerto corre en: ${PORT}`)
})
