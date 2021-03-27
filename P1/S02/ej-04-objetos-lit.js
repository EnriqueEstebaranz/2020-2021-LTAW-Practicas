//-- Ejemplo4, en JavaScript podemos crear objetos con estructura
//-- en la que definimos propiedades que tienen un valor.Los objetos
//-- literales se crean con las llaves {}. En este ejemplo se define
//-- la variable objeto1 que tiene 3 propiedades, denominadas: nombre
//-- valory test

//-- Ejemplo de definición y uso de objetos literales.

//--Definiendo un objeto con varias propiedades y valores
const objeto1 = {
    nombre: "Objeto-1",
    valor: 10,
    test: true
};

//-- Imprimiendo las propiedades del objeto
console.log("Nombre: " + objeto1.nombre);
console.log("Valor: " + objeto1.valor);
console.log("Test: " + objeto1.test);

//-- Tambien te puedes referir a las propiedades usando sus nombres
//-- entre comillas
console.log("")
console.log("Nombre: " + objeto1["nombre"]);
console.log("Valor: " + objeto1["valor"]);
console.log("Valor: " + objeto1["test"])

//-- Comprobar si un objeto tiene una propiedad
if("test" in objeto1) {
    console.log("\nTiene propiedad test");
}

//-- Recorrer todas las propiedades
console.log("")
for(prop in objeto1) {
    console.log(`Propiedad: ${prop} --> valor: ${objeto1[prop]}`)
}

//-- Forma abreviada para obtener constantes
//-- con las propiedades del objeto
const { valor, nombre } = objeto1;

console.log("");
console.log("Nombre: " + nombre);
console.log("Valor: " + valor);

//-- Todas las variables que se definen en VSCode se pueden
//-- ver en el menú lateral OUTLINE, junto a su estructura. 
//-- Así, podemos ver cómo la variable objeto1 tiene efectivamente
//-- 3 propiedades. También vemos dos variables adicionales: valor 
//-- y nombre

//-- const { valor, nombre } = objeto1;
//-- Este código es la forma abreviada de este otro:
//-- const valor = objeto1.valor;
//-- const nombre = objeto1.nombre