const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.send("Bienvenido a la web de Maleteo.")
})
module.exports = homeRouter;