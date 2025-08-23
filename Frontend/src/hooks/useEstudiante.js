import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useEstudiantes() {
  const { fetchDataBackend } = useFetch();
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("auth-token"))?.state?.token || "";
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  // Obtener estudiantes
  const cargarEstudiantes = async () => {
    setLoading(true);
    try {
      const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/estudiante`, {
        method: "GET",
        config: { headers },
      });
      setEstudiantes(response);
    } catch (error) {
      toast.error(error.response?.data?.msg || error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Crear estudiante
  const crearEstudiante = async (data, callback) => {
    setLoading(true);
    try {
      await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/estudiante`, {
        method: "POST",
        body: data,
        config: { headers },
      });

      cargarEstudiantes();

      if (callback) callback();

    } catch (error) {
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar estudiante
  const eliminarEstudiante = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este estudiante?")) return;
    try {
      const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/estudiante/${id}`, {
        method: "DELETE",
        config: { headers },
      });
      cargarEstudiantes();
      toast.success(response.data?.msg || response.data);
    } catch (error) {
      toast.error(error.response?.data?.msg || error.response?.data);
    }
  };

  // Actualizar estudiante
  const actualizarEstudiante = async (id, data) => {
    try {
      const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/estudiante/${id}`, {
        method: "PUT",
        body: data,
        config: { headers },
      });
      cargarEstudiantes();
      toast.success(response.data?.msg || response.data);
    } catch (error) {
      toast.error(error.response?.data?.msg || error.response?.data );
    }
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  return { estudiantes, loading, cargarEstudiantes, crearEstudiante, eliminarEstudiante, actualizarEstudiante };
}
