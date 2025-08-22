// VisualizarMatricula.jsx
import React, { useEffect, useState } from 'react'
import useMatricula from '../../hooks/useMatricula'
import TablaMatricula from './TablaMatricula'
import { ToastContainer } from 'react-toastify'
import FiltroBusqueda from '../FiltrarBusqueda'

function VisualizarMatricula() {
  const { matricula, loading } = useMatricula()
  const [campoFiltro, setCampoFiltro] = useState("")
  const [busqueda, setBusqueda] = useState("")
  const [camposMatricula, setCamposMatricula] = useState([])

  useEffect(() => {
    if (matricula.length > 0) {
      const campos = [
        { value: "codigo", label: "Código" },
        { value: "descripcion", label: "Descripción" },
        { value: "creditos", label: "Créditos" },
        {
          value: "estudiante",
          label: "Estudiante",
          render: (est) => `${est.nombre} ${est.apellido} - CI: ${est.cedula}`
        },
        {
          value: "materia",
          label: "Materias",
          render: (materias) =>
            materias.slice(0, 1).map((m) => m.nombre).join(" ") +
            (materias.length > 1 ? ` +${materias.length - 2} más` : "")
        }
      ]
      setCamposMatricula(campos)
      setCampoFiltro(campos[0]?.value || "")
    }
  }, [matricula])

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
    <section className='px-2'>
      <ToastContainer />
      <h2 className='text-3xl font-bold mb-6 text-sec'>Visualizar Matriculas</h2>

      <FiltroBusqueda
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        campoFiltro={campoFiltro}
        setCampoFiltro={setCampoFiltro} 
        campos={camposMatricula}
      />

      {camposMatricula.length > 0 && (
        <div className="hidden sm:grid sm:grid-cols-[100px_1fr_100px_0.8fr_300px] px-6 py-3 text-sec text-sm gap-4">
          {camposMatricula.map((campo) => (
            <div key={campo.value} className="text-center">{campo.label}</div>
          ))}
        </div>
      )}

      <TablaMatricula
        matriculas={matriculaFiltrada}
        campos={camposMatricula}
        loading={loading}
      />
    </section>
  )
}

export default VisualizarMatricula
