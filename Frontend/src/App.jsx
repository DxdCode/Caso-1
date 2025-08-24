import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import Home from "./components/home/Home"
import Register from "./components/auth/Register"
import Layout from "./components/Layout"
import PublicRoute from "./routes/PublicRoute"
import ProtectedRoute from "./routes/ProtectedRoute"
import Dashboard from './Dashboard/Dashboard'
import CrearEstudiante from "./components/estudiantes/CrearEstudiante"
import GestionarEstudiante from "./components/estudiantes/GestionarEstudiante"
import CrearMateria from "./components/materias/CrearMateria"
import CrearMatricula from "./components/matriculas/CrearMatricula"
import GestionarMatricula from "./components/matriculas/GestionarMatricula"
import GestionarMateria from "./components/materias/GestionarMateria"


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
            <Route path="estudiantes/crear" element={<CrearEstudiante />} />
            <Route path="estudiantes/gestionar" element={<GestionarEstudiante />} />
            {/* CRUD DE MATERIA */}
            <Route path="materias/crear" element={<CrearMateria/>} />
            <Route path="materias/gestionar" element={<GestionarMateria />} />
            {/* CRUD DE MATRICULA */}
            <Route path="matriculas/crear" element={<CrearMatricula />} />
            <Route path="matriculas/gestionar" element={<GestionarMatricula />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
