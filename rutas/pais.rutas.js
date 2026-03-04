const express = require("express")
const controlador = require("../controladores/pais.controlador")

class PaisRutas {
    constructor() {
        this.enrutador = express.Router();
        this._configurarRutas();
    }


    _configurarRutas() {
        //Instrucciones en YAML, lenguaje para configuracion de infraestructura
        /**
        * @swagger
        * /api/paises:
        *   get:
        *     summary: Obtiene todos los países
        *     tags:
        *       - Países
        *     responses:
        *       200:
        *         description: Lista de países
         */
        this.enrutador.get("/", (solicitud, respuesta) => controlador.listar(solicitud, respuesta));

    }

    get getEnrutador() {
        return this.enrutador;
    }
}

module.exports = new PaisRutas().getEnrutador;