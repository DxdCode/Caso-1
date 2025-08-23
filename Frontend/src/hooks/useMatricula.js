import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useMatricula() {

    const [loading, setLoading] = useState(false)
    const [matricula, setMatricula] = useState([])
    const { fetchDataBackend } = useFetch();


    const token = JSON.parse(localStorage.getItem("auth-token"))?.state?.token || "";
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    // Obtener Matricula
    const cargarMatricula = async () => {
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/matricula`
            const response = await fetchDataBackend(url, {
                method: "GET",
                config: { headers }
            })
            setMatricula(response)
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data)
        } finally {
            setLoading(false)
        }
    }
    // Crear Matricula
    const crearMatricula = async (data, callback) => {
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/matricula`
            await fetchDataBackend(url, {
                method: "POST",
                body: data,
                config: { headers }
            })
            cargarMatricula()

            if (callback) callback();

        } catch (error) {
            toast.error(error?.response?.data?.msg );
        } finally {
            setLoading(false);
        }
    };

    // Eliminar Matricula
    const eliminarMatricula = async (id) => {
        if (!confirm("¿Estás seguro de eliminar esta matricula?")) return;
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/matricula/${id}`, {
                method: "DELETE",
                config: { headers },
            });
            cargarMatricula();
            toast.success(response.data?.msg || response.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        }

    }
    // Actualizar Matricula
    const actualizarMatricula = async (id, data) => {
        try {
            const response = await fetchDataBackend(`${import.meta.env.VITE_URL_BACKEND}/matricula/${id}`, {
                method: "PUT",
                body: data,
                config: { headers },
            });
            cargarMatricula();
            toast.success(response.data?.msg || response.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data);
        }
    }
    useEffect(() => {
        cargarMatricula();
    }, []);

    return { matricula, loading, cargarMatricula, crearMatricula, eliminarMatricula, actualizarMatricula }
}
