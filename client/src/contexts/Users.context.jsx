import { createContext, useContext, useState } from "react";

// Crear el contexto
const UserContext = createContext();

// Crear el proveedor
export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
        <UserContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn
        }}>
            {children}
        </UserContext.Provider>
    )
};

// Crear un hook personalizado para acceder al contexto
export const useUserContext = () => {
    return useContext(UserContext);
};
