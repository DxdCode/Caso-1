import { Schema, model } from 'mongoose'

const EstudianteSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        apellido: {
            type: String,
            required: true,
            trim: true,
        },
        cedula: {
            type: String,
            required: true,
            trim: true,
            unique:true
        },
        fecha_nacimiento: {
            type: Date,
            required: true,
            trim: true,
        },
        ciudad: {
            type: String,
            required: true,
            trim: true,
        },
        direccion: {
            type: String,
            required: true,
            trim: true,
        },
        telefono: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique:true

        },
    },{
        timestamps: true,
    }
)
export default model("Estudiante", EstudianteSchema)
