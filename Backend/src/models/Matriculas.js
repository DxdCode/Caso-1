import { Schema, model } from 'mongoose'

const MatriculaSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    creditos: {
        type: Number,
        required: true,
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: "Estudiante",
        required: true
    },
    materia: [{
        type: Schema.Types.ObjectId,
        ref: "Materia",
        required: true
    }]
}, {
    timestamps: true
})

export default model('Matricula', MatriculaSchema)