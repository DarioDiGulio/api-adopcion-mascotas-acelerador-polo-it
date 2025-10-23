
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const useDatabaseUrl = !!process.env.DATABASE_URL;

export const pool = useDatabaseUrl
    ? new Pool({
            connectionString: process.env.DATABASE_URL,
            // Render Postgres requires SSL with rejectUnauthorized false in many setups
            ssl: { rejectUnauthorized: false } as any,
        })
    : new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        });

// Corroborar la conexión a la base de datos
(async () => {
    try {
        const client = await pool.connect();
        console.log('Conectado a la base de datos PostgreSQL');
        client.release();
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
})();