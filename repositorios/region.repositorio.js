const bd = require('./bd');


class RegionRepositorio {
    constructor() {
        this.collectionName = "paises";
    }

    get _collection() {
        return bd.getDB().collection(this.collectionName);
    }

    async listar(idPais) {
        try {
            const pipeline = [
                { $match: { id: parseInt(idPais) } },
                {
                    $project: {
                        _id: 0,
                        'regiones.nombre': 1,
                        'regiones.area': 1,
                        'regiones.poblacion': 1,
                    }
                }
            ];
            const resultado = await this._collection.aggregate(pipeline).toArray();
            return resultado.length > 0 ? (resultado[0].regiones || []) : [];
        } catch (error) {
            this._handleError('listar', error);
        }
    }

    _handleError(metodo, error) {
        console.error(`Error en repositorio REGION en el método ${metodo}: ${error.message}`);
        throw error;
    }

}

// Exportamos la instancia (Singleton)
module.exports = new RegionRepositorio();