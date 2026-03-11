const regionRepositorio = require('../repositorios/region.repositorio');

class RegionControlador {
    async listar(req, res) {
        try {
            const { id } = req.params;
            const datos = await regionRepositorio.listar(id);
            res.status(200).json(datos);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error obteniendo la lista de regiones",
                error: error.message
            });
        }
    }
}

// Exportamos la instancia (Singleton)
module.exports = new RegionControlador();