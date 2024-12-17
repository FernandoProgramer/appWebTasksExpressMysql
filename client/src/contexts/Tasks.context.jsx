// Importaciones necesarias
import { createContext, useContext, useState } from "react";
import { createTask, deleteTaskRequest, showAllTasks, showTaskById, updateIsCompletedRequest, updateTaskRequest } from "../api/tasks.api";
import { useComponentsContext } from "./AlertsSonner.context";

// Creación del contexto para las tareas
const TasksContext = createContext();

// Proveedor del contexto de tareas
export const TasksProvider = ({ children }) => {
    const { createToast } = useComponentsContext()

    // Estado inicial para almacenar las tareas
    const [tasks, setTasks] = useState([])
    // Función para crear una nueva tarea (Create)
    const createTasks = async (task) => {
        try {
            const { status } = await createTask(task);
            return status;
        } catch {
            // Manejo de errores opcional
        }
    }

    // Función para cargar todas las tareas (Read)
    const loadTasks = async () => {
        try {
            const { data } = await showAllTasks();
            setTasks(data.tasks || [])
        } catch {
            // Manejo de errores opcional
        }
    }

    // Función para eliminar una tarea por ID (Delete)
    const deleteTask = async (idTask) => {
        try {
            await deleteTaskRequest(idTask)
            setTasks(tasks.filter(task => task.id_task !== idTask));
            createToast({
                type: "success",
                message: "Tarea Borrada Correctamente",
                options: { style: { border: "1px solid black" } }
            })

        } catch { }
    }

    // Función para actualizar una tarea específica (Update)
    const updateTask = async (newData, id) => {
        try {
            const { status } = await updateTaskRequest(newData, id);
            return status;
        } catch {
            // Manejo de errores opcional
        }
    }

    // Función pendiente para actualizar el estado de completado de una tarea
    const updateIsComplet = async (id) => {
        try {
            await updateIsCompletedRequest(id)
            const updatedTasks = tasks.map((task) =>
                task.id_task === id
                    ? { ...task, isCompleted: task.isCompleted === 0 ? 1 : 0 }
                    : task
            );

            setTasks(updatedTasks);
        } catch { }
    }

    // Función para cargar una tarea específica por ID (Read)
    const loadTask = async (id) => {
        try {
            const { data } = await showTaskById(id);
            return data.task;
        } catch {
            // Manejo de errores opcional
        }
    }

    // Retornar el contexto con las funciones disponibles
    return (
        <TasksContext.Provider value={{
            tasks,
            loadTasks, // Leer todas las tareas
            deleteTask, // Eliminar una tarea
            updateTask, // Actualizar una tarea
            updateIsComplet, // Actualizar estado completado
            createTasks, // Crear una tarea
            loadTask, // Leer una tarea específica
        }}>
            {children}
        </TasksContext.Provider>
    );
};

// Hook personalizado para usar el contexto de tareas
export const useTasksContext = () => {
    return useContext(TasksContext);
};
