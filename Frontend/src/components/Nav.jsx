import { useState } from "react";
import { User, LogOut, Home, Settings, ChevronLeft, ChevronRight, BookOpen, FileText, Plus, Edit, Trash } from "lucide-react";
import storeAuth from "../context/storeAuth";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const clearAll = storeAuth(state => state.clearAll);
  const nombre = storeAuth(state => state.nombre);
  const apellido = storeAuth(state => state.apellido);
  const email = storeAuth(state => state.email);

  const logout = () => {
    clearAll();
  };

  return (
    <>
      {/* Botón para ocultar/mostrar sidebar */}
      <div className="fixed top-4 right-4 z-50">
        <button
          className="bg-card p-2 rounded-full shadow-md hover:bg-blue-500 transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-card shadow-lg transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } w-64`}
      >
        {/* User info */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <User size={28} className="text-main" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{nombre} {apellido}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{email}</p>
            </div>
          </div>
          <button onClick={logout} className="text-gray-700 dark:text-gray-200 hover:text-red-500">
            <LogOut size={20} />
          </button>
        </div>

        {/* Menú CRUD */}
        <nav className="p-4 overflow-y-auto h-full">
          {/* Estudiantes */}
          <div className="mb-4">
            <p className="font-bold text-main mb-2 flex items-center gap-2">
              <BookOpen size={16} /> CRUD de Estudiantes
            </p>
            <ul className="ml-4 space-y-1">
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Plus size={16} /> Crear Estudiante</li>
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><FileText size={16} /> Visualizar Estudiantes</li>
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Edit size={16} /> Editar Estudiante</li>
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Trash size={16} /> Eliminar Estudiante</li>
            </ul>
          </div>

          {/* Materias */}
          <div className="mb-4">
            <p className="font-bold text-main mb-2 flex items-center gap-2">
              <BookOpen size={16} /> CRUD de Materias
            </p>
            <ul className="ml-4 space-y-1">
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Plus size={16} /> Crear Materia</li>
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><FileText size={16} /> Visualizar Materias</li>
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Edit size={16} /> Editar Materia</li>
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Trash size={16} /> Eliminar Materia</li>
            </ul>
          </div>

          {/* Matrículas */}
          <div className="mb-4">
            <p className="font-bold text-main mb-2 flex items-center gap-2">
              <BookOpen size={16} /> CRUD de Matrículas
            </p>
            <ul className="ml-4 space-y-1">
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Plus size={16} /> Crear Matrícula</li>
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><FileText size={16} /> Visualizar Matrículas</li>
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Edit size={16} /> Editar Matrícula</li>
              <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Trash size={16} /> Eliminar Matrícula</li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}
