const express = require('express')
const app = express()
const {Contenedor} = require('./contenedor')

let contenedor = new Contenedor('productos.json')
const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log("Express server listening on port 8080")
})

server.on('ERROR', error => console.log(error))


let productos = []
    contenedor.getAll()
        .then(res=>{
            productos = res
        })



let prod = []
const getRandomProd = () =>{
    contenedor.getRandom()
        .then(res=>{
            prod = res
        })
    return prod
}

getRandomProd()

app.get('/productos', (req, res)=>{
    res.json(productos)
})

app.get('/randomProducto', (req, res)=>{
    res.json(getRandomProd())
})