import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

function VisualizarEstudiante() {
    const { fetchDataBackend } = useFetch();
    const [loading, setLoading] = useState(false);
    const [estudiantes, setEstudiante] = useState([]);

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
                console.log(response);
                setEstudiante(response);
            } catch (error) {
                toast.error(error.response?.data?.msg || "Error en la conexión");
            } finally {
                setLoading(false);
            }
        };
        verEstudiantes();
    }, []);
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6  text-sec px-2">
                Visualización de los estudiantes
            </h2>
            {loading ? (
                <p className='className="text-center text-gray-500 '>
                    Cargando los estudiantes
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    {/* Encabezado */}
                    <div className="hidden sm:flex flex-row bg-card rounded-lg p-4 text-primary font-semibold text-sm">
                        <div className="flex-1 min-w-[120px]">Nombres</div>
                        <div className="flex-1 min-w-[100px]">Cédula</div>
                        <div className="flex-1 min-w-[150px]">Correo</div>
                        <div className="flex-1 min-w-[100px]">Teléfono</div>
                        <div className="flex-1 min-w-[100px]">Ciudad</div>
                        <div className="flex-1 min-w-[120px]">Dirección</div>
                        <div className="flex-1 min-w-[140px]">Fecha Nacimiento</div>
                    </div>

                    {/* Listar estudiantes */}
                    {estudiantes.length === 0 ? (
                        <p className="text-center text-gray-500">No hay estudiantes para mostrar</p>
                    ) : (
                        estudiantes.map(est => (
                            <div
                                key={est._id}
                                className="flex flex-col sm:flex-row bg-white shadow-sm rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="flex-1 min-w-[120px]">
                                    <span className="sm:hidden font-semibold text-primary">Nombre: </span>
                                    {est.nombre} {est.apellido}
                                </div>
                                <div className="flex-1 min-w-[100px]">
                                    <span className="sm:hidden font-semibold text-primary">Cédula: </span>
                                    {est.cedula}
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <span className="sm:hidden font-semibold text-primary">Correo: </span>
                                    {est.email}
                                </div>
                                <div className="flex-1 min-w-[100px]">
                                    <span className="sm:hidden font-semibold text-primary">Teléfono: </span>
                                    {est.telefono}
                                </div>
                                <div className="flex-1 min-w-[100px]">
                                    <span className="sm:hidden font-semibold text-primary">Ciudad: </span>
                                    {est.ciudad}
                                </div>
                                <div className="flex-1 min-w-[120px]">
                                    <span className="sm:hidden font-semibold text-primary">Dirección: </span>
                                    {est.direccion}
                                </div>
                                <div className="flex-1 min-w-[140px]">
                                    <span className="sm:hidden font-semibold text-primary">Fecha Nacimiento: </span>
                                    {new Date(est.fecha_nacimiento).toLocaleDateString('es-EC', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
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
