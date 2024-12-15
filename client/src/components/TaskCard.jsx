import { MdDelete } from "react-icons/md";


export const TaskCard = ({ task }) => {
    return (
        <>
            <div
                key={task.id_task} // key aquí no es necesario si ya lo usas en el map.
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow 
                            dark:bg-gray-800 dark:border-gray-700"
            >
                {/* Título */}
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {task.title}
                </h1>

                {/* Descripción */}
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {task.description_task}
                </p>

                {/* Botones de acciones */}
                <div className="actions flex gap-4">
                    <button
                        className="inline-flex items-center justify-center w-10 h-10 text-base font-medium text-white 
                        bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
                        dark:focus:ring-blue-800"
                    >
                        {task.isCompleted === 0 ? '❌' : '✔'}
                    </button>
                    <button
                        className="inline-flex items-center justify-center w-10 h-10 text-base font-medium text-white 
                    bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none 
                    focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 
                    dark:focus:ring-red-800"
                    >
                        <MdDelete size={18} />
                    </button>
                </div>




            </div>
        </>
    )
}
