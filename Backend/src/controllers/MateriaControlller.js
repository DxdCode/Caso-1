import mongoose from "mongoose";
import Materias from "../models/Materias.js";
import Matriculas from "../models/Matriculas.js";

const crearMateria = async (req, res) => {
    // Obtener los datos
    const { nombre, codigo, descripcion, creditos } = req.body;

    // Validaciones
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos deben llenar todo los campos" });

    const codigoNum = Number(codigo);
    const creditosNum = Number(creditos);

    if (isNaN(codigoNum) || isNaN(creditosNum)) {
        return res.status(400).json({ msg: "El código y los créditos deben ser números válidos" });
    }

    if (codigoNum <= 0) {
        return res.status(400).json({ msg: "El código debe ser mayor a 0" });
    }

    if (creditosNum < 0) {
        return res.status(400).json({ msg: "Los créditos deben ser mayores o iguales a 0" });
    }

    const codigoExistente = await Materias.findOne({ codigo: codigoNum });
    if (codigoExistente) {
        return res.status(400).json({ msg: `El código ya está registrado en la materia ${codigoExistente.nombre}` });
    }

    try {
        // Crear nueva materia
        const nuevaMateria = new Materias({
            nombre,
            codigo: codigoNum,
            descripcion,
            creditos: creditosNum,
            usuario: req.usuarioBDD,
        });

        await nuevaMateria.save();
        return res.status(201).json({ msg: "Materia creada correctamente", materia: nuevaMateria });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al crear la materia" });
    }
};

const visualizarMateria = async (req, res) => {
    try {
        const materias = await Materias.find({ usuario: req.usuarioBDD }).select("-createdAt -updatedAt -__v -usuario");
        res.status(200).json(materias);
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al obtener las materias" });
    }

}
const editarMateria = async (req, res) => {
    const { id } = req.params;
    const { nombre, codigo, descripcion, creditos } = req.body;

    // Validaciones
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "ID de materia no válido" });
    }

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos deben llenar todo los campos" });


    const codigoNum = Number(codigo);
    const creditosNum = Number(creditos);

    if (isNaN(codigoNum) || isNaN(creditosNum)) {
        return res.status(400).json({ msg: "El código y los créditos deben ser números válidos" });
    }

    if (codigoNum <= 0) {
        return res.status(400).json({ msg: "El código debe ser mayor a 0" });
    }

    if (creditosNum < 0) {
        return res.status(400).json({ msg: "Los créditos deben ser mayores o iguales a 0" });
    }

    const materia = await Materias.findById(id);
    if (!materia) {
        return res.status(404).json({ msg: "Materia no encontrada" });
    }

    if (materia.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para editar esta materia" });
    }

    const codigoExistente = await Materias.findOne({ codigo: codigoNum, _id: { $ne: id } });
    if (codigoExistente) {
        return res.status(400).json({ msg: `El código ya está registrado en la materia ${codigoExistente.nombre}` });
    }

    try {
        // Actualizar materia
        materia.nombre = nombre;
        materia.codigo = codigoNum;
        materia.descripcion = descripcion;
        materia.creditos = creditosNum;

        await materia.save();
        return res.status(200).json({ msg: "Materia actualizada correctamente", materia });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al actualizar la materia" });
    }
};
const eliminarMateria = async (req, res) => {
    const { id } = req.params;

    // Validaciones
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "ID de materia no válido" });
    }

    const materia = await Materias.findById(id);
    if (!materia) {
        return res.status(404).json({ msg: "Materia no encontrada" });
    }

    if (materia.usuario.toString() !== req.usuarioBDD.toString()) {
        return res.status(403).json({ msg: "No tienes permiso para eliminar esta materia" });
    }


    try {
        // Eliminar materia
        await Materias.findByIdAndDelete(id);
        // Actualizar matrículas que incluyan esta materia
        await Matriculas.updateMany({ materias: id }, { $pull: { materias: id } });
        const matriculas = await Matriculas.find({ materias: { $exists: true } });
        await Promise.all(
            matriculas.map(async (m) => {
                const materias = await Materias.find({ _id: { $in: m.materia } });
                m.creditos = materias.reduce((sum, mat) => sum + mat.creditos, 0);
                await m.save();
            })
        );

        res.status(200).json({ msg: "Materia eliminada y matrículas actualizadas correctamente" });

    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor al eliminar la materia" });
    }
};
export {
    crearMateria,
    visualizarMateria,
    editarMateria,
    eliminarMateria
}