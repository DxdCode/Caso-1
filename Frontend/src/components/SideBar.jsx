import { useState, useRef, useEffect } from "react";
import { User, LogOut, Plus, FileText, Edit, Trash, ChevronRight, ChevronLeft } from "lucide-react";
import storeAuth from "../context/storeAuth";

export default function Sidebar() {
    const [open, setOpen] = useState(false); // Closed by default
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
        return () => document.addEventListener("mousedown", handleClickOutside);
    }, []);

    // Check screen size on mount to set initial state
    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth >= 768) { // md breakpoint
                setOpen(true);
            } else {
                setOpen(false);
            }
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
            {/* Toggle button always visible, positioned on right for mobile */}
            <button
                className="fixed top-4 right-4 z-50 p-2 rounded-full bg-secondary text-white shadow-md hover:bg-secondary/80 transition-colors cursor-pointer md:hidden"
                onClick={() => setOpen(!open)}
            >
                {open ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full bg-card shadow-lg transition-all duration-300 z-40 flex flex-col
                    ${open ? "w-full md:w-64" : "w-16 md:w-64"}
                `}
            >
                {/* User info */}
                <div className="flex items-center gap-2 p-4 bg-card">
                    <div className="p-1.5 bg-secondary rounded-full">
                        <User size={28} className="text-white" />
                    </div>
                    {(open || window.innerWidth >= 768) && (
                        <div className="text-sm">
                            <p className="font-semibold truncate">{nombre} {apellido}</p>
                            <span className="inline-block px-1.5 py-1 bg-secondary rounded text-xs truncate max-w-[150px] text-white">{email}</span>
                        </div>
                    )}
                </div>

                {/* Menu with scroll */}
                <nav className="flex-1 overflow-y-auto p-2 space-y-2 bg-base">
                    {menuItems.map((menu, idx) => (
                        <ul key={idx} className="ml-2 space-y-1 text-sec">
                            <div className="font-bold truncate">
                                {(open || window.innerWidth >= 768) && menu.label}
                            </div>
                            {menu.actions.map((action, i) => (
                                <li
                                    key={i}
                                    className={`flex items-center ${(open || window.innerWidth >= 768) ? "justify-start" : "justify-center"} gap-2 p-2 rounded-md hover:rounded-md hover:bg-[#8B5CF6] hover:text-white cursor-pointer transition-colors duration-300`}
                                    title={!(open || window.innerWidth >= 768) ? `${action} ${menu.label.slice(0, -1)}` : ""}
                                >
                                    {action === "Crear" && <Plus size={16} />}
                                    {action === "Visualizar" && <FileText size={16} />}
                                    {action === "Editar" && <Edit size={16} />}
                                    {action === "Eliminar" && <Trash size={16} />}
                                    {(open || window.innerWidth >= 768) && `${action} ${menu.label.slice(0, -1)}`}
                                </li>
                            ))}
                        </ul>
                    ))}
                </nav>

                {/* Logout at bottom */}
                <div className="p-4 mt-auto">
                    <button
                        onClick={logout}
                        className={`flex items-center ${(open || window.innerWidth >= 768) ? "justify-start" : "justify-center"} gap-2 p-2 w-full rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300`}
                    >
                        <LogOut size={20} /> {(open || window.innerWidth >= 768) && "Cerrar sesión"}
                    </button>
                </div>
            </aside>
        </>
    );
}