const express = require('express');
const app = express();
const PORT = 8080
const bodyParser = require('body-parser');
const fs = require('fs')

//Variable admin (Crear una variable booleana administrador)


//Routers
const rutaCarrito = require('./routes/rutacart.js');
const rutaProductos = require('./routes/rutaProduct.js');

//importar clases
const contenedor = require('./utils/contenedor');
const { get } = require('http');
const listaProductos = new contenedor("productos.json");
const listaCarritos = new contenedor ("carritos.json");



//configuraciones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static("static"));



app.get('/api/', (req, res) => {
  res.json(listaProductos.getAll());
  
});


app.use('/api/productos', rutaProductos);
app.use('/api/carrito', rutaCarrito);


app.listen(PORT, function () {
  console.log(`Aplicación escuchando en el puerto ${PORT}!`);
});