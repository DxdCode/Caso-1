import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import Register from "./components/auth/Register"
import Layout from "./components/Layout"
import PublicRoute from "./routes/PublicRoute"
import ProtectedRoute from "./routes/ProtectedRoute"
import VisualizarEstudiante from "./components/estudiantes/VisualizarEstudiante"
import Dashboard from './Dashboard/Dashboard'
import CrearEstudiante from "./components/estudiantes/CrearEstudiante"
import EditarEstudiante from "./components/estudiantes/GestionarEstudiante"
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
          <Route>
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="estudiantes" element={<VisualizarEstudiante />} />
              <Route path="estudiantes/crear" element={<CrearEstudiante />} />
              <Route path="estudiantes/gestionar" element={<EditarEstudiante />} />
            </Route>
          </Route>

          {/* CRUD DE MATERIAS */}
          {/* <Route path="materia" element={<VisualizarEstudiante />} />
          <Route path="materia/crear" element={<CrearEstudiante />} />
          <Route path="materia/:id/editar" element={<EditarEstudiante />} />
          <Route path="materia/:id/eliminar" element={<EditarEstudiante />} /> */}
          {/* CRUD DE MATRICULAS */}
          {/* <Route path="matricula" element={<VisualizarEstudiante />} />
          <Route path="matricula/crear" element={<CrearEstudiante />} />
          <Route path="matricula/:id/editar" element={<EditarEstudiante />} />
          <Route path="matricula/:id/eliminar" element={<EditarEstudiante />} /> */}

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
