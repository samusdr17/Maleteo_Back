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

usuarioRouter.get('/',  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.surname;
    const image = req.body.image;
    const birthday = req.body.birthday;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        const usuario = new Usuario()

        usuario.email = email;
        usuario.password = hash;
        usuario.name = name;
        usuario.surname = surname;
        usuario.image = image;
        usuario.birthday = birthday;

        usuario.save()
            .then((newUsuario)=> {
                res.json(newUsuario);
            })
            .catch((error)=> {
                res.status(500).send(error);
            })
    });
});

usuarioRouter.post('/',  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.surname;
    const image = req.body.image;
    const birthday = req.body.birthday;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        const usuario = new Usuario()

        usuario.email = email;
        usuario.password = hash;
        usuario.name = name;
        usuario.surname = surname;
        usuario.image = image;
        usuario.birthday = birthday;

        usuario.save()
            .then((newUsuario)=> {
                res.json(newUsuario);
            })
            .catch((error)=> {
                res.status(500).send(error);
            })
    });
});

usuarioRouter.get('/login',  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Usuario.findOne({ email : email })//Duda?? es buena idea email para la profileImage
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
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.surname;
    const image = req.body.image;
    const birthday = req.body.birthday;

    Usuario.findByIdAndDelete({ email : email })
    .then((user) => {
        if(user)
        {
            bcrypt.compare(password, user.password, function(err, result) {
                if(result)
                {
                    const accessToken = jwt.sign(
                        { userID: user._id, email: user.email }, 
                        process.env.JWT_SECRET);
                    
                    delete res.json({ logged : true, token: accessToken})
                }})
            
        }})
    })

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
    
            email = email,
            password = hash,
            name = name,
            surname = surname,
            image = image,
            birthday = birthday
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