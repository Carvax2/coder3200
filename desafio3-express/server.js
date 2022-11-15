/* Importa modulos requeridos */
fs = require("fs");
const express = require ("express");
const app = express();

/*Define el puerto de la aplicación */
const PORT = 8080;

/*Muestra el puerto en el que el servidor está escuando */
app.listen (PORT, () =>  {
    console.log (`El servidor está escuchando en el puerto ${PORT}`);
})


/*Devuelve el listado de todos los productos y los muestra en html*/
app.get ("/productos", (req,res)=> {
    let obj = JSON.parse(fs.readFileSync("./files/productos.json", 'utf-8'));
    let html = "";
    obj.forEach(producto => {
        html = html + `<h2>${producto.title}</h2><br><h3>$${producto.price}</h3><br><img src="${producto.thumbnail}"><hr>`;
    });
    res.send (`<center><h1>TUS PRODUCTOS SON</h1>${html}</center>`);
})

/*Devuelve un producto al azar y lo muestra en html*/
app.get ("/productoRandom", (req,res)=> {
    let obj = JSON.parse(fs.readFileSync("./files/productos.json", 'utf-8'));
    let azar = Math.floor(Math.random()*obj.length);
    console.log(azar); 
    producto = obj[azar];
    res.send (`<center><h1>EL PRODUCTO AL AZAR ES</h1><h2>${producto.title}</h2><br><h3>$${producto.price}</h3><br><img src="${producto.thumbnail}"><hr></center>`);
})


