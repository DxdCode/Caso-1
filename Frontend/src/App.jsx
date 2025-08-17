import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import Register from "./components/auth/Register"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
