function CardItem({ item, onClick, type, isSelected }) {
  return (
    <div
      onClick={() => onClick(item)}
      className={`p-3 rounded-xl shadow-lg cursor-pointer transition-colors
        ${isSelected ? "bg-blue-500 text-white" : "hover:bg-black/5 text-sec"}`}
    >
      {type === "estudiante" && (
        <>
          <p className="truncate font-bold">{item.nombre} {item.apellido}</p>
          <p className="truncate">{item.email}</p>
          <p className="truncate">Cédula: {item.cedula}</p>
          <p className="truncate">Teléfono: {item.telefono}</p>
        </>
      )}

      {type === "materia" && (
        <>
          <p className="truncate font-bold">{item.nombre}</p>
          <p className="truncate">Código: {item.codigo}</p>
          <p className="truncate">Créditos: {item.creditos}</p>
        </>
      )}
    </div>
  );
}

export default CardItem;
