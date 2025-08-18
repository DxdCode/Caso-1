import { useState } from 'react';
import { User, BookOpen, FileCheck } from 'lucide-react';
import storeAuth from '../context/storeAuth';
import SideBar from './SideBar';

function Dashboard() {
  const [open, setOpen] = useState(false);
  const nombre = storeAuth(state => state.nombre);
  const apellido = storeAuth(state => state.apellido);

  return (
    <div className="min-h-screen flex bg-base">
      {/* Sidebar */}
      <SideBar open={open} setOpen={setOpen} />

      {/* Main  */}
      <div className={`flex-1 p-6 transition-all duration-300 ${open ? 'ml-64' : 'ml-16'}`}>
        <header className="py-8 text-center">
          <h2 className="text-3xl font-bold text-sec">
            Bienvenido {nombre} {apellido} 👋
          </h2>
          <p className="text-sec mt-2">
            Administra tu plataforma de Matrículas de manera rápida y sencilla
          </p>
        </header>

        {/* CRUD sections */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card: Estudiantes */}
          <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-card/90 transition-colors duration-200">
            <User className="text-primary w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-sec">Estudiantes</h3>
            <p className="text-2xl font-bold text-primary mt-2">120</p>
          </div>

          {/* Card: Materías */}
          <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-card/90 transition-colors duration-200">
            <BookOpen className="text-secondary w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-sec">Materías</h3>
            <p className="text-2xl font-bold text-secondary mt-2">15</p>
          </div>

          {/* Card: Matrículas */}
          <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-card/90 transition-colors duration-200">
            <FileCheck className="text-primary w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-sec">Matrículas</h3>
            <p className="text-2xl font-bold text-primary mt-2">45</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;