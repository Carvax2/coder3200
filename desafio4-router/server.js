const express = require("express");
const app = express();
const { Router} = express;
const router = Router();
const PORT = 8080;
const Contenedor = require("./utils/contenedor");
const contenedor = new Contenedor("productos.json"); 
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("static"));
app.use("/api",router);

app.get("/", (req,res) => {
    res.send ("PÁGINA PRINCIPAL");
})

router.get("/productos", (req,res) => {
    const listadoProductos = contenedor.getAll();
    res.json(listadoProductos)
})

router.get("/productos/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const productoSeleccionado = contenedor.getById(id);
    if (productoSeleccionado == undefined) {
        res.send (`El producto seleccionado no existe`);
    }
    else {
        res.json (productoSeleccionado);
    }
    
})

router.post("/productos", (req,res) => {
    const nuevoProducto = req.body;
    nuevoProducto.title = req.body.Title;
    nuevoProducto.price = req.body.Price;
    nuevoProducto.thumbnail = req.body.Thumbnail;
    console.log(nuevoProducto);
        contenedor.save(nuevoProducto);
        res.json(nuevoProducto);

})


router.put("/productos/:id", (req,res) => {
        const id = parseInt(req.params.id);
        let producto = contenedor.getById(id);
        if (producto == undefined) {
            res.send (`El producto seleccionado no existe`);
        }
        else {
            producto.title = req.body.Title;
            producto.price = req.body.Price;
            producto.thumbnail = req.body.Thumbnail;
            producto.id = id;
            contenedor.deleteById(id);
            contenedor.save(producto);
            console.log(producto);
            res.send (`Producto actualizado`);

        }
})

router.delete("/productos/:id", (req,res) => {
    const id = parseInt(req.params.id);
    contenedor.deleteById(id);
    res.send (`Producto con el ${id} borrado`);
})



app.listen (PORT, () =>  {
    console.log (`El servidor está escuchando en el puerto ${PORT}`);
})

app.on("error", error => console.log(`Error ${error}`));
