const express = require("express");
const app = express()
app.use(express.json())

// 3.1
let personas = [
    {
        id: 1,
        nombre: "Juan Inaca",
        numero: "040-123456"
    },
    {
        id: 2,
        nombre: "Jorge Samuel",
        numero: "040-463854"
    },
    {
        id: 3,
        nombre: "Rodolfo Fantino",
        numero: "040-384909"
    },
    {
        id: 4,
        nombre: "Salvio Moralez",
        numero: "040-378965"
    }
]

app.get("/api/persons", (solicitud, respuesta) => {
    respuesta.json(personas)
})

// 3.2
app.get("/info", (solicitud, respuesta) => {
    respuesta.send(`<p>el directorio telefonico tiene informacion de ${personas.length} personas</p>
                    <p>${new Date}</p>`)
})

// 3.3
app.get("/api/persons/:id", (solicitud, respuesta) => {
    const id = Number(solicitud.params.id)
    const nota = personas.find(pers => pers.id === id)
    if (nota) respuesta.json(nota)
    respuesta.status(404).end()
})

// 3.4
app.delete("/api/persons/:id", (solicitud, respuesta) =>{
    const id = Number(solicitud.params.id)
    personas.filter(pers => pers.id !== id)

    respuesta.status(204).end()
})

// 3.5
app.post("/api/persons", (solicitud, respuesta) => {
    const cuerpo = solicitud.body
    const persona = {
        id: Math.floor(Math.random() * 1000),
        nombre: cuerpo.nombre,
        numero: cuerpo.numero
    }
    console.log(persona);
    personas.concat(persona)
})
/*
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

app.get("/",(solicitud, respuesta) => {
    respuesta.send("<h1>hola bro</h1>") //https://expressjs.com/en/4x/api.html#res.send
})
/*define un controlador de eventos, 
que se utiliza para manejar las solicitudes HTTP GET realizadas a la raíz "/" de la aplicación.
La función acepta dos parámetros. El primer parámetro "solicitud" contiene toda la información de la solicitud HTTP 
y el segundo parámetro respuesta se utiliza para definir cómo se responde a la solicitud.
como la respuesta es un string, express establece automáticamente el valor del header Content-Type en text/html
*//*

app.get("/api/notas", (solicitud, respuesta) => {
    console.log("______LISTA COMPLETA______");
    console.log(notas);
    respuesta.json(notas)
})
/*define un controlador de eventos, 
que maneja las solicitudes HTTP GET realizadas a la ruta notas de la aplicación
Llamar al método json enviará el array notes que se le pasó como un string con formato JSON. 
Express establece automáticamente el header Content-Type con el valor apropiado de application/json.
*//*

app.get("/api/notas/:id", (solicitud, respuesta) => {
    console.log("______NOTA SOLICITADA______");
    const id = Number(solicitud.params.id)
    const nota = notas.find(nota => nota.id === id)
    console.log(nota);
    if (nota) { // si no es undefined
        respuesta.json(nota)
    }
    respuesta.status(404).end()
})/*Podemos definir parámetros para rutas en express usando la sintaxis de dos puntos.
Dado que no se adjuntan datos a la respuesta, 
utilizamos el método status para establecer el estado y el método end para responder a la solicitud sin enviar ningún dato.
no necesitamos mostrar nada en el navegador porque las API REST son interfaces diseñadas para uso programático, 
y el código de estado de error es todo lo que se necesita.
*//*

const generarId = () => {
    const maxId = notas.length > 0
        ? Math.max(...notas.map(n => n.id)) : 0
    return maxId + 1
}

app.post("/api/notas", (solicitud, respuesta) => {
    console.log("______AGREGAR______");
    const cuerpo = solicitud.body
    console.log(cuerpo);

    if (!cuerpo.contenido){    
        return respuesta.status(400).json({
            error: "contenido perdido"
        })
    }   
    const nota = {
        contenido: cuerpo.contenido,
        importancia: cuerpo.importancia || false,
        fecha: new Date(),
        id: generarId()
    }
    notas = notas.concat(nota)
    console.log("la nueva nota es: ", nota);
    respuesta.json(nota)
})
/*es importante poner antes el return,
porque si va despues, 
salta un error de que se quiere modificar el header despues de que finalizó
*//*

app.delete(`/api/notas/:id`, (solicitud, respuesta) => {
    console.log("______BORRAR______");
    const id = Number(solicitud.params.id)
    console.log("id: ",id );
    notas = notas.filter(nota => nota.id !== id)

    respuesta.status(204).end()
})
*/
const PUERTO = 3001
app.listen(PUERTO, () => {
    console.log(`el servidor corre en el puerto ${PUERTO}`);
})

/*https://nodejs.org/docs/latest-v8.x/api/repl.html 
es útil para probar cómo funcionan los comandos mientras escribe el código de la aplicación*/