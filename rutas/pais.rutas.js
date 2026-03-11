const express = require("express")
const controlador = require("../controladores/pais.controlador");
const paisValidador = require("../validadores/pais.validador");

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

        /**
        * @swagger
        * /api/paises:
        *   post:
        *     summary: Agregar un nuevo país
        *     description: Agrega un nuevo país al sistema
        *     tags:
        *       - Países
        *     requestBody:
        *       required: true
        *       content:
        *         application/json:
        *           schema:
        *             type: object
        *             properties:
        *               id:
        *                 type: integer
        *                 example: 1
        *               nombre:
        *                 type: string
        *                 example: "Colombia"
        *               continente:
        *                 type: string
        *                 example: "AMERICA"
        *               tipoRegion:
        *                 type: string
        *                 example: "Departamento"
        *               codigoAlfa2:
        *                 type: string
        *                 example: "CO"
        *               codigoAlfa3:
        *                 type: string
        *                 example: "COL"
        *     responses:
        *       200:
        *         description: País agregado exitosamente
        *       400:
        *         description: Error en la solicitud
        *       500:
        *         description: Error interno del servidor
        */
        this.enrutador.post("/", paisValidador.validarBody, (solicitud, respuesta) => controlador.agregar(solicitud, respuesta));

                /**
        * @swagger
        * /api/paises:
        *   put:
        *     summary: Modificar un país existente
        *     description: Modifica un  país en el sistema
        *     tags:
        *       - Países
        *     requestBody:
        *       required: true
        *       content:
        *         application/json:
        *           schema:
        *             type: object
        *             properties:
        *               id:
        *                 type: integer
        *                 example: 1
        *               nombre:
        *                 type: string
        *                 example: "Colombia"
        *               continente:
        *                 type: string
        *                 example: "AMERICA"
        *               tipoRegion:
        *                 type: string
        *                 example: "Departamento"
        *               codigoAlfa2:
        *                 type: string
        *                 example: "CO"
        *               codigoAlfa3:
        *                 type: string
        *                 example: "COL"
        *     responses:
        *       200:
        *         description: País modificado exitosamente
        *       400:
        *         description: Error en la solicitud
        *       404:
        *         description: País no encontrado
        *       500:
        *         description: Error interno del servidor
        */
         this.enrutador.put("/", paisValidador.validarBody, (solicitud, respuesta) => controlador.modificar(solicitud, respuesta));

        /**
        * @swagger
        * /api/paises/{id}:
        *   delete:
        *     summary: Elimina un país por ID
        *     tags:
        *       - Países
        *     parameters:
        *       - in: path
        *         name: id
        *         required: true
        *         description: ID del país a eliminar
        *         schema:
        *           type: integer
        *     responses:
        *       200:
        *         description: País eliminado correctamente
        *       404:
        *         description: País no encontrado
        *       500:
        *         description: Error en el servidor
        */
          this.enrutador.delete("/:id", paisValidador.validarParametroId, (solicitud, respuesta) => controlador.eliminar(solicitud, respuesta));
    }

    get getEnrutador() {
        return this.enrutador;
    }
}

// Exportamos la instancia (Singleton)
module.exports = new PaisRutas().getEnrutador;