const express = require("express")
const bd = require("./repositorios/bd")
const paisRutas = require("./rutas/pais.rutas")
const swaggerConfig = require("./configuracion/swagger")


class App {
    constructor() {
        this.app = express()
        this.puerto = process.env.PORT || 3030
        this._conectarBaseDatos();
        this._configurarRutas();
        this._configurarDocumentacion();
    }

    async _conectarBaseDatos() {
        try {
            await bd.conectar();
        }
        catch (error) {
            console.error("No se pudo conectar a la base de datos", error);
            process.exit(1);
        }
    }

    _configurarRutas() {
        this.app.get('/', (req, res) => res.json({ estado: "Online" }));

        this.app.use("/api/paises", paisRutas);

    }

    _configurarDocumentacion() {
        swaggerConfig.configurar(this.app);
    }

    escuchar() {
        this.app.listen(this.puerto, () => {
            console.log(`API División Política está escuchando en el puerto ${this.puerto}`);
        })
    }
}

module.exports = new App();