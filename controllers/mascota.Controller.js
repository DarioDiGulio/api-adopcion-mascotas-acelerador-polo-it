const pool = require('../config/db.js');
const cloudinary = require('../config/cloudinary.js');
const fs = require('fs');

//Registrar mascota

async function RegistrarMascota(req, res) {
    
    try {
    const { nombre, direccion, tipo, raza, edad, propietario } = req.body;

    let foto_url = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'mascotas'
      });
      foto_url = result.secure_url;
      fs.unlinkSync(req.file.path); // elimina archivo temporal
    }

    const [rows] = await pool.query(
      'INSERT INTO mascotas (nombre, direccion, tipo, raza, edad, propietario, foto_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, direccion, tipo, raza, edad, propietario, foto_url]
    );

    res.json({
      id: rows.insertId,
      nombre,
      direccion,
      tipo,
      raza,
      edad,
      propietario,
      foto_url
    });
  } catch (err) {
    console.error('Erro en RegistrarMascota:', err);
    res.status(500).json({ error: err.message });
  }
};

//Obtener todas las mascotas
async function obtenerMascotas(req, res) {
    try {
        const[mascotas] = await pool.execute('SELECT * FROM mascotas');
        res.json(mascotas);
    } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        res.status(500).json({ message: 'Error al obtener las mascotas' });
    }
}

//Obtener una mascota por ID
async function obtenerMascota(req, res) {
    try {
        const { id } = req.params;
        const [mascota] = await pool.execute('SELECT * FROM mascotas WHERE id = ?', [id]);
        if (mascota.length === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.json(mascota[0]);
    } catch (error) {
        console.error('Error al obtener la mascota:', error);
        res.status(500).json({ message: 'Error al obtener la mascota' });
    }
}
//Actualizar una mascota por ID
async function actualizarMascota(req, res) {
    try {
        const { id } = req.params;
        const { nombre, direccion, tipo, raza, edad, propietario } = req.body;
        //Validar que no esten vacios los campos
        if (!nombre || !direccion || !tipo || !raza || !edad || !propietario) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const [result] = await pool.execute(
            'UPDATE mascotas SET nombre = ?, direccion = ?, tipo = ?, raza = ?, edad = ?, propietario = ? WHERE id = ?',
            [nombre, direccion, tipo, raza, edad, propietario, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.json({ message: 'Mascota actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la mascota:', error);
        res.status(500).json({ message: 'Error al actualizar la mascota' });
    }
}

//Eliminar una mascota por ID
async function eliminarMascota(req, res) {
    try {
        const { id } = req.params;
        const [result] = await pool.execute('DELETE FROM mascotas WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.json({ message: 'Mascota eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la mascota:', error);
        res.status(500).json({ message: 'Error al eliminar la mascota' });
    }
}

module.exports = {
    RegistrarMascota,
    obtenerMascota,
    obtenerMascotas,
    actualizarMascota,
    eliminarMascota
};
