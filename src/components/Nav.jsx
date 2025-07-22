import React from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from '../components/CartContect';

const Navegacion = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cantidadTotal = cart.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Mi Sitio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menú izquierdo */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>

          {/* Menú derecho */}
          <Nav className="ms-auto align-items-center">
            {user && (
              <Navbar.Text className="me-3">
                Hola, <strong>{user}</strong>
              </Navbar.Text>
            )}

            <Button
              variant="outline-light"
              as={Link}
              to={user ? "/dashboard" : "/login"}
              className="me-3"
            >
              Administrador
            </Button>

            {user && (
              <Nav.Link as={Link} to="/carrito" className="me-3 d-flex align-items-center">
                Carrito{' '}
                {cantidadTotal > 0 && (
                  <Badge bg="danger" pill className="ms-1">
                    {cantidadTotal}
                  </Badge>
                )}
              </Nav.Link>
            )}

            {user && (
              <Button
                variant="link"
                className="nav-link"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navegacion;
