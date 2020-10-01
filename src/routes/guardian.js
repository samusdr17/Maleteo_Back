const express = require('express');
const Guardian = require('../models/Guardian');
const authenticateJWT = require('../middlewares/autentication');

const guardianRouter = express.Router();

guardianRouter.post('/', authenticateJWT, (req, res) => {
    const maleteo_servicio = req.body.maleteo_servicio;
    const valoracion = req.body.valoracion;
    const patena = req.body.patena;
    const fortin = req.body.fortin;
    const reservado = req.body.reservado;

    const guardian = new Guardian()

    guardian.maleteo_servicio = maleteo_servicio;
    guardian.valoracion = valoracion;
    guardian.patena = patena;
    guardian.fortin = fortin;
    guardian.reservado = reservado;

    guardian.save()
        .then((newGuardian)=> {
            res.json(newGuardian);
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
});

guardianRouter.get('/:id', authenticateJWT, (req, res)=> {
    const id = req.params.id;
    Guardian.findById(id, {__v: 0, updatedAt: 0, createdAt: 0})
        .populate('maleteo_servicio')
        .exec((err, guardian) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(guardian)
            }
        })
});

guardianRouter.delete('/:id', authenticateJWT, (req, res)=> {
    const id = req.params.id;
    Guardian.findByIdAndDelete(id)
        .then((guardianBorrado)=> {
            res.send(guardianBorrado = {mensaje : `Se ha borrado correctamente el guardian con id ${id}`});
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
});

guardianRouter.put("/:id", authenticateJWT, (req, res) => {
    const id = req.params.id;

    const valoracion = req.body.valoracion;
    const patena = req.body.patena;
    const fortin = req.body.fortin;
    const reservado = req.body.reservado;

    Guardian.findByIdAndUpdate(id, {
        valoracion: valoracion,
        patena: patena,
        fortin: fortin,
        reservado: reservado,
    })
    .then(()=> {
        return Guardian.findById(id);
    })
    .then((guardianActualizado)=> {
        res.send(guardianActualizado = {mensaje : `Se ha actualizado correctamente el guardian con id ${id}`});
    })
    .catch((error)=> {
        res.status(500).send(error);
    })

});


module.exports = guardianRouter;