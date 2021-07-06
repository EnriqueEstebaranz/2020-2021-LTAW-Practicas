//-- Crear el Websocket
const mySocket = new WebSocket("ws://www.WebSocket.org");

// Establecer las funciones de retrollamada para TODOS los eventos
mySocket.onopen = (e) => {
  console.log("Conexión establecida");
};

mySocket.onclose = (e) => {
  console.log("Conexion cerrada. Código: " + e.code);
};

mySocket.onmessage = (e) => {
  console.log("Mensaje recibido: " + e.data);
};

mySocket.onerror = (e) => {
  console.log("Error");
};
//-- Envío de datos
mySocket.send("Chuck Norris approved!!");

//-- Cerrar el Websocket
mySocket.close();
