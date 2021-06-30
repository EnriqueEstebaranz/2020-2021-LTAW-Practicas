//--  Accedemos a todos los elementos del módulo http.
const http = require('http');
//-- utilizamos el módulo fs
const fs = require('fs');
//-- Utilizamos el modulo url
const url = require('url')

//-- El servidor debe escuchar en el puerto 9000(especificación de 
//-- la practica).
const PUERTO = 9000;

console.log("Servidor iniciado:")


const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let page = pagina_main;

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    if (url.pathname != '/') {
        code = 404;
        code_msg = "Not Found";
        page = pagina_error;
    }

    //-- Generar la respusta en función de las variables
    //-- code, code_msg y page
    res.statusCode = code;
    res.statusMessage = code_msg;
    res.setHeader('Content-Type','text/html');
    res.write(page);
    res.end();
});

server.listen(PUERTO);

console.log("Server encendido, escuchando en puerto: " + PUERTO);
