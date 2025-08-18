import { User } from 'lucide-react';
import storeAuth from '../context/storeAuth';
import SideBar from './SideBar';

function Dashboard() {
  const nombre = storeAuth(state => state.nombre);
  const apellido = storeAuth(state => state.apellido);

  return (
    <div className="min-h-screen flex bg-base">
      {/* Sidebar */}
      <SideBar />

      {/* Main content with dynamic margin */}
      <div className="flex-1 p-6 ml-16 md:ml-64">
        {/* Welcome header */}
        <header className="py-8 text-center">
          <h2 className="text-3xl font-bold text-sec">
            Bienvenido {nombre} {apellido} 👋
          </h2>
          <p className="text-sec mt-2">
            Administra tu plataforma de Matrículas de manera rápida y sencilla
          </p>
        </header>

        {/* CRUD sections */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Estudiantes */}
          <div className="bg-card shadow rounded-lg p-6 flex flex-col items-center">
            <User className="text-primary w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-sec">Estudiantes</h3>
            <p className="text-2xl font-bold text-primary mt-2">120</p>
          </div>

          {/* Card: Cursos */}
          <div className="bg-card shadow rounded-lg p-6 flex flex-col items-center">
            <User className="text-secondary w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-sec">Cursos</h3>
            <p className="text-2xl font-bold text-secondary mt-2">15</p>
          </div>

          {/* Card: Ventas */}
          <div className="bg-card shadow rounded-lg p-6 flex flex-col items-center">
            <User className="text-primary w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-sec">Ventas recientes</h3>
            <p className="text-2xl font-bold text-primary mt-2">45</p>
          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;