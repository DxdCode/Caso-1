import { useEffect, useState } from 'react'
import useMateria from '../../hooks/useMateria'
import FiltroBusqueda from '../FiltrarBusqueda'
import TablaMateria from './TablaMateria'
import { ToastContainer } from 'react-toastify'

function VisualizarMateria() {
  const { materia = [], loading } = useMateria()
  const [busqueda, setBusqueda] = useState("")
  const [campoFiltro, setCampoFiltro] = useState("")
  const [camposMateria, setCamposMateria] = useState([])

  useEffect(() => {
    if (materia.length > 0) {
      const campos = Object.keys(materia[0])
        .filter((key) => key !== "_id")
        .map((key) => ({
          value: key,
          label: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
        }))
      setCamposMateria(campos)
      setCampoFiltro(campos[0]?.value || "")
    }
  }, [materia])

  const materiaFiltradas = loading
    ? []
    : materia.filter((est) => {
      const campo = est[campoFiltro]

      if (!busqueda) return true

      if (typeof campo === "string") {
        return campo
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            busqueda
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          )
      } else if (typeof campo === "number") {
        return String(campo).includes(busqueda)
      }

      return false
    })

  return (
    <section className='px-2'>

      {/* Titulo */}
      <ToastContainer />
      <h2 className='text-3xl font-bold mb-6 text-sec'>Visualizar Materias</h2>

      {/* Componente de filtrado */}
      {camposMateria.length > 0 && (
        <FiltroBusqueda
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          campoFiltro={campoFiltro}
          setCampoFiltro={setCampoFiltro}
          campos={camposMateria}
        />
      )}

      {/* Cabecera de tabla visible */}

      {camposMateria.length > 0 && (
        <div className="hidden sm:grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] px-6 py-3 text-sec font-semibold text-sm">
          {camposMateria.map((campo) => (
            <div key={campo.value} className='truncate'>
              {campo.label}
            </div>
          ))}
        </div>
      )}

      {/* Tabla de estudiantes con skeleton loader */}
      <TablaMateria
        materias={materiaFiltradas}
        campos={camposMateria}
        loading={loading}
      />
    </section>
  )
}

export default VisualizarMateria
