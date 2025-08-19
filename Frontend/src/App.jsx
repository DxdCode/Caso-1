import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import Register from "./components/auth/Register"
import Layout from "./components/Layout"
import PublicRoute from "./routes/PublicRoute"
import ProtectedRoute from "./routes/ProtectedRoute"
import Dashboard from './Dashboard/Dashboard'

import VisualizarEstudiante from "./components/estudiantes/VisualizarEstudiante"
import CrearEstudiante from "./components/estudiantes/CrearEstudiante"
import GestionarEstudiante from "./components/estudiantes/GestionarEstudiante"

import VisualizarMateria from "./components/materias/visualizarMateria"
import GestionMateria from "./components/materias/gestionMateria"

import CrearMatricula from "./components/matriculas/crearMatricula"
import VisualizarMatricula from "./components/matriculas/VisualizarMatricula"
import GestionarMatricula from "./components/matriculas/GestionarMatricula"
import CrearMateria from "./components/materias/CrearMateria"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* RUTAS PRIVADAS */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            {/* CRUD DE ESTUDIANTES */}
            <Route path="estudiantes" element={<VisualizarEstudiante />} />
            <Route path="estudiantes/crear" element={<CrearEstudiante />} />
            <Route path="estudiantes/gestionar" element={<GestionarEstudiante />} />
            {/* CRUD DE MATERIA */}
            <Route path="materias" element={<VisualizarMateria/>} />
            <Route path="materias/crear" element={<CrearMateria/>} />
            <Route path="materias/gestionar" element={<GestionMateria />} />
            {/* CRUD DE MATRICULA */}
            <Route path="matriculas" element={<VisualizarMatricula />} />
            <Route path="matriculas/crear" element={<CrearMatricula />} />
            <Route path="matriculas/gestionar" element={<GestionarMatricula />} />
          </Route>

ñ
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
