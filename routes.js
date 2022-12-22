const express = require('express')
const routes=express.Router()

routes.get('/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from usuarios',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/:table', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        var ssql = 'select * from ' + req.params.table

        conn.query(ssql, (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)

        })

    })

})

/// insertar

routes.post('/:table', (req, res) => {
    req.getConnection((err, conn) => {

        if (err) return res.send(err)
        let sql = ' INSERT INTO ' + req.params.table + ' set ? '


        conn.query(sql, [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send('Add OK!')
        })

    })
})

/// delete

routes.delete('/:table/:field/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        let sql = 'DELETE FROM ' + req.params.table + ' WHERE ' + req.params.field + ' = ?'
        conn.query(sql, [req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.send('Book delete OK!')
        })
    })
})

/// update

routes.put('/:table/:field/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        let sql = 'UPDATE ' + req.params.table + ' set ? WHERE ' + req.params.field + ' = ?'
        conn.query(sql, [req.body, req.params.id], (err, rows => {
            if (err) return res.send(err)
            res.send('Record UPDATE OK!')

        }))
    })
})

// ruta para inicio de sesión



routes.get('/:table/:email/:clave', (req, res) => {

    req.getConnection((err, conn) => {

        if (err) return res.send(err)



        var ssql = "select * from " + req.params.table + " where usu_email='" + req.params.email + "' and usu_clave='" + req.params.clave + "'"



        conn.query(ssql, (err, rows) => {

            if (err) return res.send(err)

            res.json(rows)



        })



    })



})

// ruta para listar registro con limite



routes.get('/:table/:lim', (req, res) => {

    req.getConnection((err, conn) => {

        if (err) return res.send(err)

        var ssql = "SELECT t1.eve_id AS sec,date_format(t1.eve_fecha, '%d-%m-%Y') AS fecha "

        ssql += ",t2.equ_nombre AS equi1,t3.equ_nombre AS equi2,t1.eve_marca1 AS marca1,t1.eve_marca2 AS marca2 "

        ssql += ",t4.dep_nombre AS deporte "

        ssql += ",t1.eve_descrip AS descrip "

        ssql += " from eventos t1 "

        ssql += " LEFT JOIN equipos t2 ON t1.equ_equipo1=t2.equ_id "//Cambia el equ_id por equ_nombre

        ssql += " LEFT JOIN equipos t3 ON t1.equ_equipo2=t3.equ_id "//cambiar dep_id por dep_nombre

        ssql += " LEFT JOIN deportes t4 ON t1.dep_id=t4.dep_id "

        ssql += " ORDER BY 1 desc LIMIT " + req.params.lim



        conn.query(ssql, (err, rows) => {

            if (err) return res.send(err)

            res.json(rows)

        })

    })

})

module.exports=routes