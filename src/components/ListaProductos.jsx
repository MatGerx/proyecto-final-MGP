import { Table, Button } from 'react-bootstrap';

function ListaProductos({ productos, onEdit, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>IDENTIFICACIÓN</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.title || p.nombre}</td>
            <td>${p.price?.toFixed(2) || p.precio?.toFixed(2)}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(p)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(p.id)}>Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default ListaProductos;