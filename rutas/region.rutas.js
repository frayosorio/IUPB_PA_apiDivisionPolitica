const express = require('express');
const controlador = require('../controladores/region.controlador');

class RegionRutas {
    constructor() {
        this.enrutador = express.Router();
        this._configurarRutas();
    }

    _configurarRutas() {
        /**
         * @swagger
         * /api/paises/{id}/regiones:
         *   get:
         *     summary: Lista las regiones de un país
         *     tags: [Regiones]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID del país
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Lista de regiones
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   nombre:
         *                     type: string
         *                   area:
         *                     type: number
         *                   poblacion:
         *                     type: number
         */        
        this.enrutador.get('/:id/regiones', controlador.listar);
    }

    get getEnrutador() {
        return this.enrutador;
    }
}

// Exportamos la instancia (Singleton)
module.exports = new RegionRutas().getEnrutador;