const repositorio = require("../repositorios/pais.repositorio");


class PaisControlador {
    async listar(solicitud, respuesta) {
        try {
            const datos = await repositorio.listar();
            return respuesta.json(datos);
        }
        catch (error) {
            return respuesta.status(500).json({ error: "Error al listar los países" });
        }
    }

    async agregar(solicitud, respuesta) {
        try {
            const paisAgregado = await repositorio.agregar(solicitud.body);
            return respuesta.json(paisAgregado);
        }
        catch (error) {
            return respuesta.status(500).json({ error: "Error agregando país" });
        }
    }

    async modificar(solicitud, respuesta) {
        try {
            const paisModificado = await repositorio.modificar(solicitud.body);
            return respuesta.json(paisModificado);
        }
        catch (error) {
            return respuesta.status(500).json({ error: "Error modificando país" });
        }
    }

    async eliminar({ params }, respuesta) {
        try {
            const { id } = params;
            const eliminado = await repositorio.eliminar(id);
            if (!eliminado) {
                return respuesta.status(404).json({ error: "País no encontrado" });
            }
            return respuesta.json({ mensaje: "País eliminado exitosamente" });
        }
        catch (error) {
            return respuesta.status(500).json({ error: "Error modificando país" });
        }
    }
}

// Exportamos la instancia (Singleton)
module.exports = new PaisControlador();