import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(user, pass)) {
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña inválidos");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card
        style={{
          width: "24rem",
          borderRadius: "1rem",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <Card.Body>
          <Card.Title className="mb-4 text-center fw-bold" style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
            Iniciar sesión
          </Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre de usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <Form.Text className="text-muted fst-italic">
                ℹ️ Ejemplo: admin
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <Form.Text className="text-muted fst-italic">
                🔒 Contraseña: 1234
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{ borderRadius: "0.5rem" }}
            >
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
