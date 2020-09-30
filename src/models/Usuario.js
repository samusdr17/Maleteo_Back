const mongoose = require('mongoose');
const validator = require('validator');
 
const Schema = mongoose.Schema;

const usuarioSchema = new Schema(
    {
        'rol': { type: String, 'enum': ['user', 'guardian'], 'default': 'user'},
        
        'name': { type: String, 'required': true, },
        'surname': {type: String, 'required': true, },
        'email': { type: String, 
            'validator': validator.isEmail('foo@bar.com'), 'message': 'EMAIL_NOT_FOUND',
            'lowercase': true, 'unique': true, 'required': true},
        'password': { type: String, 'required': true },
        'image': { type: String },
        'birthday': { type: Date, 'required': true },
        'maleteo_servicio':[{ type: Schema.Types.ObjectId, 'ref': 'Bultos'}],
        'nick_guardian': { type: String, 'rol': 'guardian'},
        'geolocalizacion': {type: String, 'unique': true, rol: 'guardian'},
        'descripcion':{type: String, 'rol': 'guardian'},
        'valoracion':{ type: Array, 'rol': 'guardian'},
        'patena':{type: Boolean, 'default': false, 'rol': 'guardian'},
        'fortin': { type: Boolean, 'default': false, 'rol': 'guardian'},
        'reservado': { type: Boolean, 'default': false, 'rol': 'guardian'},
        'espacio_guardian': { 
            'propiedad': { type: String},
            'tipo_espacio': { type: Array}
        }
        // urlFacebook: { type: String, validate: { validator(v)
        //     {return v === '' ? true : validator.isURL(v)},
        // message: 'INVALID_URL'}, lowercase: true},
        // urlGoogle: { type: String, validate: { validator(v)
        //     {return v === '' ? true : validator.isURL(v)},
        // message: 'INVALID_URL'}, lowercase: true},
        
    },
    {
        'timestamps': true,
    }
);


const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;