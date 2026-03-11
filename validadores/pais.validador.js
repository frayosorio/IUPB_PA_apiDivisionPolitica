class PaisValidador {
    validarBody(solicitud, respuesta, next) {

        const { id, nombre, continente } = solicitud.body;
        const errores = [];

        if (!id) errores.push("El campo [id] es requerido");
        if (!nombre || nombre.trim().length < 3) errores.push("El campo [nombre] debe tener al menos 3 caracteres");
        if (!continente) errores.push("El campo [continente] es requerido");

        if (errores.length > 0) {
            return respuesta.status(400).json({
                mensaje: "Error validando la solicitud",
                detalles: errores
            });
        }
        next();
    }

    validarParametroId(solicitud, respuesta, next) {
        const id  = parseInt(solicitud.params.id);
        if (isNaN(id)) {
            return respuesta.status(400).json({
                mensaje: "El [Id] debe ser un número válido",
            });
        }
        next();
    }

}

module.exports = new PaisValidador();