//configuro express
const express = require("express");
const app = express();

//Traigo lo necesario de los trabajos anteriores
const contenedor = require("./utils/contenedor");
const productos = new contenedor ("productos.json");

//Cargo lo que me permite trabajar con los bodys y los archivos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cargar módulo handlebars
const handlebars = require("express-handlebars");

//las configuraciones del módulo
const hbs = handlebars.create({
        extname: ".hbs", //Extensión a utilizar
        defaultLayout: "index.hbs", //plantilla principal
        layoutsDir: __dirname + "/views/layouts", //ruta plantilla principal
        partialsDir: __dirname + "/views/partials/" //ruta plantillas parciales
    });

//defino el motor de plantilla con el metodo del objeto hbs
app.engine("hbs", hbs.engine);

//Se establece el motor de plantilla a utilizar
app.set("view engine", "hbs");

//Se establece el directorio donde están los archivos de las plantillas
app.set("views", "./views");

//Espacio público del servidor
app.use(express.static("public"));

app.get ("/", (req,res) =>{
    res.render("main");
})

app.get("/productos", (req,res) => {
    const listaProductos = productos.getAll();
    res.render("productos",{listaProductos:listaProductos});
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
