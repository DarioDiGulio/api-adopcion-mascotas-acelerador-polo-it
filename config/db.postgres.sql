
CREATE TABLE IF NOT EXISTS mascotas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    raza VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    propietario VARCHAR(100) NOT NULL,
    foto_url VARCHAR(255)
);