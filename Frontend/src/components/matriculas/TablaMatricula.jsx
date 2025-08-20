import { useLocation } from "react-router-dom";

function TablaMatricula({ matriculas = [], loading = false, handleEdit, handleDelete }) {
  const location = useLocation();
  const mostrarBotones = location.pathname === "/dashboard/matriculas/gestionar";

  return (
    <section >
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-3 text-sec font-medium">Cargando...</span>
        </div>
      ) : matriculas.length === 0 ? (
        <p className="text-center text-sec italic">No hay matrículas para mostrar.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matriculas.map((matricula) => (
            <article
              key={matricula._id}
              className="p-5 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Título */}
              <h2 className="text-xl font-semibold text-main mb-2 truncate">
                {matricula.descripcion}
              </h2>

              {/* Datos principales */}
              <p className="text-sec"><strong>Cédula:</strong> {matricula.estudiante.cedula}</p>
              <p className="text-sec"><strong>Código de Matrícula:</strong> {matricula.codigo}</p>
              <p className="text-sec"><strong>Total Créditos:</strong> {matricula.creditos}</p>

              {/* Cursos */}
              <h3 className="text-lg font-medium mt-4 mb-2 text-main">Cursos Matriculados:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sec">
                {matricula.materia.map((curso) => (
                  <li key={curso._id}>
                    {curso.nombre} - Código: {curso.codigo}, Créditos: {curso.creditos}
                  </li>
                ))}
              </ul>

              {/* Botones */}
              {mostrarBotones && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(matricula)}
                    className="flex-1 px-4 py-2 rounded-lg bg-primary text-card hover:opacity-90 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(matricula._id)}
                    className="flex-1 px-4 py-2 rounded-lg bg-secondary text-card hover:opacity-90 transition"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default TablaMatricula;
