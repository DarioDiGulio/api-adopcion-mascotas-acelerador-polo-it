const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    RegistrarMascota,
    SubirImgMascota,
    obtenerMascota,
    obtenerMascotas,
    actualizarMascota,
    eliminarMascota     

} = require('../controllers/mascota.Controller');
//memoria para multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Crear una nueva mascota
router.post('/api/mascota', RegistrarMascota);

//Subir imagen 
router.post('/api/mascota/:id/foto', upload.single('foto'), SubirImgMascota);

// Crear una nueva mascota sin foto
router.post('/mascota-simple', RegistrarMascota);

// Obtener todas las mascotas
router.get('/api/mascotas', obtenerMascotas);
// Obtener una mascota por ID
router.get('/api/mascota/:id', obtenerMascota);

// Actualizar una mascota por ID
router.put('/api/mascota/:id', actualizarMascota);
// Eliminar una mascota por ID
router.delete('/api/mascota/:id', eliminarMascota);

module.exports = router;

