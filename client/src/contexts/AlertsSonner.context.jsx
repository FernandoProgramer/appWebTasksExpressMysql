import { createContext, useContext, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";


const ComponentsContext = createContext()

export const ComponentsProvider = ({ children }) => {

    // Estado para almacenar el esquema de los toasts
    const [newToastSchema, setNewToastSchema] = useState(null);

    // Crear un nuevo esquema para un toast
    const createToast = (schemaToast) => {
        setNewToastSchema(schemaToast); // Guardar el esquema en el estado
    };

    // Ejecutar el toast usando el esquema actual
    const executeToast = () => {
        if (newToastSchema) {
            const { type, message, options } = newToastSchema;
            toast[type](message, options); // Ejecutar el toast con el esquema
            setNewToastSchema(null); // Limpiar el estado después de ejecutar
        }
    };

    // Efecto para ejecutar el toast automáticamente cuando el esquema cambia
    useEffect(() => {
        executeToast();
    }, [newToastSchema]);

    return (
        <ComponentsContext.Provider value={{
            createToast,
        }}>
            {children}
            <Toaster /> {/* Asegúrate de incluir Toaster en el proveedor */}
        </ComponentsContext.Provider>
    );
};

export const useComponentsContext = () => {
    return useContext(ComponentsContext)
}