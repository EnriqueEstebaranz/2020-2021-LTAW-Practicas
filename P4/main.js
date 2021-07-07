//-- Cargar el módulo de electron
const electron = require('electron');

console.log("Arrancando electron...");

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', ()=>{
    console.log("Evento Ready!")
    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,  //-- Anchura 
        height: 400  //-- Altura
    });
    
    //-- En la parte superior se nos ha creado el menu
    //-- por defecto
    //-- Si lo queremos quitar, hay que añadir esta línea
    win.setMenuBarVisibility(true)
    //-- Cargar contenido web en la ventana
    //-- La ventana es en realidad.... ¡un navegador!
    // win.loadURL('https://www.urjc.es/etsit');
    win.loadFile("index.html");
    //-- Crear la ventana principal de nuestra aplicación
    
    win = new electron.BrowserWindow({
    //-- Dar valores a las propiedades: altura, anchura...
    //-- .........
   
    //-- Permitir que la ventana tenga ACCESO AL SISTEMA
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
});


});
