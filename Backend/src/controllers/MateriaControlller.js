import mongoose from "mongoose";
import Materias from "../models/Materias.js";

const crearMateria = async (req, res) => {
    // Obtener los datos
    const { codigo, creditos } = req.body

    //Validaciones
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos deben llenar todo los campos" });
    const codigoMateria = await Materias.findOne({ codigo: codigo })
    if (codigoMateria) return res.status(400).json({ msg: `Ya existe ese codigo de la Materia en ${codigoMateria.nombre}` })
    if (codigo <= 0) return res.status(400).json({ msg: "Código y créditos no pueden ser negativos o 0" });
    if (creditos < 0) return res.status(400).json({ msg: "Código y créditos no pueden ser negativos o 0" });


    //Creamos una nueva Materia
    const nuevaMateria = new Materias({
        ...req.body
    })

    //Guardamos
    await nuevaMateria.save()
    res.status(200).json({ msg: "Creado la materia correctamente" })
}

const visualizarMateria = async (req, res) => {
    const materias = await Materias.find().select(" -createdAt -updatedAt -__v")
    res.status(200).json(materias)
}
const editarMateria = async (req, res) => {
    // Obtener los datos
    const { id } = req.params
    const { nombre, codigo, descripcion, creditos } = req.body

    //Validaciones
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: "ID invalido" });
    if (Object.values(req.body).includes("")) return res.status(404).json({ msg: "Lo sentimos deben llenar todo los campos" });
    if (creditos < 0) return res.status(400).json({ msg: "Los créditos deben ser mayores o iguales a 0" });
    if (codigo <= 0) return res.status(400).json({ msg: "Código y créditos no pueden ser negativos o 0" });
    const codigoExistente = await Materias.findOne({ codigo, _id: { $ne: id } });
    if (codigoExistente) return res.status(400).json({ msg: `El codigo ya se encuentra registrado en la materia ${codigoExistente.nombre}` })


    //Actualizamos los datos
    const actualizarMateria = await Materias.findOne({ _id: id })
    if (!actualizarMateria) return res.status(404).json({ msg: "Materia no encontrada" })
    actualizarMateria.nombre = nombre ?? actualizarMateria.nombre
    actualizarMateria.codigo = codigo ?? actualizarMateria.codigo
    actualizarMateria.descripcion = descripcion ?? actualizarMateria.descripcion
    actualizarMateria.creditos = creditos ?? actualizarMateria.creditos

    //Guardamos lso cambios
    await actualizarMateria.save()
    res.status(200).json({ msg: "Actualizad la materia correctamente" })
}
const eliminarMateria = async (req, res) => {
    // Obtener los datos
    const { id } = req.params

    //Validamos
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: "ID invalido" });

    //Eliminamos
    const materiaEliminar = await Materias.findByIdAndDelete(id)
    if (!materiaEliminar) return res.status(404).json({ msg: "Materia no encontrado con ese ID" })
    res.status(200).json({ msg: "Eliminado la materia correctamente" })

}

export {
    crearMateria,
    visualizarMateria,
    editarMateria,
    eliminarMateria
}