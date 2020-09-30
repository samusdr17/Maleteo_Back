const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicioSchema = new Schema(
    {
        'maleteo_servicio':[{ type: Schema.Types.ObjectId, 'ref': 'Bultos'}],
        'guardian': { type: String, 'rol': 'guardian' },
        'valoracion':{ type: Array, 'rol': 'guardian'},
        'patena':{type: Boolean, default: false, 'rol': 'guardian'},
        'fortin': { type: Boolean, default: false, 'rol': 'guardian'},
        'reservado': { type: Boolean, default: false, 'rol': 'guardian'},
        'espacio_guardian': { 
            'propiedad': { type: String},
            'tipo_espacio': { type: Array}
        }
    },
    {
        'timestamps': true,
    }
);


const Servicio = mongoose.model('Servicio', servicioSchema);
module.exports = Servicio;