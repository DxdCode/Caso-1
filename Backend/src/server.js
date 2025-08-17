import app from './app.js'
import connection from './database.js'


app.listen(app.get('port'),()=>{
    console.log(`Servidor activo en el puerto http://localhost:${app.get('port')}`)
})

connection()