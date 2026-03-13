const regionRepositorio = require('../repositorios/region.repositorio');

class RegionControlador {
    async listar(solicitud, respuesta) {
        try {
            const { id } = solicitud.params;
            const datos = await regionRepositorio.listar(id);
            respuesta.status(200).json(datos);
        } catch (error) {
            respuesta.status(500).json({
                mensaje: "Error obteniendo la lista de regiones",
                error: error.message
            });
        }
    }

    async agregar(solicitud, respuesta) {
        try {
            const { id } = solicitud.params;
            const region = solicitud.body;

            const datos = await regionRepositorio.agregar(id, region);
            respuesta.status(201).json(datos);
        } catch (error) {
            respuesta.status(500).json({
                mensaje: "Error agregando región",
                error: error.message
            });
        }
    }

    async modificar(solicitud, respuesta) {
        try {
            const { id } = solicitud.params;
            const region = solicitud.body;

            const datos = await regionRepositorio.modificar(id, region);
            respuesta.status(200).json(datos);
        } catch (error) {
            respuesta.status(500).json({
                mensaje: "Error modificando región",
                error: error.message
            });
        }
    }

    async eliminar(solicitud, respuesta) {
        try {
            const { id, nombre } = solicitud.params;
            const eliminado = await regionRepositorio.eliminar(id, nombre);

            if (!eliminado) {
                return respuesta.status(404).json({ mensaje: "Región no encontrada para eliminar" });
            }

            respuesta.status(200).json({ mensaje: "Región eliminada correctamente", nombre });
        } catch (error) {
            respuesta.status(500).json({
                mensaje: "Error eliminando región",
                error: error.message
            });
        }
    }
}

// Exportamos la instancia (Singleton)
module.exports = new RegionControlador();