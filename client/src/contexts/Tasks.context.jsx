import { createContext, useContext, useState } from "react";
import { createTask, deleteTaskRequest, showAllTasks, showTaskById, updateTaskRequest } from "../api/tasks.api";

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
            setTasks(data.tasks || [])
        } catch { }
    }

    const deleteTask = async (idTask) => {
        try {
            await deleteTaskRequest(idTask)
            setTasks(tasks.filter(task => task.id_task !== idTask));
        } catch { }
    }

    const updateTask = async (newData, id) => {
        try {
            const { status } = await updateTaskRequest(newData, id)
            return status
        } catch { }
    }

    const updateIsComplet = () => {

    }

    const loadTask = async (id) => {
        try {
            const { data } = await showTaskById(id)
            return data.task
        } catch { }
    }

    return (
        <TasksContext.Provider value={{
            tasks,
            loadTasks,
            deleteTask,
            updateTask,
            updateIsComplet,
            createTasks,
            loadTask
        }}>
            {children}
        </TasksContext.Provider>
    )
};

export const useTasksContext = () => {
    return useContext(TasksContext)
};