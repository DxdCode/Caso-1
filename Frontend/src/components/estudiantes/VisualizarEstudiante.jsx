import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { Search, Filter } from "lucide-react";

function VisualizarEstudiante() {
    const { fetchDataBackend } = useFetch();
    const [loading, setLoading] = useState(false);
    const [estudiantes, setEstudiante] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [campoFiltro, setCampoFiltro] = useState("nombre");

    useFetch(() => {
        setLoading(true);
        const verEstudiantes = async () => {
            try {
                const url = `${import.meta.env.VITE_URL_BACKEND}/estudiante`;
                const storedUser = JSON.parse(localStorage.getItem("auth-token"));
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser?.state?.token || ""}`,
                };
                const response = await fetchDataBackend(url, {
                    method: "GET",
                    config: { headers },
                });
                setEstudiante(response);
            } catch (error) {
                toast.error(error.response?.data?.msg || "Error en la conexión");
            } finally {
                setLoading(false);
            }
        };
        verEstudiantes();
    }, []);

    // Función para quitar tildes
    const normalizar = (texto = "") =>
        texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    //Filtrado 
    const estudiantesFiltrados = estudiantes.filter((est) => {
        const textoBusqueda = normalizar(busqueda);

        const valorCampo = normalizar(est[campoFiltro] || "");
        return valorCampo.includes(textoBusqueda);
    });

    return (
        <section className="px-2">
            <h2 className="text-2xl font-bold mb-6 text-sec">📋 Visualizar Estudiantes</h2>

            {/*  Barra de búsqueda  */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                {/* Input búsqueda */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={`Buscar por ${campoFiltro}...`}
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full pl-10 p-2 border rounded-lg shadow-sm text-sec focus:outline-none focus:ring-2"
                    />
                </div>

                {/* Selector */}
                <div className="relative w-full sm:w-60">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                        value={campoFiltro}
                        onChange={(e) => setCampoFiltro(e.target.value)}
                        className="w-full pl-10 p-2 border rounded-lg shadow-sm text-sec focus:outline-none focus:ring-2"
                    >
                        <option value="nombre">Nombre</option>
                        <option value="apellido">Apellido</option>
                        <option value="cedula">Cédula</option>
                        <option value="email">Correo</option>
                        <option value="telefono">Teléfono</option>
                        <option value="ciudad">Ciudad</option>
                        <option value="direccion">Dirección</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col gap-4">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="grid sm:grid-cols-7 grid-cols-1 gap-2 bg-white rounded-xl shadow-md px-6 py-4 border border-gray-100 animate-pulse"
                        >
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {/* Encabezado  */}
                    <div className="hidden sm:grid grid-cols-7 px-6 py-3 text-primary font-semibold text-sm">
                        <div>Nombres</div>
                        <div>Cédula</div>
                        <div>Correo</div>
                        <div>Teléfono</div>
                        <div>Ciudad</div>
                        <div>Dirección</div>
                        <div>Fecha Nacimiento</div>
                    </div>

                    {/* Tabla de Estudiantes */}
                    {estudiantesFiltrados.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No hay estudiantes que coincidan con la búsqueda
                        </p>
                    ) : (
                        estudiantesFiltrados.map((est) => (
                            <div
                                key={est._id}
                                className="grid sm:grid-cols-7 grid-cols-1 gap-2 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 px-6 py-4 border border-gray-100"
                            >
                                <div className="text-main">
                                    <span className="sm:hidden block text-xs text-gray-400">Nombre</span>
                                    <p className=" text-gray-800">
                                        {est.nombre} {est.apellido}
                                    </p>
                                </div>
                                <div className="text-main">
                                    <span className="sm:hidden block text-xs text-gray-400">Cédula</span>
                                    <p className="text-gray-700">{est.cedula}</p>
                                </div>
                                <div className="text-main">
                                    <span className="sm:hidden block text-xs text-gray-400">Correo</span>
                                    <p className="text-gray-700 truncate">{est.email}</p>
                                </div>
                                <div className="text-main">
                                    <span className="sm:hidden block text-xs text-gray-400">Teléfono</span>
                                    <p className="text-gray-700">{est.telefono}</p>
                                </div>
                                <div className="text-main">
                                    <span className="sm:hidden block text-xs text-gray-400">Ciudad</span>
                                    <p className="text-gray-700">{est.ciudad}</p>
                                </div>
                                <div className="text-main">
                                    <span className="sm:hidden block text-xs text-gray-400">Dirección</span>
                                    <p className="text-gray-700">{est.direccion}</p>
                                </div>
                                <div className="text-main">
                                    <span className="sm:hidden block text-xs text-gray-400">Nacimiento</span>
                                    <p className="text-gray-700">
                                        {new Date(est.fecha_nacimiento).toLocaleDateString("es-EC", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </section>
    );
}

export default VisualizarEstudiante;
