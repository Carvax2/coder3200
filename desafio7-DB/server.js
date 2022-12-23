//configuro express
const express = require("express");
const app = express();
const fs = require("fs");
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig);


//Cargo lo que me permite trabajar con los bodys y los archivos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cargar módulo handlebars
const handlebars = require("express-handlebars");

//las configuraciones del módulo handlebars
const hbs = handlebars.create({
        extname: ".hbs", //Extensión a utilizar
        defaultLayout: "index.hbs", //plantilla principal
        layoutsDir: __dirname + "/views/layouts", //ruta plantilla principal
        partialsDir: __dirname + "/views/partials/" //ruta plantillas parciales
    });

//cargo y configuro socket.io y HTTP
const { Server: IOServer} = require("socket.io");
const { Server: Httpserver} = require("http");

const httpserver = new Httpserver (app);
const sose = new IOServer(httpserver);

//Espacio público del servidor
app.use(express.static("./public"));

app.get ("/", (req,res) =>{
    res.sendFile(__dirname + "/public/index.html")
    sose.emit("INIT");
})

const Contenedor = require ("./utils/contenedor.js")
const productosDisponibles = new Contenedor (knexConfig, 'productos')
const mensajesdb = new Contenedor (knexConfig,'mensajes')

app.post("/", (req,res) => {
    const obj = req.params
    productosDisponibles.save(obj)
    res.redirect("/");
    sose.emit("NEW_PRODUCT", productosDisponibles);

})

const PORT = 8080

const server = httpserver.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

//socket

const mensajesJSON = fs.readFileSync("./utils/mensajes.json", "utf-8");
mensajes = JSON.parse(mensajesJSON);


sose.on("connection", (socket) =>{
    console.log ("nuevo cliente conectado")
    sose.emit("INIT", "Socket funcionando",mensajes);

socket.on("POST_MESSAGE", (msg)=> {
    mensajes.push(msg);
    console.log(msg);
    sose.sockets.emit("NEW_MESSAGE", msg)
    mensajesdb.save(msg)
    })
});



