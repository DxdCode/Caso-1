import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerUsuario from './routers/UsuarioRouter.js'
import routerMaterias from './routers/MateriaRouter.js'
import routerEstudiante from './routers/EstudianteRouter.js'
import routerMatricula from './routers/MatriculaRouter.js'

// INICIAMOS SERVER
const app = express()
dotenv.config()


// MIDDLEWARES
app.use(express.json())

// CONFIGURAMOS
app.set('port', process.env.PORT || 3000)
app.use(cors())

// RUTAS
app.get('/', (req, res) => {
    res.send("Ya´ tu sabes que el server always activatiodaaan")
})

app.use(routerUsuario)
app.use(routerMaterias)
app.use(routerEstudiante)
app.use(routerMatricula)


// MANEJO DE RUTAS NO ENCONTRADAS
app.use((req, res) => {
    res.status(404).send("Endpoint no encontrado")
})

export default app
