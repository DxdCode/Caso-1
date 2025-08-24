import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useMateria from "../../hooks/useMateria";
import FormularioRegistro from "../../Dashboard/FormularioRegistro";

function CrearMateria() {
  const { crearMateria, loading } = useMateria();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const fields = [
    { label: "Nombre", name: "nombre", type: "text", placeholder: "Ingresa un nombre" },
    { label: "Código", name: "codigo", type: "text", placeholder: "Ingresa un código" },
    { label: "Descripción", name: "descripcion", type: "text", placeholder: "Ingresa una descripción" },
    { label: "Crédito", name: "creditos", type: "text", placeholder: "Ingresa un crédito" },
  ].map(f => ({ ...f, 
    register: register(f.name, { required: `Debe ingresar ${f.label.toLowerCase()}` }), 
    error: errors[f.name]?.message }));

  const onSubmit = handleSubmit((data) => {
    crearMateria(data, () => {
      reset();
      setTimeout(() => navigate("/dashboard/materias/gestionar"), 2000);
    });
  });

  return <FormularioRegistro titulo="Crear Materia" fields={fields} onSubmit={onSubmit} loading={loading} />;
}
export default CrearMateria;
