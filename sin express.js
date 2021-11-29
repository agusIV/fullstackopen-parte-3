// codigo solo con node

const http = require("http") 
/*la aplicación importa el módulo de servidor web integrado de Node
Node.js usa los módulos CommonJS
el código que se ejecuta en el navegador utiliza módulos ES6.
Los módulos se definen con un export y se utilizan con un import:
import http from "http"*/

let notas = [
    {
      id: 1,
      contenido: "HTML is easy",
      fecha: "2019-05-30T17:30:31.098Z",
      importancia: true
    },
    {
      id: 2,
      contenido: "Browser can execute only Javascript",
      fecha: "2019-05-30T18:39:34.091Z",
      importancia: false
    },
    {
      id: 3,
      contenido: "GET and POST are the most important methods of HTTP protocol",
      fecha: "2019-05-30T19:20:14.298Z",
      importancia: true
    }
]

const app = http.createServer((solicitud, respuesta) => {
    respuesta.writeHead(200, {"Content-Type": "text/plain"}) //El valor application/json en el header Content-Type informa al receptor que los datos están en formato JSON
    respuesta.end(JSON.stringify(notas)) // El arrray notas se transforma en JSON con el método JSON.stringify(notas)
})
/*El código usa el método createServer del módulo http para crear un nuevo servidor web.
Se registra un controlador de eventos en el servidor, 
que se llama cada vez que se realiza una solicitud HTTP a la dirección del servidor http://localhost:3001. 
La solicitud se responde con el código de estado 200, con el header Content-Type establecido en text/plain, 
y el contenido del sitio que se devolverá establecido en respuesta.end().*/

const PUERTO = 3001
app.listen(PUERTO)
console.log(`el servidor corre en el puerto ${PUERTO}`);
//enlazan el servidor http asignado a la variable app, para escuchar las solicitudes HTTP enviadas al puerto 3001