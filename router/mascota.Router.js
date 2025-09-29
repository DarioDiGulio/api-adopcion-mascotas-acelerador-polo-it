const express = require('express');
const router = express.Router();
const {
    RegistrarMascota,
    obtenerMascota,
    obtenerMascotas,
    actualizarMascota,
    eliminarMascota     

} = require('../controllers/mascota.Controller');

// Crear una nueva mascota
router.post('/mascota', RegistrarMascota);

// Obtener todas las mascotas
router.get('/mascotas', obtenerMascotas);
// Obtener una mascota por ID
router.get('/mascota/:id', obtenerMascota);

// Actualizar una mascota por ID
router.put('/mascota/:id', actualizarMascota);
// Eliminar una mascota por ID
router.delete('/mascota/:id', eliminarMascota);

module.exports = router;

