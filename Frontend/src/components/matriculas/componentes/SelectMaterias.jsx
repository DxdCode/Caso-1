import React, { useState } from "react";
import { Edit, Trash, X } from "lucide-react";
import { useLocation } from "react-router-dom";

function TablaMatricula({ matriculas = [], loading = false, handleEdit, handleDelete, campos = [] }) {
  const location = useLocation();
  const mostrarBotones = location.pathname === "/dashboard/matriculas/gestionar";

  const [modalAbierto, setModalAbierto] = useState(false);
  const [materiasModal, setMateriasModal] = useState([]);

  const abrirModal = (materias) => {
    setMateriasModal(materias);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setMateriasModal([]);
  };

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        [...Array(5)].map((_, i) => (
          <div
            key={i}
            className="grid sm:grid-cols-[100px_1fr_100px_0.8fr_300px] grid-cols-1 gap-4 bg-white rounded-xl shadow-md px-6 py-4 border border-gray-100 animate-pulse"
          >
            {campos.map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
            {mostrarBotones && <div className="h-4 bg-gray-200 rounded w-full"></div>}
          </div>
        ))
      ) : matriculas.length === 0 ? (
        <p className="text-center text-gray-500 text-sm pt-4">No hay matrículas para mostrar.</p>
      ) : (
        matriculas.map((matricula) => (
          <div
            key={matricula._id}
            className="grid sm:grid-cols-[100px_minmax(150px,1fr)_100px_0.8fr_300px] grid-cols-1 gap-4 bg-card rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 px-6 py-4 border border-gray-100 text-sec text-sm overflow-hidden"
          >
            {campos.map((campo) => (
              <div key={campo.value} className="text-main">
                <span className="sm:hidden block text-xs text-gray-400">{campo.label}: </span>
                <div className="truncate overflow-hidden whitespace-nowrap text-right">
                  {campo.value === "materia" ? (
                    <>
                      <span className="truncate">
                        {matricula.materia.slice(0, 2).map((m) => m.nombre).join(" ")}
                      </span>
                      {matricula.materia.length > 2 && (
                        <button
                          onClick={() => abrirModal(matricula.materia)}
                          className="text-xs text-sec ml-1 cursor-pointer truncate"
                        >
                          +{matricula.materia.length - 2} más
                        </button>
                      )}
                    </>
                  ) : campo.render ? (
                    <span className="truncate">{campo.render(matricula[campo.value])}</span>
                  ) : (
                    <span className="truncate">{matricula[campo.value]}</span>
                  )}
                </div>
              </div>
            ))}

            {mostrarBotones && (
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => handleEdit(matricula)}
                  className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(matricula._id)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash size={16} />
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {/* Modal de materias */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={cerrarModal}
              className="absolute top-4 right-4 p-1 rounded hover:bg-gray-200"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Materias</h3>
            <ul className="list-disc pl-5">
              {materiasModal.map((m) => (
                <li key={m._id} className="mb-2 truncate">{m.nombre}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TablaMatricula;