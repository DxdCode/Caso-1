import { useRef, useEffect } from "react";
import { User, LogOut, Plus, FileText, Edit, Trash } from "lucide-react";
import storeAuth from "../context/storeAuth";

function Sidebar({ open, setOpen }) {
    const sidebarRef = useRef(null);
    const clearAll = storeAuth(state => state.clearAll);
    const nombre = storeAuth(state => state.nombre);
    const apellido = storeAuth(state => state.apellido);
    const email = storeAuth(state => state.email);

    const logout = () => clearAll();

    const menuItems = [
        { label: "Estudiantes", actions: ["Crear", "Visualizar", "Editar", "Eliminar"] },
        { label: "Materias", actions: ["Crear", "Visualizar", "Editar", "Eliminar"] },
        { label: "Matrículas", actions: ["Crear", "Visualizar", "Editar", "Eliminar"] },
    ];

    // Close sidebar on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setOpen]);

    return (
        <aside
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full bg-card shadow-lg transition-all duration-300 ease-in-out z-50 flex flex-col
                ${open ? "w-64" : "w-16"}`} // Collapsed by default on all screens
        >
            {/* User info */}
            <div className="flex items-center gap-3 p-4 bg-card">
                <div 
                    className="p-2 bg-secondary rounded-full cursor-pointer hover:bg-secondary/80 transition-colors duration-200"
                    onClick={() => setOpen(!open)} // Toggle sidebar on click
                >
                    <User size={24} className="text-white" />
                </div>
                {open && (
                    <div className="text-sm">
                        <p className="font-semibold truncate">{nombre} {apellido}</p>
                        <span className="inline-block px-2 py-1 bg-secondary rounded text-xs truncate max-w-[150px] text-white">{email}</span>
                    </div>
                )}
            </div>

            {/* Menu with scroll */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-3 bg-base">
                {menuItems.map((menu, idx) => (
                    <ul key={idx} className="space-y-1 text-sec">
                        <div className="font-bold truncate pl-2">
                            {open && menu.label}
                        </div>
                        {menu.actions.map((action, i) => (
                            <li
                                key={i}
                                className={`flex items-center ${
                                    open ? "justify-start" : "justify-center"
                                } gap-2 p-2 rounded-md hover:rounded-md hover:bg-[#8B5CF6] hover:text-white cursor-pointer transition-colors duration-300`}
                                title={!open ? `${action} ${menu.label.slice(0, -1)}` : ""}
                            >
                                {action === "Crear" && <Plus size={16} />}
                                {action === "Visualizar" && <FileText size={16} />}
                                {action === "Editar" && <Edit size={16} />}
                                {action === "Eliminar" && <Trash size={16} />}
                                {open && (
                                    <span className="text-sm">{`${action} ${menu.label.slice(0, -1)}`}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                ))}
            </nav>

            {/* Logout at bottom */}
            <div className="p-4 mt-auto">
                <button
                    onClick={logout}
                    className={`flex items-center ${
                        open ? "justify-start" : "justify-center"
                    } gap-2 p-2 w-full rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300`}
                >
                    <LogOut size={18} />
                    {open && <span className="text-sm">Cerrar sesión</span>}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar