import { Trash } from "lucide-react";

function SelectedEstudiante({ estudiante, onRemove }) {
  if (!estudiante) return null;

  return (
    <div className="bg-card p-4 rounded-xl shadow-lg">
      <button onClick={onRemove} className="flex items-center gap-2 text-error cursor-pointer">
        <Trash size={20} /> Eliminar
      </button>
      <p className="font-semibold">{estudiante.nombre} {estudiante.apellido}</p>
      <p>{estudiante.email}</p>
      <p>Cédula: {estudiante.cedula}</p>
      <p>Teléfono: {estudiante.telefono}</p>
    </div>
  );
}

export default SelectedEstudiante;
