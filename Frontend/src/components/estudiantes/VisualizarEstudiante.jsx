import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useEstudiantes from "../../hooks/useEstudiante";
import FiltroBusqueda from "../FiltrarBusqueda";
import TablaEstudiantes from "./TablaEstudiante";

function VisualizarEstudiante() {
  {/* Obtener estudiantes del hook */ }
  const { estudiantes, loading } = useEstudiantes();

  {/* Estado para el texto de búsqueda */ }
  const [busqueda, setBusqueda] = useState("");

  {/* Estado como se va filtras y campos  */ }
  const [campoFiltro, setCampoFiltro] = useState("");
  const [camposEstudiante, setCamposEstudiante] = useState([]);

  {/* Generamos los campos */ }
  useEffect(() => {
    if (estudiantes.length > 0) {
      const campos = Object.keys(estudiantes[0])
        .filter((key) => key !== "_id")
        .map((key) => ({
          value: key,
          label: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
        }));
      setCamposEstudiante(campos);
      setCampoFiltro(campos[0]?.value || "");
    }
  }, [estudiantes]);

  {/* Función para normalizar texto y quitar acentos */ }
  const normalizar = (texto = "") =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  {/* Filtrar estudiantes segun búsqueda y campo seleccionado */ }
  const estudiantesFiltrados = loading
    ? []
    : estudiantes.filter((est) =>
      campoFiltro
        ? normalizar(est[campoFiltro] || "").includes(normalizar(busqueda))
        : true
    );

  return (
    <section className="px-2">
      <ToastContainer />

      {/* Titulo */}
      <h2 className="text-3xl font-bold mb-6 text-sec">📋 Visualizar Estudiantes</h2>

      {/* Componente de filtrado */}
      {camposEstudiante.length > 0 && (
        <FiltroBusqueda
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          campoFiltro={campoFiltro}
          setCampoFiltro={setCampoFiltro}
          campos={camposEstudiante}
        />
      )}

      {/* Cabecera de tabla visible en pantallas sm+ */}
      {camposEstudiante.length > 0 && (
        <div className="hidden sm:grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] px-6 py-3 text-sec font-semibold text-sm">
          {camposEstudiante.map((campo) => (
            <div key={campo.value} className="truncate">
              {campo.label}
            </div>
          ))}
        </div>
      )}

      {/* Tabla de estudiantes con skeleton loader */}
      <TablaEstudiantes
        estudiantes={estudiantesFiltrados}
        campos={camposEstudiante}
        loading={loading}
      />
    </section>
  );
}

export default VisualizarEstudiante;
