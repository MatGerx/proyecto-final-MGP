import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../components/CartContect';

function MockProducts() {
  const [mockProducts, setMockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // detecta navegación a esta ruta
  const { cart, agregarAlCarrito } = useCart();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://687d102d918b64224330e241.mockapi.io/api/v1/products');
      const data = await res.json();
      setMockProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  // 👇 Cada vez que volvés a esta ruta, vuelve a cargar productos
  useEffect(() => {
    fetchProducts();
  }, [location.pathname]);

  if (loading) return <p>Cargando productos desde Mock API...</p>;

  return (
    <Container className='mt-4'>
      <h1>Productos desde Mock API</h1>
      <p>Carrito: {cart.length} productos</p>

      <Row>
        {mockProducts.map(item => (
          <Col key={item.id} md={4}>
            <Card className="m-2">
              <Card.Img src={item.avatar} alt={item.name} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <strong>Descripción:</strong> {item.description ?? 'Producto genérico'}<br />
                  <strong>Precio:</strong> ${Number(item.price ?? 1000).toFixed(2)}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    agregarAlCarrito({
                      ...item,
                      price: Number(item.price ?? 1000),
                    })
                  }
                >
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MockProducts;
