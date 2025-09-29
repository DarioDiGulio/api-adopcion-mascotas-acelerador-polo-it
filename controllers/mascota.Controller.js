const db = require('../config/db.js');

//Registrar mascota

async function RegistrarMascota(req, res) {
    
    try { 
        const { nombre,direccion,tipo,raza,edad,propietario  } = req.body;
        //Validar que no esten vacios los campos
        if (!nombre || !direccion || !tipo || !raza || !edad || !propietario) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        //Insertar la mascota a la base de datos
        const [result] = await db.execute(
            'INSERT INTO mascotas (nombre, direccion, tipo, raza, edad, propietario) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, direccion, tipo, raza, edad, propietario]
        );

        res.status(201).json({ message: 'Mascota registrada exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error al registrar la mascota:', error);
        res.status(500).json({ message: 'Error al registrar la mascota' });
    }   
}

//Obtener todas las mascotas
async function obtenerMascotas(req, res) {
    try {
        const[mascotas] = await db.execute('SELECT * FROM mascotas');
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
        const [mascota] = await db.execute('SELECT * FROM mascotas WHERE id = ?', [id]);
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
        const [result] = await db.execute(
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
        const [result] = await db.execute('DELETE FROM mascotas WHERE id = ?', [id]);
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
