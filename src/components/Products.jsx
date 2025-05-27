import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);  // Estado para carrito

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

    // 👇 Función para agregar al carrito
  const agregarAlCarrito = (producto) => {
    setCart([...cart, producto]);
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <Container className='mt-4'>
      <h1>Productos</h1>
      <p>Carrito: {cart.length} productos</p> {/* 🛒 Indicador del carrito */}
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
                {/* Botón para agregar al carrito */}
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
