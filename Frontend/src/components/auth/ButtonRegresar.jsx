import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function ButtonRegresar() {
  const location = useLocation();

  // Definir colores según la página
  const styles = {
    '/register': 'bg-[#8B5CB1] text-white',
    '/login': 'bg-primary text-white',
  };

  const buttonStyle = styles[location.pathname] || 'bg-gray-200 text-main';

  return (
    <Link
      to="/"
      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold hover:opacity-90 transition z-20 ${buttonStyle}`}
      style={{ marginBottom: '1rem' }} // separa del card
    >
      <ArrowLeft size={20} />
      Regresar
    </Link>
  );
}

export default ButtonRegresar;
