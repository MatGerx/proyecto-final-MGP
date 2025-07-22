import { useAuth } from "../components/AuthContext";
import { Container, Card } from "react-bootstrap";
import ProductCRUD from "../components/ProductCRUD";

export default function Dashboard() {
  return (
    <div className="mt-4">
      <ProductCRUD />
    </div>
  );
}