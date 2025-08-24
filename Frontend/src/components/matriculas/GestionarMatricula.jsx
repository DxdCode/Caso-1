import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useMatricula from "../../hooks/useMatricula";
import useMateria from "../../hooks/useMateria";
import FiltroBusqueda from "../../Dashboard/FiltrarBusqueda"
import TablaMatricula from "./TablaMatricula";
import ModalGestionarMatricula from "./componentes/ModalGestionarMatricula";

function GestionarMatricula() {
  const { matricula, loading, actualizarMatricula, eliminarMatricula } = useMatricula();
  const { materia } = useMateria();

  const [busqueda, setBusqueda] = useState("");
  const [campoFiltro, setCampoFiltro] = useState("codigo");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    descripcion: "",
    materia: [],
  });

  useEffect(() => {
    if (editId) {
      const mat = matricula.find((m) => m._id === editId);
      if (mat) {
        setFormData({
          codigo: mat.codigo || "",
          descripcion: mat.descripcion || "",
          materia: mat.materia.map((m) => m._id) || [],
        });
      }
    }
  }, [editId, matricula]);

  const handleEdit = (mat) => setEditId(mat._id);

  const handleUpdate = (e) => {
    e.preventDefault();
    actualizarMatricula(editId, formData);
    setEditId(null);
  };

  const campos = [
    { value: "codigo", label: "Código" },
    { value: "descripcion", label: "Descripción" },
    { value: "creditos", label: "Créditos" },
    { value: "materia", label: "Materias" },
    { value: "estudiante", label: "Estudiante", render: (est) => `${est?.nombre} ${est?.apellido}` },
  ];


  const matriculaFiltrada = loading ? [] : matricula.filter((mat) => {
    if (!busqueda) return true;

    const campo = mat[campoFiltro];

    if (typeof campo === "string" || typeof campo === "number") {
      return String(campo)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(busqueda
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase());
    }

    // Para materias
    if (Array.isArray(campo)) {
      const texto = campo.map(m => m.nombre).join(" ");
      return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(busqueda
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase());
    }

    // Estudiantes
    if (typeof campo === "object" && campo !== null) {
      const texto = `${campo.nombre || ""} ${campo.apellido || ""} ${campo.cedula || ""}`;
      return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(busqueda
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase());
    }

    return false;
  });

  return (
    <section className="px-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-sec">📝 Gestionar Matrículas</h2>

      <FiltroBusqueda
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        campoFiltro={campoFiltro}
        setCampoFiltro={setCampoFiltro}
        campos={campos}
      />
      <div className="hidden sm:grid sm:grid-cols-[100px_1fr_100px_0.8fr_300px] px-6 py-3 text-sec text-sm gap-4">
        {campos.map((valor) => (
          <div className="text-center">{valor.label}</div>
        ))}
      </div>
      <TablaMatricula
        matriculas={matriculaFiltrada}
        campos={campos}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={eliminarMatricula}
      />

      <ModalGestionarMatricula
        editId={editId}
        setEditId={setEditId}
        formData={formData}
        setFormData={setFormData}
        materiasDisponibles={materia}
        handleSubmit={handleUpdate}
      />
    </section>
  );
}

export default GestionarMatricula;
