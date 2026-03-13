const express = require('express');
const controlador = require('../controladores/region.controlador');
const validador = require("../validadores/region.validador");

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

        /**
         * @swagger
         * /api/paises/{id}/regiones:
         *   post:
         *     summary: Agrega una región a un país
         *     tags: [Regiones]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID del país
         *         schema:
         *           type: integer
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               nombre:
         *                 type: string
         *               area:
         *                 type: number
         *               poblacion:
         *                 type: number
         *     responses:
         *       200:
         *         description: Región agregada correctamente
         */
        this.enrutador.post('/:id/regiones',
            validador.validarIdPaisParam,
            validador.validarBody,
            (solicitud, respuesta) => controlador.agregar(solicitud, respuesta)
        );

        /**
         * @swagger
         * /api/paises/{id}/regiones:
         *   put:
         *     summary: Modifica una región existente
         *     tags: [Regiones]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID del país
         *         schema:
         *           type: integer
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - nombre
         *             properties:
         *               nombre:
         *                 type: string
         *               area:
         *                 type: number
         *               poblacion:
         *                 type: number
         *     responses:
         *       200:
         *         description: Región modificada correctamente
         */
        this.enrutador.put('/:id/regiones',
            validador.validarIdPaisParam,
            validador.validarBody,
            (solicitud, respuesta) => controlador.modificar(solicitud, respuesta)
        );

        /**
         * @swagger
         * /api/paises/{id}/regiones/{nombre}:
         *   delete:
         *     summary: Elimina una región por nombre
         *     tags: [Regiones]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID del país
         *       - in: path
         *         name: nombre
         *         required: true
         *         schema:
         *           type: string
         *         description: Nombre de la región
         *     responses:
         *       200:
         *         description: Región eliminada correctamente
         */
        this.enrutador.delete('/:id/regiones/:nombre',
            validador.validarIdPaisParam,
            validador.validarNombreParam,
            (solicitud, respuesta) => controlador.eliminar(solicitud, respuesta)
        );
    }



    get getEnrutador() {
        return this.enrutador;
    }
}

// Exportamos la instancia (Singleton)
module.exports = new RegionRutas().getEnrutador;