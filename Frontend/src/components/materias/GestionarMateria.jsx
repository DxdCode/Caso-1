import React, { useState } from 'react'
import useMateria from '../../hooks/useMateria'
import { ToastContainer } from 'react-toastify'
import FiltroBusqueda from '../FiltrarBusqueda'
import TablaMateria from './TablaMateria'
import ModalGestionar from '../../Dashboard/ModalGestionar'

function GestionarMateria() {
  const { materia, loading, actualizarMateria, eliminarMateria } = useMateria()
  const [busqueda, setBusqueda] = useState()
  const [campoFiltro, setCampoFiltro] = useState("Codigo")
  const [editId, SetEditId] = useState()
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: Number,
    descripcion: "",
    creditos: Number,
  })
const normalizar = (valor) =>
  (valor || "")          
    .toString()         
    .normalize("NFD")   
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase();       

const MateriasFiltradas = materia.filter((mater) =>
  normalizar(mater[campoFiltro]).includes(normalizar(busqueda))
);

  const handleEdit = (materia) => {
    SetEditId(materia._id)
    setFormData({ ...materia })
  }

  const handleUpdata = (e) => {
    e.preventDefault()
    actualizarMateria(editId, formData)
    SetEditId(null)
  }
  const campos = Object.keys(formData)
    .filter((key) => key !== "_id")
    .map((key) => ({
      value: key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    }));
  return (
    <section>
      <ToastContainer></ToastContainer>
      <h2 className="text-3xl font-bold mb-6 text-sec">📝 Gestionar Materias</h2>


      <FiltroBusqueda
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        campoFiltro={campoFiltro}
        setCampoFiltro={setCampoFiltro}
        campos={campos}
      />

      <TablaMateria
        materias={MateriasFiltradas}
        campos={campos}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={eliminarMateria}
      />
      <ModalGestionar
        title="Editar Materia"
        editId={editId}
        setEditId={SetEditId}
        formData={formData}
        handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        handleSubmit={handleUpdata}
      />
    </section>
  )
}

export default GestionarMateria
