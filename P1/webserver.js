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

const server = http.createServer(function(req, res){
    //-- Petición
    console.log("Petición recibida!");

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log("Esto es url:",url);

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";

    let file = "";
    //-- File obtiene el archivo, (está mal no maneja la opción de que url.pathname
    //-- sea algo mal escrito sin extensión)
    if(path.extname(url.pathname) == ''){
        file += "homepage.html"; 
    }else{
        file +=  url.pathname.substr(1);
        //-- Le quitamos '/' porque el nombre de nuestro archivo no tiene '/'.
    }
    console.log("File está así:",file);

    const contentTypesExtensions = {
        ".html": "text/html",
        ".css": "text/css",
        ".js" : "text/javascript",
        ".ico" : "image/x-icon"
    };

    var contentType = contentTypesExtensions[path.extname(file)]
    console.log("contentType",contentType)
    console.log("filee",file)

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error


    fs.readFile(file, function(err, data) {
    
        if (err) { 
            code = 404;
            code_msg = "Not Found";
            data =fs.readFileSync("errorpage.html")
            console.log("Error!!")
            res.statusCode = code;
            res.statusMessage = code_msg;
            res.setHeader('Content-Type', contentType);
            console.log(err.message);
            res.write(data);
            res.end();
        }else {
            console.log("Lectura completada...\n")
            console.log("Contenido del fichero:")
            console.log("Archivo",file,"")
            //-- console.log(data.toString());

            //-- Generar la respusta en función de las variables
            //-- code, code_msg y page
            res.statusCode = code;
            res.statusMessage = code_msg;
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();
        }
    });

});
console.log("Lectura asíncrona de un fichero");
server.listen(PUERTO);
console.log("Static file server running at\n  => http://localhost:" 
            + PUERTO + "/\nCTRL + C to shutdown");
