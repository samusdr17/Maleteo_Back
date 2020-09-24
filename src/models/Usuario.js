const mongoose = require('mongoose');
const validator = require('validator');
 
const Schema = mongoose.Schema;

const usuarioSchema = new Schema(
    {
        name: { type: String, required: true},
        surname: {type: String, required: true},
        email: { type: String, 
            validator: validator.isEmail('foo@bar.com'), message: 'EMAIL_NOT_FOUND',
            lowercase: true, unique: true, required: true},
        password: { type: String, required: true },
        image: { type: String },
        birthday: { type: Date, required: true},
        rol: { type: String, enum: ['user', 'guardian'], default: 'user'},
        urlFacebook: { type: String, validate: { validator(value)
            {return value === '' ? true : validator.isURL(value)},
        message: 'INVALID_URL'}, lowercase: true},
        urlGoogle: { type: String, validate: { validator(value)
            {return value === '' ? true : validator.isURL(value)},
        message: 'INVALID_URL'}, lowercase: true},
    },
    {
        timestamps: true,
    }
);


const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;