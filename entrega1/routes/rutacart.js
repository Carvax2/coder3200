const express = require('express');
const rutaCarrito = express.Router();
const fs = require('fs')

const isadmin = false;


const contenedor = require('../utils/contenedor');
const listaCarritos = new contenedor ("carritos.json");
const listaProductos = new contenedor('productos.json');

rutaCarrito.get ("/", (req,res) => {
    res.json (listaCarritos.getAll());
})

//Crea un carrito y devuelve su id.
rutaCarrito.post("/", async (req,res) => {
   body = {productos:[]}
   await listaCarritos.save(body)
   const id = listaCarritos.getAll()[listaCarritos.getAll().length - 1].id
   res.json({
    "status": 200,
    "message": `Carrito creado con éxito`,
    "id": id

   })
})

//Me permite listar todos los productos guardados en el carrito
rutaCarrito.get("/:id/productos", (req,res) => {    
    let carrito = listaCarritos.getById(req.params.id);
    let productos = carrito.productos;
    res.json(productos);
})

//Incorporar productos al carrito por id de producto
rutaCarrito.post("/:id/productos/:id_prod",  (req,res) => {
    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const data = listaCarritos.getAll();
    const aeditar = data.findIndex(cart => cart.id === id);
    const nuevo = listaProductos.getById(id_prod);
    data[aeditar].productos.push(nuevo); 
    console.log(data)
    listaCarritos._saveAll(data)
    res.send("agregado")
})


//Vacía un carrito y lo elimina.
rutaCarrito.delete("/:id", (req,res) => {
    const id = parseInt(req.params.id);
    listaCarritos.deleteById(id);
    res.json({message:"Carrito eliminado"});
})

//Elimina un producto del carrito por su id de carrito y de producto.
rutaCarrito.delete("/:id/productos/:id_prod", (req,res) => {
    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    listaCarritos.deleteProductCarrito(id,id_prod)    
    res.json({message:"Producto eliminado"});
})

module.exports = rutaCarrito;


