import mongoose from "mongoose";
import Estudiantes from "../models/Estudiantes.js";
import Matriculas from "../models/Matriculas.js";

const crearEstudiante = async (req, res) => {
    // Obtener datos
    const { email, cedula, telefono } = req.body;

    // Validaciones
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, todos los campos son obligatorios" });
    }

    const usuarioId = req.usuarioBDD?.toString();
    if (!usuarioId) {
        return res.status(401).json({ msg: "Usuario no autenticado" });
    }

    // Verificar duplicados para el usuario actual
    const existe = await Estudiantes.findOne({
        usuario: usuarioId,
        $or: [{ email }, { cedula }, { telefono }],
    });

    if (existe) {
        if (existe.email === email) {
            return res.status(400).json({ msg: "El correo ya está registrado para este usuario" });
        }
        if (existe.cedula === cedula) {
            return res.status(400).json({ msg: "La cédula ya está registrada para este usuario" });
        }
        if (existe.telefono === telefono) {
            return res.status(400).json({ msg: "El teléfono ya está registrado para este usuario" });
        }
    }

    try {
        const nuevoEstudiante = new Estudiantes({ ...req.body, usuario: usuarioId });
        await nuevoEstudiante.save();
        return res.status(201).json({ msg: "Estudiante creado correctamente" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: "El correo, cédula o teléfono ya está registrado para este usuario" });
        }
        return res.status(500).json({ msg: "Error en el servidor" });
    }
};

const visualizarEstudiante = async (req, res) => {
    try {
        const estudiantes = await Estudiantes.find({ usuario: req.usuarioBDD }).select("-createdAt -updatedAt -__v -usuario");
        return res.status(200).json(estudiantes);
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al obtener los estudiantes" });
    }
};

const actualizarEstudiante = async (req, res) => {
    // Obtener datos
    const { id } = req.params;
    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;

    // Validaciones
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, todos los campos son obligatorios" });
    }
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "ID no válido" });
    }

    const estudiante = await Estudiantes.findById(id);
    if (!estudiante) {
        return res.status(404).json({ msg: "Estudiante no encontrado" });
    }
    if (estudiante.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para actualizar este estudiante" });
    }

    // Verificar duplicados para el usuario actual
    const existe = await Estudiantes.findOne({
        usuario: req.usuarioBDD,
        $or: [{ email }, { cedula }, { telefono }],
        _id: { $ne: id },
    });

    if (existe) {
        if (existe.email === email) {
            return res.status(400).json({ msg: "El correo ya está registrado para este usuario" });
        }
        if (existe.cedula === cedula) {
            return res.status(400).json({ msg: "La cédula ya está registrada para este usuario" });
        }
        if (existe.telefono === telefono) {
            return res.status(400).json({ msg: "El teléfono ya está registrado para este usuario" });
        }
    }

    try {
        // Actualizar estudiante
        estudiante.nombre = nombre ?? estudiante.nombre;
        estudiante.apellido = apellido ?? estudiante.apellido;
        estudiante.fecha_nacimiento = fecha_nacimiento ?? estudiante.fecha_nacimiento;
        estudiante.ciudad = ciudad ?? estudiante.ciudad;
        estudiante.direccion = direccion ?? estudiante.direccion;
        estudiante.telefono = telefono ?? estudiante.telefono;
        estudiante.email = email ?? estudiante.email;
        estudiante.cedula = cedula ?? estudiante.cedula;

        await estudiante.save();
        return res.status(200).json({ msg: "Estudiante actualizado correctamente" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: "El correo, cédula o teléfono ya está registrado para este usuario" });
        }
        return res.status(500).json({ msg: "Error en el servidor al actualizar el estudiante" });
    }
};

const eliminarEstudiante = async (req, res) => {
    // Obtener datos
    const { id } = req.params;

    // Validaciones
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "ID no válido" });
    }

    const estudiante = await Estudiantes.findById(id);
    if (!estudiante) {
        return res.status(404).json({ msg: "Estudiante no encontrado" });
    }
    if (estudiante.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para eliminar este estudiante" });
    }

    try {
        // Eliminar matrículas asociadas al estudiante
        await Matriculas.deleteMany({ estudiante: id });
        // Eliminar el estudiante
        await Estudiantes.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Estudiante y sus matrículas eliminados correctamente" });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al eliminar el estudiante" });
    }
};

export {
    crearEstudiante,
    visualizarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
};