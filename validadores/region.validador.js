class RegionValidador {
    validarBody(solicitud, respuesta, next) {

        if (!solicitud.body || Object.keys(solicitud.body).length === 0) {
            errores.push("El contenido de la solicitud debe incluir la región");
        }

        const { nombre, area, poblacion } = solicitud.body;
        const errores = [];

        if (!nombre || nombre.trim().length < 3) {
            errores.push("El 'nombre' de la región es obligatorio y debe tener al menos 3 caracteres.");
        }

        // Validamos que sean números y no negativos
        if (area === undefined || isNaN(area) || area < 0) {
            errores.push("El campo 'area' es obligatorio y debe ser un número positivo.");
        }

        if (poblacion === undefined || isNaN(poblacion) || poblacion < 0) {
            errores.push("El campo 'poblacion' es obligatorio (puede ser 0).");
        }

        if (errores.length > 0) {
            return respuesta.status(400).json({
                mensaje: "Error de validación en la región",
                detalles: errores
            });
        }

        next();
    }

    validarIdPaisParam(solicitud, respuesta, next) {
        const id = parseInt(solicitud.params.id);
        if (isNaN(id)) {
            return respuesta.status(400).json({
                mensaje: "El ID del país en la URL debe ser un número válido."
            });
        }
        next();
    }

    validarNombreParam(solicitud, respuesta, next) {
        const { nombre } = solicitud.params;
        if (!nombre || nombre.trim().length === 0) {
            return respuesta.status(400).json({
                mensaje: "El nombre de la región es necesario en la URL."
            });
        }
        next();
    }

}

module.exports = new RegionValidador();