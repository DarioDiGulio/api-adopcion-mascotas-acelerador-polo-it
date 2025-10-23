import { Request, Response } from 'express';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { pool } from '../config/db';
import '../config/cloudinary';

interface Mascota {
  id?: number;
  nombre: string;
  direccion: string;
  tipo: string;
  raza: string;
  edad: number;
  propietario: string;
  foto_url?: string | null;
}

// Registrar mascota (solo JSON)
export async function RegistrarMascota(req: Request, res: Response): Promise<void> {
    try {
        const { nombre, direccion, tipo, raza, edad, propietario } = req.body as Mascota;
        const query = `INSERT INTO mascotas (nombre, direccion, tipo, raza, edad, propietario, foto_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
        const values = [nombre, direccion, tipo, raza, edad, propietario, null];
        const result = await pool.query(query, values);
        res.json({
            message: 'Mascota registrada exitosamente',
            id: result.rows[0].id
        });
    } catch (err) {
        console.error('Error en RegistrarMascota:', err);
        res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
    }
}

// Subir imagen usando memoria y guardando en carpeta local 'uploads'
export async function SubirImgMascota(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        console.log('Parametros recibidos:', req.params); 
        console.log('Archivo recibido:', req.file);       

        if (!req.file) {
            res.status(400).json({ message: 'No se ha subido ninguna imagen' });
            return;
        }

        // Crear carpeta uploads si no existe
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Generar nombre único para el archivo
        const ext = path.extname(req.file.originalname); // extensión original
        const filename = `mascota_${id}_${Date.now()}${ext}`;
        const filePath = path.join(uploadDir, filename);

        // Guardar el archivo en la carpeta uploads
        fs.writeFileSync(filePath, req.file.buffer);

    // Guardar la ruta relativa en la base de datos
    const fotoUrl = `/uploads/${filename}`; // esta ruta la usarías en tu frontend
    await pool.query('UPDATE mascotas SET foto_url = $1 WHERE id = $2', [fotoUrl, id]);

    res.json({ message: 'Imagen subida exitosamente', url: fotoUrl });

    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ 
            message: 'Error al subir la imagen', 
            error: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
}

// Obtener todas las mascotas
export async function obtenerMascotas(req: Request, res: Response): Promise<void> {
    try {
    const result = await pool.query('SELECT * FROM mascotas');
    res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        res.status(500).json({ 
            message: 'Error al obtener las mascotas',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}