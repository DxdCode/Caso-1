import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useMateria() {

    const [loading, setLoading] = useState(false)
    const [materia, setMateria] = useState([])
    const { fetchDataBackend } = useFetch();


    const token = JSON.parse(localStorage.getItem("auth-token"))?.state?.token || "";
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    // Obtener materia
    const cargarMaterias = async () => {
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/materia`
            const response = await fetchDataBackend(url, {
                method: "GET",
                config: { headers }
            })
            setMateria(response)
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data)
        } finally {
            setLoading(false)
        }
    }
    // Crear materia
    const crearMateria = async (data, callback) => {
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/materia`
            const response = await fetchDataBackend(url, {
                method: "POST",
                body: data,
                config: { headers }
            })
            toast.success(response?.data?.msg || response?.msg);
            cargarMaterias()

            if (callback) callback();

        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar materia
    const eliminarMateria = async (id) => {
        if (!confirm("¿Estás seguro de eliminar este estudiante?")) return;
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/materia/${id}`, {
                method: "DELETE",
                config: { headers },
            });
            cargarMaterias();
            toast.success(response.data?.msg || response.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        }

    }
    // Actualizar materia

    const actualizarMateria = async (id, data) => {
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/materia/${id}`, {
                method: "PUT",
                body: data,
                config: { headers },
            });
            cargarMaterias();
            toast.success(response.data?.msg || response.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        }
    }
    useEffect(() => {
        cargarMaterias();
    }, []);

    return { materia, loading, cargarMaterias, crearMateria, eliminarMateria, actualizarMateria }
}
