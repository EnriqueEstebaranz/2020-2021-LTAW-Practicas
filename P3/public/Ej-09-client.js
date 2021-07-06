//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const usuario = document.getElementById("nick");

//-- Este sera el identificador del ususario por defecto 
let nombreUsuario = "Desconocido";


//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();


socket.on("message", (msg)=>{
  display.innerHTML +=  '<p>' + msg + '</p>';
});



//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(usuario.value + ": " + msg_entry.value);
  
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}

//-- Al apretar el botón otorga el nombre de ususario
usuario.onchange = () => {
    if (usuario.value )
    nombreUsuario == usuario.value;
    console.log("nombre usuario"+ usuario.value);
    document.getElementById("nick").style.display = "none";

}