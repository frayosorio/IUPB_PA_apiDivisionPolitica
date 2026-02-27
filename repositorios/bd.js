const configBD = require("../configuracion/bdconfig")
const { MongoClient } = require('mongodb');

class ConexionBD {
    constructor() {
        this.url = configBD.url;
        this.cliente = new MongoClient(this.url);
        this.db = null;
        this.nombreBD = configBD.BASEDATOS;
    }

    async conectar() {
        try {
            if (this.db) return this.db;
            await this.cliente.connect();
            this.db = this.cliente.db(this.nombreBD);
            console.log('Conexión a la base de datos establecida');
            return this.db;
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error;
        }
    }

    getDB() {
        if (!this.db) {
            throw new Error('No hay conexión a la base de datos');
        }
        return this.db;
    }

    async desconectar() {
        await this.cliente.close();
        this.db = null;
        console.log('Conexión a la base de datos cerrada');
    }
}


