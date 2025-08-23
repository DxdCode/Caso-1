import mongoose from "mongoose";
import Estudiantes from "../models/Estudiantes.js";
import Materias from "../models/Materias.js";
import Matriculas from "../models/Matriculas.js";

const crearMatricula = async (req, res) => {
    const { codigo, descripcion, estudiante, materia } = req.body;

    // Validaciones
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, todos los campos son obligatorios" });
    }

    if (!mongoose.isValidObjectId(estudiante)) {
        return res.status(400).json({ msg: "ID de estudiante no válido" });
    }

    if (!Array.isArray(materia) || materia.length === 0) {
        return res.status(400).json({ msg: "Debe enviar al menos una materia" });
    }

    // Verificar si el código ya existe
    const existeCodigo = await Matriculas.findOne({ codigo });
    if (existeCodigo) {
        return res.status(400).json({ msg: "El código de matrícula ya está en uso" });
    }

    // Validar estudiante
    const estudianteBDD = await Estudiantes.findById(estudiante);
    if (!estudianteBDD) {
        return res.status(404).json({ msg: "Estudiante no encontrado" });
    }
    if (estudianteBDD.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para matricular este estudiante" });
    }

    // Validar si el estudiante ya tiene una matrícula
    const existeMatricula = await Matriculas.findOne({ estudiante });
    if (existeMatricula) {
        return res.status(400).json({ msg: "El estudiante ya tiene una matrícula registrada" });
    }

    // Validar materias y sumar créditos
    let totalCreditos = 0;
    const materiasValidas = [];

    for (const materiaID of materia) {
        if (!mongoose.isValidObjectId(materiaID)) {
            return res.status(400).json({ msg: `ID de materia no válido: ${materiaID}` });
        }

        const materiaBDD = await Materias.findById(materiaID);
        if (!materiaBDD) {
            return res.status(404).json({ msg: `Materia no encontrada: ${materiaID}` });
        }

        if (!materiasValidas.includes(materiaID)) {
            materiasValidas.push(materiaID);
            totalCreditos += parseInt(materiaBDD.creditos) || 0;
        }
    }

    try {
        // Crear matrícula
        const nuevaMatricula = new Matriculas({
            codigo,
            descripcion,
            creditos: totalCreditos,
            estudiante,
            materia: materiasValidas,
            usuario: req.usuarioBDD,
        });

        await nuevaMatricula.save();
        return res.status(201).json({ msg: "Matrícula creada correctamente", matricula: nuevaMatricula });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al crear la matrícula" });
    }
};

const visualizarMatricula = async (req, res) => {
    try {
        const matriculas = await Matriculas.find({ usuario: req.usuarioBDD })
            .populate("estudiante", "nombre apellido cedula")
            .populate("materia", "nombre codigo creditos")
            .select("-__v -createdAt -updatedAt");

        return res.status(200).json(matriculas);
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al obtener las matrículas" });
    }
};

const editarMatricula = async (req, res) => {
    const { id } = req.params;
    const { codigo, descripcion, materia } = req.body;

    // Validaciones
    if (!codigo || !descripcion || !materia) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "ID de matrícula no válido" });
    }

    if (!Array.isArray(materia) || materia.length === 0) {
        return res.status(400).json({ msg: "Debe enviar al menos una materia en un array" });
    }

    const matricula = await Matriculas.findById(id);
    if (!matricula) {
        return res.status(404).json({ msg: "Matrícula no encontrada" });
    }

    if (matricula.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para editar esta matrícula" });
    }

    // Verificar si el código ya existe (excluyendo la matrícula actual)
    const existeCodigo = await Matriculas.findOne({ codigo, _id: { $ne: id } });
    if (existeCodigo) {
        return res.status(400).json({ msg: `El código ${codigo} ya está en uso` });
    }

    // Validar materias y sumar créditos
    let totalCreditos = 0;
    const materiasValidas = [];

    for (const materiaID of materia) {
        if (!mongoose.isValidObjectId(materiaID)) {
            return res.status(400).json({ msg: `ID de materia no válido: ${materiaID}` });
        }

        const materiaBDD = await Materias.findById(materiaID);
        if (!materiaBDD) {
            return res.status(404).json({ msg: `Materia no encontrada: ${materiaID}` });
        }

        if (!materiasValidas.includes(materiaID)) {
            materiasValidas.push(materiaID);
            totalCreditos += parseInt(materiaBDD.creditos) || 0;
        }
    }

    try {
        // Actualizar matrícula
        matricula.codigo = codigo ?? matricula.codigo;
        matricula.descripcion = descripcion ?? matricula.descripcion;
        matricula.materia = materiasValidas;
        matricula.creditos = totalCreditos;

        await matricula.save();
        return res.status(200).json({ msg: "Matrícula actualizada correctamente", matricula });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al actualizar la matrícula" });
    }
};

const eliminarMatricula = async (req, res) => {
    const { id } = req.params;

    // Validaciones
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "ID de matrícula no válido" });
    }

    const matricula = await Matriculas.findById(id);
    if (!matricula) {
        return res.status(404).json({ msg: "Matrícula no encontrada" });
    }

    if (matricula.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para eliminar esta matrícula" });
    }

    try {
        await Matriculas.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Matrícula eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al eliminar la matrícula" });
    }
};

export {
    crearMatricula,
    visualizarMatricula,
    editarMatricula,
    eliminarMatricula,
};