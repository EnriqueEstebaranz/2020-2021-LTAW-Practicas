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
const PUERTO = 9900;

//-- Cargar pagina web principal
const HOME = fs.readFileSync('homepage.html','utf-8');
//-- Cargar pagina web ERROR
const ERROR = fs.readFileSync('errorpage.html','utf-8');
//-- Cargar pagina web ERROR NOT FOUND
const ERRORNF = fs.readFileSync('errornotfound.html','utf-8');
//-- Cargar pagina web producto1
const PRODUCTO1 = fs.readFileSync('product1page.html','utf-8');
//-- Cargar pagina web producto2
const PRODUCTO2 = fs.readFileSync('product2page.html','utf-8');
//-- Cargar pagina web producto3
const PRODUCTO3 = fs.readFileSync('product3page.html','utf-8');
//-- Cargar pagina web producto4
const PRODUCTO4 = fs.readFileSync('product4page.html','utf-8');
//-- Cargar pagina web producto5
const PRODUCTO5 = fs.readFileSync('product5page.html','utf-8');
//-- Cargar pagina web producto6
const PRODUCTO6 = fs.readFileSync('product6page.html','utf-8');
//-- Cargar pagina web formulario
const FORMULARIO = fs.readFileSync('formulario.html','utf-8');
//-- Cargar pagina web error en el formulario
const ERRORFORMULARIO = fs.readFileSync('formulario.html','utf-8');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"

//-- N0mbre del fichero JSON de salida
const FICHERO_JSON_OUT = "tiendasalida.json"
//-- Leer el fichero JSON
const  tienda_json = fs.readFileSync(FICHERO_JSON);
//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

console.log(tienda)
//-- creamos los arrays donde vamos a guardar la información que extraemos
//-- del archivo tienda.json
let nombre = [];
let contraseña = [];

let usuario = tienda[0]["usuario"];
console.log("usuario",usuario)
for (i = 0; i < usuario.length; i++){
    nombre.push(usuario[i]["nombre"]);
    contraseña.push(usuario[i]["contraseña"]);
};
console.log("usuario",nombre)
console.log("usuario",contraseña)

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
    var extension = path.extname(file);
    var contentType = "";
    console.log("Extensión:", extension);

    //-- Este if nos permite que el servidor no pete cuando el usuario escribe mal la extensión.
    if (extension in  contentTypesExtensions){
        contentType = contentTypesExtensions[path.extname(file)]
    }else{
        console.log("La extension-> "+ extension + "  NO es valida");
        contentType = contentTypesExtensions[path.extname("errornotfound.html")];
    }
    console.log("contentType",contentType)
    console.log("filee",file)

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error


    fs.readFile(file, function(err, data) {
    
        if (file == "ls") { 
            var numFile ="";
            fs.readdir("./", function(err, carpeta) {
                var contenido ="Listado de todos los archivos" + "\n" + "<br>" + "\n";
                
                res.statusCode = code;
                res.statusMessage = code_msg;
                res.setHeader('Content-Type', contentType);
                if (err){
                    console.log("Error!!" + err.message);
                }
                numFile = carpeta.length
                for(i = 0; i< numFile; i++){
                    contenido = contenido += ("&nbsp&nbsp&nbsp&nbsp Archivo"+ (i+1) + 
                                              ": " + carpeta[i] + "\n" + "<br>" + "\n");
                }
                res.write(contenido)
                fs.writeFileSync("ls.html", contenido);
                //-- Creamos un archivo html llamado "ls,html" que contiene el listado.
                console.log("Estamos aquí")
                res.end()

            });
        }else if (err){
            code = 404;
            code_msg = "Not Found";
            data =fs.readFileSync("errornotfound.html");
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
