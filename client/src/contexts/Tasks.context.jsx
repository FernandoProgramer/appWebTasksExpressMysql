import { createContext, useContext, useState } from "react";
import { createTask, showAllTasks } from "../api/tasks.api";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])

    const createTasks = async (task) => {
        try {
            const { status } = await createTask(task);
            return status;
        } catch { }
    }

    const loadTasks = async () => { // Cargar tareas
        try {
            const { data } = await showAllTasks();
            setTasks(data.tasks)
        } catch { }
    }

    const deleteTask = () => {

    }

    const updateTask = () => {

    }

    const updateStateTask = () => {

    }

    return (
        <TasksContext.Provider value={{
            tasks,
            loadTasks,
            deleteTask,
            updateTask,
            updateStateTask,
            createTasks
        }}>
            {children}
        </TasksContext.Provider>
    )
};

export const useTasksContext = () => {
    return useContext(TasksContext)
};