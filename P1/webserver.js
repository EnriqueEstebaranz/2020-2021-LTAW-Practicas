//--  Accedemos a todos los elementos del módulo http.
const http = require('http');
//-- utilizamos el módulo fs
const fs = require('fs');
//-- Utilizamos el modulo url
const url = require('url')
//-- Importamos el modulo path con el objetivo de usar la funcion 
var path = require('path')
//-- El servidor debe escuchar en el puerto 9000(especificación de 
//-- la practica).
const PUERTO = 9200;

console.log("Servidor iniciado:")
console.log("path",path)
console.log(path.extname("errorpage.html"))

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let page = fs.readFileSync("homepage.html");

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log("hola",url.pathname);

    var contentTypesExtensions ={
        ".html": "text/html",
        ".css": "text/css",
        ".js" : "text/javascript"
    };
    
 
    var contentType = contentTypesExtensions[url.pathname.extname]
    console.log("contentType",contentType)
    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    if (url.pathname != '/') {
        code = 404;
        code_msg = "Not Found";
        page = fs.readFileSync("errorpage.html");;
    }

    //-- Generar la respusta en función de las variables
    //-- code, code_msg y page
    res.statusCode = code;
    res.statusMessage = code_msg;
    res.setHeader('Content-Type','text/html');
    res.write(page);
    res.end();
});
console.log("Lectura asíncrona de un fichero");



server.listen(PUERTO);

console.log("Static file server running at\n  => http://localhost:" 
            + PUERTO + "/\nCTRL + C to shutdown");
