import { useNavigate } from "react-router";
import useMatricula from "../../hooks/useMatricula";
import { useForm } from "react-hook-form";
import { Plus, X } from "lucide-react";
import useMateria from "../../hooks/useMateria";
import useEstudiantes from "../../hooks/useEstudiante";
import { useState } from "react";

function CrearMatricula() {
  const { crearMatricula, loading } = useMatricula();
  const { materia } = useMateria();
  const { estudiantes } = useEstudiantes();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMaterias, setIsOpenMaterias] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleClick = (id) => {
    setSelectedId(id);
    console.log("click en ", id);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <section>
      <h2 className="text-3xl font-bold mb-2 text-sec">Crear Matricula</h2>

      <form className="flex flex-col gap-6">
        <label className="flex flex-col text-sec">
          Codigo
          <input
            type="number"
            placeholder="Ingresa el codigo"
            className="mt-2 p-2 rounded-sm bg-card text-main focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            {...register("codigo", { required: "El codigo es obligatorio" })}
          />
          {errors.codigo && (<span className="text-sm text-error rounded">{errors.email.message}</span>
          )}
        </label>
        <label className="flex flex-col text-sec">
          Descripcion
          <input
            type="text"
            placeholder="Ingresa el codigo"
            className="mt-2 p-2 rounded-sm bg-card text-main focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            {...register("descripcion", { required: "La descripcion es obligatorio", })}
          />
          {errors.descripcion && (<span className="text-sm text-error rounded">{errors.email.message}</span>
          )}
        </label>
        
        {/* Modales */}
        <div className="flex gap-2">
          {/* Estudiantes */}
          <div>
            <p className="text-sec pb-2">Estudiantes</p>
            <button
              type="button"
              className="cursor-pointer bg-blue-500 px-4 py-2 flex items-center gap-2 text-white rounded-xs hover:bg-blue-600 transition-colors duration-200"
              onClick={handleButtonClick}
            >
              <Plus size={20} />
              Agregar
            </button>

            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-60 transition-opacity duration-300">
                <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full transform transition-all duration-300 scale-100 animate-fadeIn">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={closeModal}
                  >
                    <X size={24} />
                  </button>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Lista de Estudiantes
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                    {estudiantes.map((est) => (
                      <div
                        key={est._id}
                        className={`bg-card p-4 rounded-xl shadow-lg flex flex-col gap-4 cursor-pointer
                ${selectedId === est._id
                            ? "border-2 border-blue-500"
                            : "border border-transparent"
                          }`}
                        onClick={() => handleClick(est._id)}
                      >
                        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm text-main">Nombres</h3>
                            <p className="text-sec truncate">
                              {est.nombre} {est.apellido}
                            </p>
                          </div>
                          <div className="flex-1 truncate">
                            <h3 className="font-semibold text-sm text-main">Correo</h3>
                            <p className="text-sec truncate">{est.email}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center gap-2 truncate">
                          <div className="flex-1 truncate">
                            <h3 className="font-semibold text-sm text-main">Cédula</h3>
                            <p className="text-sec truncate">{est.cedula}</p>
                          </div>
                          <div className="flex-1 truncate">
                            <h3 className="font-semibold text-sm text-main">Teléfono</h3>
                            <p className="text-sec truncate">{est.telefono}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Materias */}

          <div>
            <p className="text-sec pb-2">Materias</p>
            <button
              type="button"
              className="cursor-pointer bg-blue-500 px-4 py-2 flex items-center gap-2 text-white rounded-xs hover:bg-blue-600 transition-colors duration-200"
              onClick={() => setIsOpenMaterias(true)} 
            >
              <Plus size={20} />
              Agregar
            </button>

            {isOpenMaterias && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-60 z-50">
                <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={() => setIsOpenMaterias(false)}
                  >
                    <X size={24} />
                  </button>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Materias</h2>

                  <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
                    {materia.map((mat) => (
                      <div
                        key={mat._id}
                        className="bg-card p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col gap-2 border border-transparent hover:border-blue-500"
                      >
                        <div>
                          <h3 className="font-semibold text-sm text-main truncate">Nombre</h3>
                          <p className="text-sec truncate">{mat.nombre}</p>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-sm text-main truncate">Código</h3>
                            <p className="text-sec truncate">{mat.codigo}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm text-main truncate">Créditos</h3>
                            <p className="text-sec truncate">{mat.creditos}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


        <button
          type="submit"
          className="mt-4 py-3 rounded-xl flex items-center justify-center gap-2 bg-secondary text-terc font-semibold hover:bg-primary hover:text-card transition transform hover:scale-105 shadow-md"
        >
          <Plus size={20} />
          {loading ? "Agregando..." : "Agregar"}
        </button>
        {console.log( "click en esta guard",selectedId)}
      </form>
    </section>
  );
}

export default CrearMatricula;
