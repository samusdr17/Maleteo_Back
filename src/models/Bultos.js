const mongoose = require('mongoose');
const validator = require('validator');
 
const Schema = mongoose.Schema;

const bultosSchema = new Schema(
    {
        'num_bultos':{type: String, required: true},
        'fecha_ini':{type: Date},
        'fecha_fin':{type: Date},
    },
    {
        'timestamps': true,
    }
);


const Bultos = mongoose.model('Bultos', bultosSchema);
module.exports = Bultos;