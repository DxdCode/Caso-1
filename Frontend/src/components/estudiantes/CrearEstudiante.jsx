import { toast, ToastContainer } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

function CrearEstudiante() {
  {/* Hook del backend */}
  const { fetchDataBackend } = useFetch();
  const [loading, setLoading] = useState(false);
  {/* Hook para navegar */}
  const navigate = useNavigate();
  {/* Hook de formularios */}
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  {/* Función para enviar el formulario */}
  const crearEstudiante = async (data) => {
    setLoading(true);

    try {
      {/* Backend la peticion */}
      const response = await fetchDataBackend(
        `${import.meta.env.VITE_URL_BACKEND}/estudiante`,
        {
          method: "POST",
          body: data,
          config: {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth-token"))?.state?.token || ""}`,
            },
          },
        }
      );

      toast.success(response?.data?.msg || response?.msg || "Estudiante creado");

      {/* Limpiamos el formulario */}
      reset();

      {/* Redirigir a la lista de estudiantes después de 3 segundos */}
      setTimeout(() => {
        navigate("/dashboard/estudiantes");
      }, 3000);

    } catch (error) {
      toast.error(error?.response?.data?.msg || "Error al registrar estudiante");
    } finally {
      setLoading(false);
    }
  };

  {/* Campos del formulario */}
  const fields = [
    { label: "Nombre", name: "nombre", type: "text", placeholder: "Ingresa un nombre" },
    { label: "Apellido", name: "apellido", type: "text", placeholder: "Ingresa un apellido" },
    { label: "Cédula", name: "cedula", type: "text", placeholder: "Ingresa una cédula" },
    { label: "Fecha de nacimiento", name: "fecha_nacimiento", type: "date", placeholder: "" },
    { label: "Ciudad", name: "ciudad", type: "text", placeholder: "Ingresa una ciudad" },
    { label: "Dirección", name: "direccion", type: "text", placeholder: "Ingresa una dirección" },
    { label: "Teléfono", name: "telefono", type: "text", placeholder: "Ingresa un teléfono" },
    { label: "Email", name: "email", type: "email", placeholder: "Ingresa un correo electrónico" },
  ];

  return (
    <section className="px-2">
      <ToastContainer />

      {/* Formulario  */}
      <h2 className="text-3xl font-bold mb-6 text-sec">✍️ Crear Estudiante</h2>

      {/* Formulario  */}
      <form onSubmit={handleSubmit(crearEstudiante)} className="flex flex-col gap-6">
        {/* Renderizamos los campos */}
        {fields.map((field) => (
          <label key={field.name} className="flex flex-col text-sec">
            {field.label}

            {/* Input del campo del formulario */}
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="mt-2 p-2 rounded-sm bg-card text-main focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              {...register(field.name, { required: `Debe ingresar ${field.label.toLowerCase()}` })}
            />

            {/* Mensaje de error del hook form */}
            {errors[field.name] && (
              <span className="text-sm text-error mt-1">{errors[field.name].message}</span>
            )}
          </label>
        ))}

        {/* Botón de enviar */}
        <button
          type="submit"
          className="mt-4 py-3 rounded-xl flex items-center justify-center gap-2 bg-secondary text-terc font-semibold hover:bg-primary hover:text-card transition transform hover:scale-105 shadow-md"
        >
          <Plus size={20} />

          {/* Texto del botón segun el estado de carga */}
          {loading ? "Agregando Estudiante..." : "Agregar Estudiante"}
        </button>
      </form>
    </section>
  );
}

export default CrearEstudiante;
