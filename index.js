const express = require("express");
const morgan = require("morgan")
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

// 3.8
morgan.token("contenido", function (solicitud) {
        return JSON.stringify(solicitud.body)
    })

app.use(morgan(":method :url :status :response-time ms :contenido"))
//----------
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
//-----------
// 3.2
app.get("/info", (solicitud, respuesta) => {
    respuesta.send
        (`<p>el directorio telefonico tiene informacion de ${personas.length} personas</p>
        <p>${new Date}</p>`)
})
//-----------
// 3.3
app.get("/api/persons/:id", (solicitud, respuesta) => {
    const id = Number(solicitud.params.id)
    const nota = personas.find(pers => pers.id === id)
    if (nota) respuesta.json(nota)
    respuesta.status(404).end()
})
//-----------
// 3.4
app.delete("/api/persons/:id", (solicitud, respuesta) =>{
    const id = Number(solicitud.params.id)
    personas.filter(pers => pers.id !== id)
    respuesta.status(204).end()
})
//-----------
// 3.5
app.post("/api/persons", (solicitud, respuesta) => {
    const cuerpo = solicitud.body
    // 3.6
    if (!cuerpo.nombre & !cuerpo.numero){    
        return respuesta.status(400).json({
            error: "falta nombre o numero"
        })
    }  
    if(personas.includes(cuerpo.nombre)){
        return respuesta.status(400).json({
            error: "la persona ya esta en el directorio"
        })
    }
    //----------
    const persona = {
        id: Math.floor(Math.random() * 1000),
        nombre: cuerpo.nombre,
        numero: cuerpo.numero
    }
    personas.concat(persona)
    respuesta.json(persona)
})
//---------
const rutaDesconocida = (solicitud, respuesta) => {
    respuesta.status(404).send({
        error: "ruta desconocida"
    })
}

app.use(rutaDesconocida)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`el servidor corre en el puerto ${PORT}`);
})