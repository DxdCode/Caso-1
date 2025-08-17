import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import Register from "./components/auth/Register"
import Dashboard from "./components/Dashboard"
import PublicRoute from "./routes/PublicRoute"
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* RUTAS PRIVADAS */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
          <Route index element={<Dashboard />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
