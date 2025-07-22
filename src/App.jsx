import Nav from './components/Nav';
import Footer from './pages/Footer';
import Contact from './pages/Contact';
import Products from './pages/Products';  
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Carrito from './pages/Carrito';
import MockProducts from './components/MockProducts';

import { CartProvider } from "./components/CartContect";
import { AuthProvider, useAuth } from "./components/AuthContext";

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav />

      <main className="flex-grow-1 p-3 pt-5">
        <Routes>
          <Route path="/" element={<MockProducts />} />   
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
