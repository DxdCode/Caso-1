import { Schema, model } from 'mongoose'

const MateriaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    codigo: {
        type: Number,
        required: true,
        trim: true,
        unique:true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    creditos: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

export default model('Materia', MateriaSchema)