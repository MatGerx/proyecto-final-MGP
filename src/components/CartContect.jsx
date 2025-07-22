import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

const agregarAlCarrito = (producto) => {
  setCart(prevCart => {
    const existente = prevCart.find(p => p.id === producto.id);
    if (existente) {
      return prevCart.map(p =>
        p.id === producto.id
          ? { ...p, cantidad: (p.cantidad || 1) + 1 }
          : p
      );
    } else {
      return [...prevCart, { ...producto, cantidad: 1 }];
    }
  });
};


  const borrarDelCarrito = (id) => {
    setCart(prevCart => prevCart.filter(p => p.id !== id));
  };

  const vaciarCarrito = () => {
    setCart([]);
  };

  // Total del carrito (precio x cantidad)
  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.cantidad || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, agregarAlCarrito, borrarDelCarrito, vaciarCarrito, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
