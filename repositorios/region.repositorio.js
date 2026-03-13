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

    async agregar(idPais, region) {
        try {
            const resultado = await this._collection.updateOne(
                { id: parseInt(idPais) },
                {
                    $push: {
                        regiones: {
                            ...region,
                            ciudades: []
                        }
                    }
                }
            );

            if (resultado.matchedCount === 0) throw new Error('El país no existe');
            return region;
        } catch (error) {
            this._handleError('agregar', error);
        }
    }

    async modificar(idPais, region) {
        try {
            const resultado = await this._collection.updateOne(
                {
                    id: parseInt(idPais),
                    "regiones.nombre": region.nombre
                },
                {
                    $set: {
                        'regiones.$.area': region.area,
                        'regiones.$.poblacion': region.poblacion,
                    }
                }
            );

            if (resultado.matchedCount === 0) throw new Error('No se encontró la región para modificar');
            return region;
        } catch (error) {
            this._handleError('modificar', error);
        }
    }

    async eliminar(idPais, nombreRegion) {
        try {
            const resultado = await this._collection.updateOne(
                { id: parseInt(idPais) },
                {
                    $pull: {
                        regiones: { nombre: nombreRegion }
                    }
                }
            );
            return resultado.modifiedCount > 0;
        } catch (error) {
            this._handleError('eliminar', error);
        }
    }

    _handleError(metodo, error) {
        console.error(`Error en repositorio REGION en el método ${metodo}: ${error.message}`);
        throw error;
    }

}

// Exportamos la instancia (Singleton)
module.exports = new RegionRepositorio();