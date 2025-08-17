import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
const UsuarioSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        }, apellido: {
            type: String,
            required: true,
            trim: true,
        }, email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        }, password: {
            type: String,
            required: true,
            trim: true,
        }
    }, {
    timestamps: true,
}
)

UsuarioSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt) 
}
UsuarioSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


export default model("Usuario", UsuarioSchema)