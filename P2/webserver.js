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

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => { 
    //-- Petición
    console.log("Petición recibida!");

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log("");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("  Ruta: " + url.pathname);
    console.log("  Parametros: " + url.searchParams);


     //-- Leer las cookies
    const cookie = req.headers.cookie;
    console.log("Cookie: ", cookie)

    //-- Variables para el mensaje de respuesta
    let content_type = "text/html";
    let content = "";

    //-- Leer recurso y eliminar la / inicial
    let recurso = url.pathname.substr(1);
    console.log("file:", recurso);
    switch (recurso) {
        case '':
            console.log("Main page");
            content = HOME;
            break;

        case 'procesar':
            //-- Leer los parámetros
            let nombre = url.searchParams.get('nombre');
            let apellidos = url.searchParams.get('apellidos');
            console.log(" Nombre: " + nombre);
            console.log(" Apellidos: " + apellidos);

            content_type = "text/html";
            content = RESPUESTA;
            //-- Reemplazar las palabras claves por su valores
            //-- en la plantilla HTML
            content = RESPUESTA.replace("NOMBRE", nombre);
            content = content.replace("APELLIDOS", apellidos);
            //-- si el usuario es Chuck Norris se añade HTML extra
            let html_extra = "";
            if (nombre=="Chuck" && apellidos=="Norris") {
                html_extra = "<h2>Chuck Norris no necesita registrarse</h2>";
            }
            content = content.replace("HTML_EXTRA", html_extra);
            break;

        case 'productos':
            console.log("Peticion de Productos!")
            content_type = "application/json";

            //-- Leer los parámetros
            let param1 = myURL.searchParams.get('param1');

            param1 = param1.toUpperCase();

            console.log("  Param: " +  param1);

            let result = [];

            for (let prod of productos) {

                //-- Pasar a mayúsculas
                prodU = prod.toUpperCase();

                //-- Si el producto comienza por lo indicado en el parametro
                //-- meter este producto en el array de resultados
                if (prodU.startsWith(param1)) {
                    result.push(prod);
                }

            }
            console.log(result);
            content = JSON.stringify(result);
            break;

        case 'cliente.js':
            //-- Leer fichero javascript
            console.log("recurso: " + recurso);
            fs.readFile(recurso, 'utf-8', (err,data) => {
                if (err) {
                    console.log("Error: " + err)
                    return;
                } else {
                  res.setHeader('Content-Type', 'application/javascript');
                  res.write(data);
                  res.end();
                }
            });

            return;
            break;

            //-- Si no es ninguna de las anteriores devolver mensaje de error
        default:
            res.setHeader('Content-Type','text/html');
            res.statusCode = 404;
            res.write(ERROR);
            res.end();
            return;
    }


        //-- Generar respuesta
        res.setHeader('Content-Type', content_type);
        res.write(content);
        res.end()
    });

console.log("Lectura asíncrona de un fichero");
server.listen(PUERTO);
console.log("Static file server running at\n  => http://localhost:" 
            + PUERTO + "/\nCTRL + C to shutdown");
