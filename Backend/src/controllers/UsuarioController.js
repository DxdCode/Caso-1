import { crearTokenJWT } from "../middlewares/JWT.js";
import Usuarios from "../models/Usuarios.js";

const register = async (req, res) => {
    // Obtener datos del body
    const { email, password } = req.body
    
    // Validaciones
    if (Object.values(req.body).includes("")) return res.status(404).json({ msg: "Lo sentimos deben llenar todo los campos" });
    const verificarEmailBDD = await Usuarios.findOne({ email })
    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos el correo ya se encuentra registrado" });
    
    // Crear usuario y guardar
    const nuevoUsuario = new Usuarios({ ...req.body, })
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)
    await nuevoUsuario.save()
    
    //Responder correctamente
    res.status(200).json({ msg: "Usuario registrado correctamente" })
}

const login = async (req, res) => {
    // Obtener datos del body
    const { email, password } = req.body
    
    // Validaciones
    if (Object.values(req.body).includes("")) return res.status(404).json({ msg: "Lo sentimos deben llenar todo los campos" });
    
    const usuarioBDD = await Usuarios.findOne({ email }).select("-__v -updatedAt -createdAt");
    if (!usuarioBDD) return res.status(400).json({ msg: "Correo no registrado" });

    const verificarPasswordBDD = await usuarioBDD.matchPassword(password)
    if (!verificarPasswordBDD) return res.status(400).json({ msg: "Contraseña incorrecta" });
    
    // Extraer datos
    const { nombre, apellido,email:usuarioEmail, _id } = usuarioBDD;
    
    // Crear Token
    const token = crearTokenJWT(usuarioBDD._id)

    // Respuesta
    res.status(200).json({token,nombre,apellido,email:usuarioEmail,_id})
}

export {
    register,
    login
}