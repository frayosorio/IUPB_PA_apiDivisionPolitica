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

    _handleError(metodo, error) {
        console.error(`Error en repositorio PAIS en el método ${metodo}: ${error.message}`);
        throw error;
    }



}