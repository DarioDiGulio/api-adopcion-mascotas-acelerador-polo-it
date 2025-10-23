import express from 'express';
import multer from 'multer';
import {
    RegistrarMascota,
    SubirImgMascota,
    obtenerMascotas
} from '../controllers/mascota.Controller';

const router = express.Router();

// Configuración de multer para almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Crear una nueva mascota
router.post('/mascota', RegistrarMascota);

// Subir imagen 
router.post('/mascota/foto/:id', upload.single('foto'), SubirImgMascota);

// Crear una nueva mascota sin foto
router.post('/mascota-simple', RegistrarMascota);

// Obtener todas las mascotas
router.get('/mascotas', obtenerMascotas);

// Cambiar foto de mascota por id
router.put('/mascota/foto/:id', upload.single('foto'), SubirImgMascota);

export default router;