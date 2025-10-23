import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const sqlPath = path.resolve(__dirname, '../../config/db.postgres.sql');
if (!fs.existsSync(sqlPath)) {
  console.error('Migration SQL file not found:', sqlPath);
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, 'utf8');

async function run() {
  const pool = process.env.DATABASE_URL
    ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } as any })
    : new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

  try {
    console.log('Running migration SQL from', sqlPath);
    await pool.query(sql);
    console.log('Migrations applied successfully');
  } catch (err) {
    console.error('Migration error:', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();
