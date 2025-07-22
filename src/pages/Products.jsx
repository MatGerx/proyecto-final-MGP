import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../components/CartContect'; // importar contexto

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Usamos contexto, no estado local
  const { cart, agregarAlCarrito } = useCart();

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error de carga de API", err);
        setLoading(false);
      });
  }, []);

 if (loading) return (
  <Container className="pt-5">
    <p>Cargando productos...</p>
  </Container>
);

  return (
    <Container className='mt-4'>
      <h1>Productos</h1>
      <p>Carrito: {cart.length} productos</p> {/* muestra cantidad global */}
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4}>
            <Card className="m-2">
              <Card.Img src={product.images?.[0]} alt={product.title} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <strong>Precio: ${product.price}</strong>
                </Card.Text>
                <Button onClick={() => agregarAlCarrito(product)} variant="primary">
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

export default Products;

