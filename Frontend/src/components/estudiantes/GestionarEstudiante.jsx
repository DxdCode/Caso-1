import { useState } from "react";
import { ToastContainer } from "react-toastify";
import useEstudiantes from "../../hooks/useEstudiante";
import FiltroBusqueda from "../FiltrarBusqueda";
import TablaEstudiantes from "./TablaEstudiante";
import ModalEditarEstudiante from "../../Dashboard/ModalGestionar";

function GestionarEstudiante() {
  const { estudiantes, loading, eliminarEstudiante, actualizarEstudiante } = useEstudiantes();

  const [busqueda, setBusqueda] = useState("");
  const [campoFiltro, setCampoFiltro] = useState("nombre");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    fecha_nacimiento: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const normalizar = (texto = "") =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const estudiantesFiltrados = estudiantes.filter((est) =>
    normalizar(est[campoFiltro] || "").includes(normalizar(busqueda))
  );

  const handleEdit = (estudiante) => {
    setEditId(estudiante._id);
    setFormData({ ...estudiante });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    actualizarEstudiante(editId, formData);
    setEditId(null);
  };

  const campos = [
    { value: "nombre", label: "Nombre" },
    { value: "apellido", label: "Apellido" },
    { value: "cedula", label: "Cédula" },
    { value: "email", label: "Correo" },
    { value: "telefono", label: "Teléfono" },
    { value: "ciudad", label: "Ciudad" },
    { value: "direccion", label: "Dirección" },
  ];

  return (
    <section className="px-2">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-sec">📝 Gestionar Estudiantes</h2>

      <FiltroBusqueda
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        campoFiltro={campoFiltro}
        setCampoFiltro={setCampoFiltro}
        campos={campos}
      />

      <TablaEstudiantes
        estudiantes={estudiantesFiltrados}
        campos={campos}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={eliminarEstudiante}
      />

      <ModalEditarEstudiante
        editId={editId}
        setEditId={setEditId}
        formData={formData}
        setFormData={setFormData}
        handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        handleUpdate={handleUpdate}
      />
    </section>
  );
}

export default GestionarEstudiante;
