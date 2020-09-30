const express = require('express');
const Bultos = require('../models/Bultos');
const authenticateJWT = require('../middlewares/autentication');

const bultosRouter = express.Router();

bultosRouter.post('/', authenticateJWT, (req, res) => {
    const num_bultos = req.body.num_bultos;
    const fecha_ini = req.body.fecha_ini;
    const fecha_fin = req.body.fecha_fin;

    const bultos = new Bultos()

    bultos.num_bultos = num_bultos;
    bultos.fecha_ini = fecha_ini;
    bultos.fecha_fin = fecha_fin;

    bultos.save()
        .then((newBultos)=> {
            res.json(newBultos);
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
});

bultosRouter.get('/:id', authenticateJWT, (req, res)=> {
    const id = req.params.id;
    Bultos.findById(id, {__v: 0, updatedAt: 0, createdAt: 0})
        .then((bultos) => {
            res.json(bultos);
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
});

bultosRouter.delete('/:id', authenticateJWT, (req, res)=> {
    const id = req.params.id;
    Bultos.findByIdAndDelete(id)
        .then((bultosBorrado)=> {
            res.send(bultosBorrado = {mensaje : `Se ha borrado correctamente el bultos con id ${id}`});
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
});

bultosRouter.put("/:id", authenticateJWT, (req, res) => {
    const id = req.params.id;

    const guardian = req.body.guardian;
    const rol = req.body.rol;

    Bultos.findByIdAndUpdate(id, {
        guardian: guardian,
        rol: rol
    })
    .then(()=> {
        return Bultos.findById(id);
    })
    .then((bultosActualizado)=> {
        res.send(bultosActualizado = {mensaje : `Se ha actualizado correctamente el servicio con id ${id}`});
    })
    .catch((error)=> {
        res.status(500).send(error);
    })

});




module.exports = bultosRouter;