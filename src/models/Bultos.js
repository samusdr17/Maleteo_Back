const mongoose = require('mongoose');
const validator = require('validator');
 
const Schema = mongoose.Schema;

const bultosSchema = new Schema(
    {
        'num_bultos':{type: String, required: true},
        'fecha_ini':{type: Date},
        'fecha_fin':{type: Date},
        'guardian_id': {type: String},
        'usuario_id': {type: String},

    },
    {
        'timestamps': true,
    }
);


const Bultos = mongoose.model('Bultos', bultosSchema);
module.exports = Bultos;