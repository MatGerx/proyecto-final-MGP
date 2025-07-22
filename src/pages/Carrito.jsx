import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { useCart } from '../components/CartContect';

const Carrito = () => {
  const { cart, borrarDelCarrito, vaciarCarrito, total } = useCart();

  console.log("Contenido del carrito:", cart); // 👀 Para debug

  return (
    <Container className="my-4">
      <h2>Gestión de Productos (Carrito)</h2>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const precio = Number(item.price ?? 0);
                const cantidad = item.cantidad ?? 1;
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title || item.nombre || item.name}</td>
                    <td>${precio.toFixed(2)}</td>
                    <td>{cantidad}</td>
                    <td>${(precio * cantidad).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => borrarDelCarrito(item.id)}
                      >
                        Borrar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <h4>Total del carrito: ${Number(total ?? 0).toFixed(2)}</h4>

          <Button variant="secondary" onClick={vaciarCarrito} className="mt-3">
            Vaciar carrito
          </Button>
        </>
      )}
    </Container>
  );
};

export default Carrito;
