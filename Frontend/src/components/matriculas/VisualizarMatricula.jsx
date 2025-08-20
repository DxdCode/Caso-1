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
      const campos = Object.keys(matricula[0])
        .filter((key) => key !== "_id")
        .map((key) => ({
          value: key,
          label: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
        }))
      setCamposMatricula(campos)
      setCampoFiltro(campos[0]?.value || "")
    }
  }, [matricula])

  const matriculaFiltrada = loading ? [] : matricula.filter((mat) => {
    const campo = mat[campoFiltro]
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
      <ToastContainer />
      <h2 className='text-3xl font-bold mb-6 text-sec'>Visualizar Matriculas</h2>

      <FiltroBusqueda
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        campoFiltro={campoFiltro}
        campos={camposMatricula}
      />

      {
        camposMatricula.length > 0 && (
          <div className='hidden sm:grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] px-6 py-3 text-sec font-semibold text-sm'>
            {camposMatricula.map((campo) => (
              <div key={campo.value}>
                {campo.label}
              </div>
            ))}
          </div>
        )
      }

      {
        <TablaMatricula
          matriculas={matriculaFiltrada}
          campos={camposMatricula}
          loading={loading}
        />
      }
    </section>

  )
}

export default VisualizarMatricula