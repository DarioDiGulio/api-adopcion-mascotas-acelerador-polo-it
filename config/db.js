const mysql = require('mysql2/promise');
require('dotenv').config();

//Coneccion a la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Corroborar la coneccion a la base de datos
(async () => {
    try{
        const connection = await pool.getConnection();
        console.log('Conectado a la base de datos MySQL');
        connection.release();
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
})();

module.exports = pool;
