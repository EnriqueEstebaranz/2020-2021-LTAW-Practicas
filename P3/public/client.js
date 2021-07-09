//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const usuario = document.getElementById("nick");
const cambio = document.getElementById("cambio");
const notificacion = document.getElementById("notificacion");

//-- Este sera el identificador del ususario por defecto 
let nombreUsuario = "Desconocido";
const socket = io();

//-- Crear un websocket. Se establece la conexión con el servidor


socket.on("message", (msg)=>{
  display.innerHTML +=  '<p>' + msg + '</p>';
  notificacion.play();
});


//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(nombreUsuario + ": " + msg_entry.value);
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}

//-- Al apretar el botón otorga el nombre de ususario
usuario.onchange = () => {
    if (usuario.value )
    nombreUsuario = usuario.value;
    console.log("nombre usuario"+ usuario.value);
    document.getElementById("nick").style.display = "none";
    cambio.innerHTML = "USUARIO:" + nombreUsuario;
}