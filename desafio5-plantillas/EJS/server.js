//configuro express
const express = require("express");
const app = express();

//Traigo lo necesario de los trabajos anteriores
const contenedor = require("./utils/contenedor");
const productos = new contenedor ("productos.json");

//Cargo lo que me permite trabajar con los bodys y los archivos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cargar módulo ejs
const ejs = require('ejs');

//las configuraciones del módulo


//Se establece el motor de plantilla a utilizar
app.set("view engine", "ejs");

//Se establece el directorio donde están los archivos de las plantillas

//Espacio público del servidor
app.use(express.static("public"));

app.get ("/", (req,res) => {
    res.render("pages/index")
})

app.get("/productos", (req,res) => {
    const listaProductos = productos.getAll();
    res.render("pages/productos", {productos:listaProductos})
})
app.post("/productos", (req,res) => {
    const recibido = req.body;
    productos.save(recibido);
    res.redirect("/productos");
})

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
