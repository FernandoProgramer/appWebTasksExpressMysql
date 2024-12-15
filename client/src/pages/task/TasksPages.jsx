import { useEffect } from "react"
import { useTasksContext } from "../../contexts/Tasks.context";

export const TasksPages = () => {

    const { loadTasks, tasks } = useTasksContext();
    useEffect(() => {
        loadTasks()
    }, [])

    return (
        <>
            <div className=" mt-auto space-y-4"> {/* Espaciado vertical entre los divs */}
                {tasks.length >= 1 ? (
                    tasks.map((task) => (
                        <div
                            key={task.id_task}
                            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        >
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {task.title}
                            </h1>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {task.description_task}
                            </p>
                            <button
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {task.isCompleted === 0 ? '❌' : '✔'}
                            </button>
                        </div>
                    ))
                ) : (
                    <div>
                        No hay nada, rey.
                    </div>
                )}
            </div>
        </>
    )
}
