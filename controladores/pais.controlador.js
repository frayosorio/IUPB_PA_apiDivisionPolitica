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
}