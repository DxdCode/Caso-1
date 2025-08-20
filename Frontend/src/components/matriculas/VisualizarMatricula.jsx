import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Array de ejemplo (reemplaza con tus datos)
  const items = [
    { _id: 1, name: "Elemento 1" },
    { _id: 2, name: "Elemento 2" },
    { _id: 3, name: "Elemento 3" },
  ];

  const handleButtonClick = (item) => {
    setSelectedItem(item); // Guardar el elemento clicado
    setIsOpen(true); // Mostrar el modal
  };

  const closeModal = () => {
    setIsOpen(false); // Cerrar el modal
    setSelectedItem(null); // Limpiar el elemento seleccionado
  };

  return (
    <div>
      <div className="grid grid-cols-autofit gap-4 mt-4">
        {items.map((est) => (
          <div
            key={est._id}
            className={`bg-gray-800 p-4 rounded-xl shadow-lg transition-all duration-300 flex flex-col gap-4 border ${
              selectedItem && selectedItem._id === est._id
                ? 'border-blue-500 bg-blue-600 scale-105'
                : 'border-transparent hover:bg-gray-700 hover:border-blue-400 hover:scale-105'
            }`}
          >
            <span className="text-white font-semibold">{est.name}</span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
              onClick={() => handleButtonClick(est)}
            >
              Ver Detalles
            </button>
          </div>
        ))}
      </div>

      {/* Modal con estilos */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Detalles!</h2>
            <p className="text-gray-600 mb-6">
              Elemento seleccionado: <span className="font-semibold text-blue-600">{selectedItem.name}</span>
            </p>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;