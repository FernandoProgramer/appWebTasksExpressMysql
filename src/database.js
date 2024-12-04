import { connection_databases } from './key.js'
import { createPool } from 'mysql2/promise'
// import { promisify } from 'util'

const pool = createPool(connection_databases)

// pool.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('La conexion con la base de datos fue cerrada')
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('La base de datos tiene muchas conexiones')
//         }
//         if (err.code === 'ECONNREFUSE') {
//             console.error('La conexion fue rechazada')
//         }
//     }

//     if (connection) connection.release()
//     console.log('La base de datos esta conectada')
//     return
// })

// pool.query = promisify(pool.query)
export default pool