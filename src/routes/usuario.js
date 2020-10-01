const express = require('express');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middlewares/autentication');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let multer  = require('multer');
// const { delete } = require('./home');

const VALID_FILE_TYPES = ['image/png', 'image/jpg'];
const IMAGES_URL_BASE = "/profileImages"

const fileFilter = (req, file, cb) => {
  if (!VALID_FILE_TYPES.includes(file.mimetype)) {
    cb(new Error('Invalid file type'));
  } else {
    cb(null, true);
  }
}

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public' + IMAGES_URL_BASE)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
let upload = multer({ storage: storage, fileFilter: fileFilter })


const usuarioRouter = express.Router();
// const guardianRouter = express.Router();

// Este GET es necesario?, o solo sería útil para quien gestione la aplicación?
usuarioRouter.get('/', (req, res) => {
    Usuario.find({}, {__v: 0, createdAt: 0, updatedAt: 0})
        .then((user)=>{
            res.send(user)
        })
        .catch((error)=>{
            res.status(500).send(error)
        })
});

usuarioRouter.get('/:rol', (req, res)=> {
    // const id = req.params.id;
    const rol = req.params.rol.guardian;
    Usuario.findById(rol, {__v: 0, updatedAt: 0, createdAt: 0})
        .populate('maleteo_servicio')
        .exec((err, user) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(user)
            }
        })
});

usuarioRouter.get('/:id', (req, res)=> {
    const id = req.params.id;
    Usuario.findById(id, {__v: 0, updatedAt: 0, createdAt: 0})
        .populate('maleteo_servicio')
        .exec((err, user) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(user)
            }
        })
});

usuarioRouter.post('/',  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.surname;
    const image = req.body.image;
    const birthday = req.body.birthday;
    const maleteo_servicio = req.body.maleteo_servicio;
    const valoracion = req.body.valoracion;
    const patena = req.body.patena;
    const fortin = req.body.fortin;
    const reservado = req.body.reservado;
    

    console.log(req.body)

    bcrypt.hash(password, saltRounds, function(err, hash) {
        const usuario = new Usuario()

        usuario.email = email;
        usuario.password = hash;
        usuario.name = name;
        usuario.surname = surname;
        usuario.image = image;
        usuario.birthday = birthday;
        usuario.maleteo_servicio = maleteo_servicio;
        usuario.valoracion = valoracion;
        usuario.patena = patena;
        usuario.fortin = fortin;
        usuario.reservado = reservado;

        console.log(usuario)

        usuario.save()
            .then((newUsuario)=> {
                res.json(newUsuario);
            })
            .catch((error)=> {
                res.status(500).send(error);
            })
    });
});

// guardianRouter.post('/', authenticateJWT, (req, res) => {
    

//     const servicio = new Servicio()

    // servicio.maleteo_servicio = maleteo_servicio;
    // servicio.valoracion = valoracion;
    // servicio.patena = patena;
    // servicio.fortin = fortin;
    // servicio.reservado = reservado;

//     servicio.save()
//         .then((newGuardian)=> {
//             res.json(newGuardian);
//         })
//         .catch((error)=> {
//             res.status(500).send(error);
//         })
// });

usuarioRouter.get('/login',  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Usuario.findOne({ email : email })
    .then((user) => {
        if(user)
        {
            bcrypt.compare(password, user.password, function(err, result) {
                if(result)
                {
                    const accessToken = jwt.sign(
                        { userID: user._id, email: user.email }, 
                        process.env.JWT_SECRET);
                    
                    return res.json({ logged : true, token: accessToken})
                }
                else
                {
                    return res.status(404).json({ logged : false})
                }
            });
        }
        else
        {
            return res.status(404).json({ logged : false})
        }
    })
    .catch((err)=>{
        return res.status(404).json({ logged : false})
    })
});

usuarioRouter.post('/login',  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Usuario.findOne({ email : email })
    .then((user) => {
        if(user)
        {
            bcrypt.compare(password, user.password, function(err, result) {
                if(result)
                {
                    const accessToken = jwt.sign(
                        { userID: user._id, email: user.email }, 
                        process.env.JWT_SECRET);
                    
                    return res.json({ logged : true, token: accessToken})
                }
                else
                {
                    return res.status(404).json({ logged : false})
                }
            });
        }
        else
        {
            return res.status(404).json({ logged : false})
        }
    })
    .catch((err)=>{
        return res.status(404).json({ logged : false})
    })
});

usuarioRouter.get('/logout', authenticateJWT, (req, res)=> {

    const userData = req.user

    res.json({ loggedout : true, goodBye: userData.email})
})

usuarioRouter.post('/profileImage', authenticateJWT, upload.single('avatar'), function (req, res, next) {
    
    console.log(req.file)

    Usuario.findByIdAndUpdate(req.user.userID, {
        image : IMAGES_URL_BASE + "/" + req.file.filename
    })
    .then((updatedUser, err) => {
        if(err)
        {
            res.status(500).send(err)
        }
        else{
            res.send("Imagen actualizada")
        }
    })
})

usuarioRouter.delete('/:id',  (req, res) => {
    const id = req.params.id;

    Usuario.findByIdAndDelete({ id })
        .then((usuarioBorrado)=> {
            res.send({mensaje : `Se ha borrado correctamente el usuario con id ${id}`});
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
});
    

    usuarioRouter.put('/:id',  (req, res) => {
        const id = req.params.id;

        const email = req.body.email;
        const password = req.body.hash;
        const name = req.body.name;
        const surname = req.body.surname;
        const image = req.body.image;
        const birthday = req.body.birthday;
    
        bcrypt.hash(password, saltRounds, (err, hash) => {
            Usuario.findByIdAndUpdate(id, {
    
            email: email,
            password: hash,
            name: name,
            surname: surname,
            image: image,
            birthday: birthday
        })
        .then(()=> {
            return Usuario.findById(id);
        })
        .then((usuarioActualizado)=> {
            res.send(usuarioActualizado);
        })
        .catch((error)=> {
            res.status(500).send(error);
        })
        });
    });


module.exports = usuarioRouter;
// module.exports = guardianRouter;