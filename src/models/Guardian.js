const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guardianSchema = new Schema(
    {
        'maleteo_servicio':[{ type: Schema.Types.ObjectId, 'ref': 'Bultos'}],
        'nick_guardian': { type: String, 'rol': 'guardian'},
        'location': {'type': {type: String, 'enum': ['Point'], 'rol': 'guardian'}, 'coordinates':[Number]},//Preguntar porque coordinates no atiende al rol
        'descripcion':{type: String, 'rol': 'guardian'},
        'valoracion':{ type: Number, 'rol': 'guardian'},//Preguntar porque tipo Array no atiende al rol
        'patena':{type: Boolean, 'default': true,'rol': 'guardian'},
        'fortin': { type: Boolean, 'default': true, 'rol': 'guardian'},
        'espacio_guardian': { 
            'propiedad': { type: String, 'rol': 'guardian'},
            'tipo_espacio': { type: Number, 'rol': 'guardian'}
        },
        'reservado': { type: String, default: 'libre'},
    },
    {
        'timestamps': true,
    }
);


const Guardian = mongoose.model('Guardian', guardianSchema);
module.exports = Guardian;