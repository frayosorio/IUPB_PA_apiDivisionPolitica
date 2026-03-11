const bd = require("./bd");

class PaisRepositorio {
    constructor() {
        this.collectionName = 'paises';
    }

    get _collection() {
        return bd.getDB().collection(this.collectionName);
    }

    async listar() {
        try {
            return await this._collection
                .find()
                .project({ id: 1, nombre: 1, continente: 1, tipoRegion: 1, codigoAlfa2: 1, codigoAlfa3: 1 })
                .toArray();
        }
        catch (error) {
            this._handleError('listar', error);
        }
    }

    async agregar(pais) {
        try {
            await this._collection.insertOne({
                id: pais.id,
                continente: pais.continente,
                tipoRegion: pais.tipoRegion,
                codigoAlfa2: pais.codigoAlfa2,
                codigoAlfa3: pais.codigoAlfa3,
                nombre: pais.nombre
            });
            return pais;
        }
        catch (error) {
            this._handleError('agregar', error);
        }
    }

    async modificar(pais) {
        try {
            const filtro = { id: pais.id };

            const resultado = await this._collection.updateOne(filtro,
                { $set: { ...pais } }
            );
            if (resultado.modifiedCount === 0) throw new Error("País no encontrado");
            return pais;
        }
        catch (error) {
            this._handleError('modificar', error);
        }
    }

    async eliminar(idPais) {
        try {
            const resultado = await this._collection.deleteOne({ id: parseInt(idPais) });
            return resultado.deletedCount > 0;
            return pais;
        }
        catch (error) {
            this._handleError('eliminar', error);
        }
    }

    _handleError(metodo, error) {
        console.error(`Error en repositorio PAIS en el método ${metodo}: ${error.message}`);
        throw error;
    }
}

module.exports = new PaisRepositorio();