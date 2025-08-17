import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import ejemploImg from "../../assets/register.png";
import { Link, useNavigate } from 'react-router';
import ButtonRegresar from './ButtonRegresar';
import useFetch from '../../hooks/useFetch';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { fetchDataBackend } = useFetch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const registerUser = async (data) => {
        try {
            setLoading(true)
            const url = `${import.meta.env.VITE_URL_BACKEND}/registro`

            const response = await fetchDataBackend(url, {
                method: 'POST',
                body: data
            })
            if (!response) {
                toast.error(response?.msg || "Error al registrarse")
            }
            navigate("/login")
        } catch (error) {
            toast.error(error.response?.data?.msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="h-screen bg-base flex flex-col md:flex-row">
            <ToastContainer></ToastContainer>
            {/* Imagen lateral */}
            <div className="hidden md:flex w-1/2 bg-[#ba9dfe] relative items-center justify-center">
                {/* Círculos decorativos */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-200 rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300 rounded-full"></div>
                <img src={ejemploImg} alt="Register ilustración" className="relative w-3/4 h-auto z-10" />
            </div>

            {/* Formulario centrado */}
            <div className="flex-1 flex items-center justify-center px-4 bg-[#ba9dfe] relative">
                {/* Bolitas decorativas */}
                <div className="absolute -top-16 -left-10 w-24 h-24 bg-purple-100 rounded-full z-0"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-200 rounded-full z-0"></div>

                <ButtonRegresar></ButtonRegresar>
                <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-6 text-sec">
                        Registrarse
                    </h2>

                    <form onSubmit={handleSubmit(registerUser)} className="flex flex-col gap-4">
                        {/* Nombre */}
                        <label className="flex flex-col text-sec">
                            Nombre
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-70"
                                {...register("nombre", { required: "El nombre es obligatorio" })}
                            />
                            {errors.nombre && (
                                <span className="text-sm text-error rounded mt-1">{errors.email.message}</span>
                            )}
                        </label>

                        {/* Apellido */}
                        <label className="flex flex-col text-sec">
                            Apellido
                            <input
                                type="text"
                                placeholder="Tu apellido"
                                className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-70"
                                {...register("apellido", { required: "El apellido es obligatorio" })}


                            />
                            {errors.apellido && (
                                <span className="text-sm text-error rounded mt-1">{errors.email.message}</span>
                            )}
                        </label>

                        {/* Correo */}
                        <label className="flex flex-col text-sec">
                            Correo
                            <input
                                type="email"
                                placeholder="correo@ejemplo.com"
                                className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-70"
                                {...register("email", { required: "El correo es obligatorio" })}

                            />
                            {errors.email && (
                                <span className="text-sm text-error rounded mt-1">{errors.email.message}</span>
                            )}
                        </label>

                        {/* Contraseña */}
                        <label className="flex flex-col text-sec relative">
                            Contraseña
                            <div className="mt-1 relative flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-70 pr-10"
                                    {...register("password", { required: "La contraseña es obligatorio" })}

                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 cursor-pointer text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>
                            {errors.password && (
                                <span className="text-sm text-error p-1 rounded mt-1">{errors.email.message}</span>
                            )}
                        </label>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="mt-4 cursor-pointer bg-secondary text-terc py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition transform shadow-md w-full"
                        >
                            <UserPlus size={20} />
                            {loading ? "Cargando..." : "Registrarse"}
                        </button>
                    </form>
                    <div className="text-center mt-4 text-sm text-sec">
                        ¿Ya tienes una cuenta?{" "}
                        <Link
                            to="/login"
                            className="text-secondary font-semibold hover:underline"
                        >
                            Inicia Sesión
                        </Link>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default Register;
