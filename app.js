const express = require("express")
const app = express()
const puerto = 3030


app.listen(puerto, () => {
    console.log(`API División Política está escuchando en el puerto ${puerto}`);
})