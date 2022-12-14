const express = require('express');
const rutaProductos = express.Router();
const fs = require('fs')

const contenedor = require('../utils/contenedor');
const listaProductos = new contenedor('productos.json');

const isadmin = true;


//Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
rutaProductos.get("/:id_prod", (req,res) => {
    const id_prod = req.params.id_prod;
    if(listaProductos.getById(id_prod) == undefined ){
        res.status(404).json(listaProductos.getAll());
    }else{
        res.status(200).json(listaProductos.getById(id_prod));
    }
})

rutaProductos.get("/", (req,res) => {
    res.status(200).json(listaProductos.getAll());
})

//Para incorporar productos al listado (disponible para administradores)
rutaProductos.post("/", (req,res) => {
    const nuevoProducto = req.body;
    nuevoProducto.nombre = req.body.nombre;
    nuevoProducto.descripcion = req.body.descripcion;
    nuevoProducto.codigo = req.body.codigo;
    nuevoProducto.foto = req.body.foto;
    nuevoProducto.precio = req.body.precio;
    nuevoProducto.stock = req.body.stock;
    if (isadmin == true)
    {
        listaProductos.save(nuevoProducto);
        res.status(200).json(nuevoProducto);
    }else {
        res.status(403).json({
            "Error":"Sin permisos",
            "message":"No tiene los permisos para esto"     
        });
    }
    
})

// Actualiza un producto por su id (disponible para administradores)
rutaProductos.put("/:id_prod", (req,res) => {
    let id = req.params.id_prod;
    let data = req.body;
    console.log(data)
    console.log(id)
    listaProductos.updateById(id,data);
    res.status(200).json(
        {
            "status":"Actualizado con éxito",
            "message":"El producto con el id fue actualizado con éxito"
        }
    )
})

//Borra un producto por su id (disponible para administradores)

rutaProductos.delete("/:id_prod", (req,res) => {
    if (isadmin == true) {
        let id = parseInt(req.params.id_prod);
        listaProductos.deleteById(id);
        res.status(200).json(
                {
                    "status":"Borrado con éxito",
                    "message":"El producto con el id fue borrado con éxito"
                }
            )

        }
    else {
        res.status(403).json( {
            "error":"Sin permisos",
            "message":"No tiene los permisos para esto"
        })
       }
       
})

module.exports = rutaProductos;