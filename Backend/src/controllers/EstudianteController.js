import mongoose from "mongoose";
import Estudiantes from "../models/Estudiantes.js"

const crearEtudiante = async (req, res) => {
    //Obtener datos
    const { email, cedula, telefono } = req.body

    //Validaciones

    if(Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos deben llenar todo los campos" });
    const existe = await Estudiantes.findOne({ $or: [{ email }, { cedula }, { telefono }] })
    if (existe) {
        if (existe.email === email) return res.status(400).json({ msg: "Correo ya registrado" });
        if (existe.cedula === cedula) return res.status(400).json({ msg: "Cedula ya registrado" });
        if (existe.telefono === telefono) return res.status(400).json({ msg: "Telefono ya registrado" });

    }

    // Creamos nuevo estudiante
    const nuevoEstudiante = new Estudiantes({ ...req.body })
    await nuevoEstudiante.save()

    res.status(200).json({ msg: "Creado correctamente el Estudiante" })
}

const visualizarEtudiante = async (req, res) => {
    const obtenerEstudiante = await Estudiantes.find().select("-createdAt -updatedAt -__v")
    res.status(200).json(obtenerEstudiante)

}

const actualizarEtudiante = async (req, res) => {
    //Obtener datos
    const { id } = req.params
    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body

    //Validaciones
    if(Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos deben llenar todo los campos" });
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: "ID No valido" })
    const existe = await Estudiantes.findOne({ $or: [{ telefono }, { email }, { cedula }],_id: { $ne: id } })
    if (existe) {
        if (existe.telefono === telefono) return res.status(400).json({ msg: "Telefono ya registrado" });
        if (existe.email === email) return res.status(400).json({ msg: "Email ya registrado" });
        if (existe.cedula === cedula) return res.status(400).json({ msg: "Cedula ya registrado" });

    }
    const actualizarEstudiante = await Estudiantes.findById(id)
    if (!actualizarEstudiante) return res.status(400).json({ msg: "Estudiante no encontrado" })

    actualizarEstudiante.nombre = nombre ?? actualizarEstudiante.nombre
    actualizarEstudiante.apellido = apellido ?? actualizarEstudiante.apellido
    actualizarEstudiante.fecha_nacimiento = fecha_nacimiento ?? actualizarEstudiante.fecha_nacimiento
    actualizarEstudiante.ciudad = ciudad ?? actualizarEstudiante.ciudad
    actualizarEstudiante.direccion = direccion ?? actualizarEstudiante.direccion
    actualizarEstudiante.telefono = telefono ?? actualizarEstudiante.telefono
    actualizarEstudiante.email = email ?? actualizarEstudiante.email

    await actualizarEstudiante.save()
    res.status(200).json({ msg: "Actualizado correctamente el Estudiante" })
}

const eliminarEtudiante = async (req, res) => {
    //Obtener datos
    const { id } = req.params

    //Validaciones
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: "ID No valido" })
    await Estudiantes.findByIdAndDelete(id)

    res.status(200).json({ msg: "Eliminado correctamente el Estudiante" })
}

export {
    crearEtudiante,
    visualizarEtudiante,
    actualizarEtudiante,
    eliminarEtudiante
}