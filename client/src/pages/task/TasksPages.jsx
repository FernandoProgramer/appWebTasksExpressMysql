import { useEffect } from "react"
import { useTasksContext } from "../../contexts/Tasks.context";
import { Pagination } from "../../components/Pagination";
import { TaskCard } from "../../components/TaskCard";

export const TasksPages = () => {

    const { loadTasks, tasks } = useTasksContext();
    useEffect(() => {
        loadTasks()
    }, [])

    return (
        <>
            <div className="mt-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-11">
                {/* Verificación de tareas */}
                {tasks.length >= 1 ? (
                    tasks.map((task) => (
                        <TaskCard key={task.id_task} task={task} /> // Key se usa aquí.
                    ))
                ) : (
                    // Mensaje cuando no hay tareas
                    <div className="text-gray-500 dark:text-gray-400 text-center">
                        No hay nada, rey.
                    </div>
                )}
            </div>
        </>
    )
}
