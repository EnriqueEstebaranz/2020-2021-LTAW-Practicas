//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const PUERTO = 8081;

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-- Guardamos el numero de usuarios que estan conectados.
let contador = 0;

let todo = "";

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  path = __dirname +"/public/inicio.html";
  res.sendFile(path);
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  contador += 1;
  socket.send("Bienvenido a este magnifico chat");
  console.log('** NUEVA CONEXIÓN **'.yellow);
  io.send("Se ha metido un nuevo usuario")
  //-- Evento de desconexión
  socket.on('disconnect', function(){
    contador -= 1;
    console.log('** CONEXIÓN TERMINADA **'.yellow);
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    const myset = new Set();
    const mensajedividido = msg.split(" ");
    const nick = msg.split(":")[0];
    const contenido = mensajedividido[1];
    
    if (todo.includes(nick)){
      console.log("aqui",todo)
      
    }else{
      todo += nick + " "
      console.log("aqui2",todo)
    }
    console.log("aqui3",todo)

    console.log("Mensaje Recibido!: " + msg.blue);
    if(contenido.charAt(0)=="/"){
      if(contenido == "/help"){
        socket.send("Comandos soportados:<br>" + "<u><n>/help<n/></u><br>" +
                    "<u><n>/list<n/></u><br>" + "<u><n>/hello<n/></u><br>" +
                    "<u><n>/date<n/></u><br>")
        console.log("estamos en help", msg);
      }else if(contenido == "/list"){
        console.log("estamos en list",  todo);
        socket.send("Numero de usuarios conectados: " + todo);
      }else if(contenido == "/hello"){
        console.log("estamos en hello", msg);
        socket.send("Hola");
      }else if(contenido == "/date"){
        socket.send(Date());
        console.log("/date", Date());
      }else{
        socket.send(msg);
      }
    }else{
      io.send(msg);
    }

    //-- Reenviarlo a todos los clientes conectados
    
  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);