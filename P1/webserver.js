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
    if(url.pathname == '/'){
        //-- console.log("urlpath",url.pathname)
        file += "homepage.html"; 
    }else{
        file +=  url.pathname.substr(1);
        //-- Le quitamos '/' porque el nombre de nuestro archivo no tiene '/'.
    }
    console.log("File está así:",file);

    const contentTypesExtensions = {
        ".html":       "text/html",
        ""     :       "text/html",//-- asigno el valor "" para areglar el error cuando el
                                   //-- usuario busca algo sin extensión que no existe la
                                   //-- pagina tiene que ser la de error que estará en html
        ".css" :        "text/css",
        ".js"  : "text/javascript",
        ".ico" :     "image/x-icon"
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
            data =fs.readFileSync("errornotfound.html")
            console.log("Error!!" + err.message);
            res.statusCode = code;
            res.statusMessage = code_msg;
            res.setHeader('Content-Type', contentType);
            //-- vale igual-res.writeHead(404,{'Content-Type': contentType})
            res.write(data);
            res.end();
                    
        } else if (file == "errorpage.html"){
            //-- errorpage.html esta asignado para que salte al dar algo no implementado.
            //-- De esta forma diferencio algunos errores.
            code = 501; //-- Codigo de error que indica que no está implementado.
            code_msg = "Not Implemented";
            console.log("Esto no esta implementado aun")
            res.statusCode = code;
            res.statusMessage = code_msg;
            res.setHeader('Content-Type', contentType);
            //-- vale igual-res.writeHead(501,{'Content-Type': contentType})
            res.write(data);
            res.end();
        }else {
            console.log("Lectura completada...\n")
            console.log("Contenido del fichero:")
            console.log("Archivo",file,"")
            //-- console.log(data.toString());
            res.statusCode = code;
            res.statusMessage = code_msg;
            res.setHeader('Content-Type', contentType);
            //-- vale igual-res.writeHead(200,{'Content-Type': contentType})
            res.write(data);
            res.end();
        }
    });

});
console.log("Lectura asíncrona de un fichero");
server.listen(PUERTO);
console.log("Static file server running at\n  => http://localhost:" 
            + PUERTO + "/\nCTRL + C to shutdown");
