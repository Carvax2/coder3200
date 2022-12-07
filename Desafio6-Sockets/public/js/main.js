
const socket =io();

socket.on("connect", () =>{
    console.log("Conectado al servidor");
});

socket.on("INIT", (msg,allmessages) => {
    console.log(msg);
    document.getElementById("mensajes").innerHTML = "";
    for (let msg of allmessages) {
        appendMessage(msg);
    }

});

function appendMessage(msg){
 
    document.getElementById("mensajes").innerHTML = document.getElementById("mensajes").innerHTML +  `
    <div class=post ui card>
    <div class="container">
    <b><span style="color:blue;">${msg.email}</span></b><span style="color:brown;">${msg.fechaActual}</span> <br> <span style="color:green;"> ${msg.mensaje}</span>
    </div>
    </div>
    `;
}

socket.on("NEW_MESSAGE", (msg) => {
    appendMessage(msg);
});

socket.on("INIT", (products) => {
    fetch("http://localhost:8080/views/partials/listar.hbs")
      .then((res) => res.text())
      .then((text) => {
        const template = Handlebars.compile(text);
        const html = template({ products: products });
        document.getElementById("listadoProductos").innerHTML = html;
      });
  });

function enviarMensaje() {
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;
    const fecha = new Date();
    const fechaActual = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    if (!email || !mensaje)
    {
        alert("Debe ingresar todos los datos")
    }
    else 
    {
    socket.emit("POST_MESSAGE", {email,fechaActual,mensaje});
}
}