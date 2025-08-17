import { User } from 'lucide-react';
import storeAuth from '../context/storeAuth';
import Nav from './Nav';

function Dashboard() {
  const nombre = storeAuth(state => state.nombre);
  const apellido = storeAuth(state => state.apellido);

  return (
    <div className="min-h-screen bg-base">
      {/* Navbar superior */}
      <div>
        <Nav></Nav>
      </div>

      {/* Bienvenida */}
      <header className="px-6 py-8">
        <h2 className="text-3xl font-bold text-sec">Bienvenido - {nombre} {apellido} 👋</h2>
        <p className="text-sec mt-2">
          Administra tu plataforma de manera rápida y sencilla
        </p>
      </header>

      {/* Secciones CRUD */}
      <main className="px-6 pb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Estudiantes */}
        <div className="bg-primary text-terc p-6 rounded-2xl shadow-lg flex flex-col gap-4 hover:scale-105 transition transform cursor-pointer">
          <h3 className="font-bold text-xl">CRUD de Estudiantes</h3>
          <ul className="flex flex-col gap-2 text-base">
            <li>Crear Estudiante</li>
            <li>Visualizar Estudiantes</li>
            <li>Editar Estudiante</li>
            <li>Eliminar Estudiante</li>
          </ul>
        </div>

        {/* Materias */}
        <div className="bg-secondary text-terc p-6 rounded-2xl shadow-lg flex flex-col gap-4 hover:scale-105 transition transform cursor-pointer">
          <h3 className="font-bold text-xl">CRUD de Materias</h3>
          <ul className="flex flex-col gap-2 text-base">
            <li>Crear Materia</li>
            <li>Visualizar Materias</li>
            <li>Editar Materia</li>
            <li>Eliminar Materia</li>
          </ul>
        </div>

        {/* Matrículas */}
        <div className="bg-success text-terc p-6 rounded-2xl shadow-lg flex flex-col gap-4 hover:scale-105 transition transform cursor-pointer">
          <h3 className="font-bold text-xl">CRUD de Matrículas</h3>
          <ul className="flex flex-col gap-2 text-base">
            <li>Crear Matrícula</li>
            <li>Visualizar Matrículas</li>
            <li>Editar Matrícula</li>
            <li>Eliminar Matrícula</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
