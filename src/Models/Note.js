const { Schema, model } = require('mongoose');
// LO PARECIDO A UNA CREACION DE TABLAS SQL 
const NoteSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = model('Note', NoteSchema);