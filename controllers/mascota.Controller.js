const pool = require('../config/db.js');
const cloudinary = require('../config/cloudinary.js');

// Registrar mascota (solo JSON)
async function RegistrarMascota(req, res) {
    try {
        const { nombre, direccion, tipo, raza, edad, propietario } = req.body;

        const [rows] = await pool.query(
          'INSERT INTO mascotas (nombre, direccion, tipo, raza, edad, propietario, foto_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [nombre, direccion, tipo, raza, edad, propietario, null]
        );

        res.json({
          message: 'Mascota registrada exitosamente',
          id: rows.insertId
        });
    } catch (err) {
        console.error('Error en RegistrarMascota:', err);
        res.status(500).json({ error: err.message });
    }
}

// Subir imagen usando memoria (sin tocar disco)
async function SubirImgMascota(req, res) {
    try {
        const { id } = req.params;
        console.log('Parametros recibidos:', req.params); 
        console.log('Archivo recibido:', req.file);       

        if (!req.file) return res.status(400).json({ message: 'No se ha subido ninguna imagen' });

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'mascotas' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(req.file.buffer); // req.file.buffer contiene el archivo en memoria
        });

        await pool.execute('UPDATE mascotas SET foto_url = ? WHERE id = ?', [result.secure_url, id]);

        res.json({ message: 'Imagen subida exitosamente', url: result.secure_url });

    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ message: 'Error al subir la imagen', error: error.message });
    }
}
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
    SubirImgMascota,
    obtenerMascota,
    obtenerMascotas,
    actualizarMascota,
    eliminarMascota
};
