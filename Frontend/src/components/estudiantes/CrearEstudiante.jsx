import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useEstudiantes from "../../hooks/useEstudiante";
import FormularioRegistro from "../../Dashboard/FormularioRegistro";

function CrearEstudiante() {
  const { crearEstudiante, loading } = useEstudiantes();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const fields = [
    { label: "Nombre", name: "nombre", type: "text", placeholder: "Ingresa un nombre" },
    { label: "Apellido", name: "apellido", type: "text", placeholder: "Ingresa un apellido" },
    { label: "Cédula", name: "cedula", type: "text", placeholder: "Ingresa una cédula" },
    { label: "Fecha de nacimiento", name: "fecha_nacimiento", type: "date", placeholder: "" },
    { label: "Ciudad", name: "ciudad", type: "text", placeholder: "Ingresa una ciudad" },
    { label: "Dirección", name: "direccion", type: "text", placeholder: "Ingresa una dirección" },
    { label: "Teléfono", name: "telefono", type: "text", placeholder: "Ingresa un teléfono" },
    { label: "Email", name: "email", type: "email", placeholder: "Ingresa un correo electrónico" },
  ].map(f => ({ ...f, register: register(f.name, { required: `Debe ingresar ${f.label.toLowerCase()}` }), error: errors[f.name]?.message }));

  const onSubmit = handleSubmit((data) => {
    crearEstudiante(data, () => {
      reset();
      setTimeout(() => navigate("/dashboard/estudiantes/gestionar"), 2000);
    });
  });

  return <FormularioRegistro titulo="Crear Estudiante" fields={fields} onSubmit={onSubmit} loading={loading} />;
}

export default CrearEstudiante;
