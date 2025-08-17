import mongoose from "mongoose";
import Estudiantes from "../models/Estudiantes.js";
import Materias from "../models/Materias.js";
import Matriculas from "../models/Matriculas.js";

const crearMatricula = async (req, res) => {
    const { codigo, descripcion, estudiante, materia } = req.body;

    // Validar ID estudiante
    if (!mongoose.isValidObjectId(estudiante))
        return res.status(400).json({ msg: "ID inválido del estudiante" });

    // Validar array de materias
    if (!Array.isArray(materia) || materia.length === 0)
        return res.status(400).json({ msg: "Debe enviar al menos una materia" });

    // Validar estudiante
    const estudianteBDD = await Estudiantes.findById(estudiante);
    if (!estudianteBDD) return res.status(404).json({ msg: "Estudiante no encontrado" });

    //Validar si ya tiene una matricula el estuidante
    const existe = await Matriculas.findOne({ estudiante });
    if (existe) return res.status(400).json({ msg: "El estudiante ya tiene matrícula creada" });


    // Validar materias y sumar creditos
    let totalCreditos = 0;
    const materiasValidas = [];

    for (const materiaID of materia) {
        if (!mongoose.isValidObjectId(materiaID)) return res.status(400).json({ msg: `ID inválido de materia: ${materiaID}` });

        const materiaBDD = await Materias.findById(materiaID);
        if (!materiaBDD) return res.status(404).json({ msg: `Materia no encontrada: ${materiaID}` });

        // Evitar duplicados
        const existe = await Matriculas.findOne({ estudiante, materia: materiaID });
        if (!existe) {
            materiasValidas.push(materiaID);
            totalCreditos += parseInt(materiaBDD.creditos);
        }
    }

    // Crear matrícula
    const nuevaMatricula = new Matriculas({
        codigo,
        descripcion,
        creditos: totalCreditos,
        estudiante,
        materia: materiasValidas
    });

    await nuevaMatricula.save();
    res.status(201).json({ msg: "Matrícula creada correctamente", matricula: nuevaMatricula });
};


const visualizarMatricula = async (req, res) => {
    const matricula = await Matriculas.find()
        .populate("estudiante", "nombre apellido cedula")
        .populate("materia", "nombre codigo creditos")
        .select("-__v -createdAt -updatedAt");

    res.status(200).json(matricula);
};

const editarMatricula = async (req, res) => {
    const { id } = req.params;
    const { descripcion, materia } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: "ID inválido de matrícula" });

    const matricula = await Matriculas.findById(id);
    if (!matricula) return res.status(404).json({ msg: "Matrícula no encontrada" });

    if (!Array.isArray(materia)) return res.status(400).json({ msg: "Las materias deben enviarse en un array" });

    let totalCreditos = 0;
    const materiasValidas = [];

    for (const materiaID of materia) {
        if (!mongoose.Types.ObjectId.isValid(materiaID))
            return res.status(400).json({ msg: `ID de materia inválido: ${materiaID}` });

        const materiaBDD = await Materias.findById(materiaID);
        if (!materiaBDD)
            return res.status(404).json({ msg: `Materia no encontrada: ${materiaID}` });

        materiasValidas.push(materiaID);
        totalCreditos += parseInt(materiaBDD.creditos);
    }

    matricula.materia = materiasValidas;
    matricula.descripcion = descripcion ?? matricula.descripcion;
    matricula.creditos = totalCreditos;

    await matricula.save();
    res.status(200).json({ msg: "Matrícula actualizada correctamente", matricula });
};

const eliminarMatricula = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: "ID Invalido Matricula" });

    const matricula = await Matriculas.findByIdAndDelete(id);
    if (!matricula) return res.status(404).json({ msg: "Matrícula no encontrada" });

    res.status(200).json({ msg: "Matrícula eliminada correctamente" });
};

export {
    crearMatricula,
    visualizarMatricula,
    editarMatricula,
    eliminarMatricula

}