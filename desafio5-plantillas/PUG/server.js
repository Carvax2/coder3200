//configuro express
const express = require("express");
const app = express();

//Traigo lo necesario de los trabajos anteriores
const contenedor = require("./utils/contenedor");
const productos = new contenedor ("productos.json");

//Cargo lo que me permite trabajar con los bodys y los archivos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cargar módulo pug
const pug = require('pug');

//las configuraciones del módulo
const layouthome = pug.compileFile ("./views/main.pug");
const layoutproductos = pug.compileFile  ("./views/productos.pug");

//Se establece el motor de plantilla a utilizar
app.set("view engine", "pug");

//Se establece el directorio donde están los archivos de las plantillas
app.set("views", "./views");

//Espacio público del servidor
app.use(express.static("public"));

app.get ("/", (req,res) => {
    res.send(layouthome ({
      }));
})

app.get("/productos", (req,res) => {
    const listaProductos = productos.getAll();
    res.send(layoutproductos ({
        productos: listaProductos

    }));
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
