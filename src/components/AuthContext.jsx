//Contexto de autenticación: todo lo que se encuentre dentro de este contexto requerirá que el usuario esté autenticadoimport { createContext, useContext, useEffect, useState } from "react";

// Importamos funciones necesarias de React
import { createContext, useContext, useEffect, useState } from "react";

// Creamos un contexto llamado AuthContext que nos permitirá compartir información de autenticación entre componentes
const AuthContext = createContext();

// Este componente proveedor (AuthProvider) envolverá a toda la aplicación o parte de ella
// Todo lo que esté dentro de este proveedor podrá acceder a los datos del contexto
export function AuthProvider({ children }) 
{
  // Estados para guardar el token de autenticación y el usuario logueado
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // useEffect se ejecuta una sola vez cuando se monta el componente
  // Intenta recuperar los datos de autenticación guardados en localStorage
  useEffect(() => 
  {
    const savedToken = localStorage.getItem("token"); // Recupera el token del almacenamiento local
    const savedUser = localStorage.getItem("user");   // Recupera el nombre de usuario

    // Si ambos existen, los carga en el estado
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

  // Función para iniciar sesión. En este ejemplo está "hardcodeada"
  // Solo acepta username: "admin" y password: "1234"
  const login = (username, password) => 
  {
    if (username === "admin" && password === "1234") 
    {
      const tokenFalso = "dG9rZW5GYWxzbzEyMzQ="; // Generamos un token falso (solo como ejemplo en base 64)
      setToken(tokenFalso);                     // Guardamos el token en el estado
      setUser(username);                        // Guardamos el usuario
      localStorage.setItem("token", tokenFalso); // Guardamos token y usuario en localStorage
      localStorage.setItem("user", username);
      return true; // Devuelve true para indicar que el login fue exitoso
    }
    return false; // Si los datos no coinciden, devuelve false
  };

  // Función para cerrar sesión
  const logout = () => 
  {
    setToken(null);           // Resetea el token en el estado
    setUser(null);            // Resetea el usuario
    localStorage.removeItem("token"); // Borra el token del localStorage
    localStorage.removeItem("user");  // Borra el usuario del localStorage
  };

  // Retornamos el proveedor de contexto, con los valores que queremos compartir
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children} {/* Representa los componentes hijos que estarán dentro del contexto */}
    </AuthContext.Provider>
  );
}

// Hook personalizado que nos permite acceder fácilmente al contexto desde otros componentes
export const useAuth = () => useContext(AuthContext);
