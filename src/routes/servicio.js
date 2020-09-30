const express = require('express');
const Servicio = require('../models/Servicio');
const authenticateJWT = require('../middlewares/autentication');

const servicioRouter = express.Router();

servicioRouter.post('/', authenticateJWT, (req, res) => {
    const maleteo_servicio = req.body.maleteo_servicio;
    const guardian = req.body.guardian;
    const valoracion = req.body.valoracion;
    const patena = req.body.patena;
    const fortin = req.body.fortin;
    const reservado = req.body.reservado;

    const servicio = new Servicio()

    servicio.maleteo_servicio = maleteo_servicio;
    servicio.guardian = guardian;
    servicio.valoracion = valoracion;
    servicio.patena = patena;
    servicio.fortin = fortin;
    servicio.reservado = reservado;

    servicio.save()
        .then((newServicio)=> {
            res.json(newServicio);
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
});

servicioRouter.get('/:id', authenticateJWT, (req, res)=> {
    const id = req.params.id;
    Servicio.findById(id, {__v: 0, updatedAt: 0, createdAt: 0})
        .populate('maleteo_servicio')
        .exec((err, servicio) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(servicio)
            }
        })
});

servicioRouter.delete('/:id', authenticateJWT, (req, res)=> {
    const id = req.params.id;
    Servicio.findByIdAndDelete(id)
        .then((servicioBorrado)=> {
            res.send(servicioBorrado = {mensaje : `Se ha borrado correctamente el servicio con id ${id}`});
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
});

servicioRouter.put("/:id", authenticateJWT, (req, res) => {
    const id = req.params.id;

    const guardian = req.body.guardian;
    const valoracion = req.body.valoracion;
    const patena = req.body.patena;
    const fortin = req.body.fortin;
    const reservado = req.body.reservado;

    Servicio.findByIdAndUpdate(id, {
        guardian: guardian,
        valoracion: valoracion,
        patena: patena,
        fortin: fortin,
        reservado: reservado,
    })
    .then(()=> {
        return Servicio.findById(id);
    })
    .then((servicioActualizado)=> {
        res.send(servicioActualizado = {mensaje : `Se ha actualizado correctamente el servicio con id ${id}`});
    })
    .catch((error)=> {
        res.status(500).send(error);
    })

});


module.exports = servicioRouter;