import express, { json } from 'express'
import morgan from 'morgan'
import indexRoutes from './routes/index.js'
import authenticationRoutes from './routes/authentication.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import usersRoutes from './routes/users.routes.js'
// import cookieParser from 'cookie-parser'

// Inicializaciones
const app = express()

// Configuraciones
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(morgan('dev'))
app.use(json())
// app.use(cookieParser())


// Variables globales  
app.use((req, res, next) => {
    next()
})

//Rutas
app.use('/api/v1', indexRoutes)
app.use('/api/v1', authenticationRoutes)
app.use('/api/v1/tasks', tasksRoutes) // tareas
app.use('/api/v1/users', usersRoutes) // usuarios
// Archivos pubicos

// Empezar servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})