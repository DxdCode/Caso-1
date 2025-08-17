import React, { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import ejemploImg from "../../assets/login.png";
import { Link } from 'react-router-dom';
import ButtonRegresar from './ButtonRegresar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <section className="h-screen bg-base flex flex-col md:flex-row">
      {/* Imagen  */}
      <div className="hidden md:flex w-1/2 bg-[#CFEAFD] relative items-center justify-center overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300 rounded-full"></div>
        <img src={ejemploImg} alt="Login ilustración" className="relative w-3/4 h-auto z-10" />
      </div>

      {/* Login  */}
      <div className="flex-1 flex items-center justify-center px-4 bg-[#CFEAFD] relative">
        {/* Círculos decorativos*/}
        <div className="absolute -top-16 -left-10 w-24 h-24 bg-blue-400 rounded-full z-0"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-200 rounded-full z-0"></div>

      <ButtonRegresar></ButtonRegresar>
        <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg relative z-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-sec">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Correo */}
            <label className="flex flex-col text-sec">
              Correo
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70"
                required
              />
            </label>

            {/* Contraseña */}
            <label className="flex flex-col text-sec relative">
              Contraseña
              <div className="mt-1 relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 pr-10"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </label>

            {/* Botón */}
            <button
              type="submit"
              className="mt-4 cursor-pointer bg-primary text-terc py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition transform shadow-md w-full"
            >
              <LogIn size={20} />
              Iniciar Sesión
            </button>
            <div className="text-center mt-4 text-sm text-sec">
              ¿Aún no tienes una cuenta?{" "}
              <Link
                to="/register"
                className="text-primary font-semibold hover:underline"
              >
                Regístrate aquí
              </Link>
            </div>          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
