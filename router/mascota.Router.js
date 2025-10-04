const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    RegistrarMascota,
    obtenerMascota,
    obtenerMascotas,
    actualizarMascota,
    eliminarMascota     

} = require('../controllers/mascota.Controller');
const upload = multer({ dest: 'uploads/' });

// Crear una nueva mascota
router.post('/mascota',upload.single('foto'), RegistrarMascota);

// Obtener todas las mascotas
router.get('/mascotas', obtenerMascotas);
// Obtener una mascota por ID
router.get('/mascota/:id', obtenerMascota);

// Actualizar una mascota por ID
router.put('/mascota/:id', actualizarMascota);
// Eliminar una mascota por ID
router.delete('/mascota/:id', eliminarMascota);

module.exports = router;

