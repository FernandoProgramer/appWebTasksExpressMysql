import { MdDelete } from "react-icons/md";
import { useTasksContext } from "../contexts/Tasks.context";
import { CiEdit } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom'

export const TaskCard = ({ task }) => {
    const navigate = useNavigate()

    const { deleteTask, updateIsComplet } = useTasksContext()
    const styleButtonToggle = task.isCompleted == 0
        ? {
            container: 'relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-red-500 group-hover:to-yellow-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800',
            span: 'relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'
        }
        : {
            container: 'relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-400 group-hover:to-lime-400 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800',
            span: 'relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'
        };


    return (
        <>
            <div
                key={task.id_task}
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow 
                            dark:bg-gray-800 dark:border-gray-700"
            >
                {/* Título */}
                <h1 className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${task.isCompleted === 1 ? 'line-through ' : ''}`}>
                    {task.title}
                </h1>

                {/* Descripción */}
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {task.description_task}
                </p>

                {/* Botones de acciones */}

                {/* ESTADO DE COMPLETADO */}
                <div className="actions flex gap-4">
                    <button
                        onClick={() => updateIsComplet(task.id_task)}
                        className={styleButtonToggle.container}
                    >
                        <span className={styleButtonToggle.span}>
                            {task.isCompleted === 0 ? <RxCrossCircled /> : <FaCircleCheck />}

                        </span>
                    </button>

                    {/* BORRAR */}
                    <button
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => deleteTask(task.id_task)}
                    >
                        <MdDelete size={18} />
                    </button>

                    {/* ACTUALIZAR */}
                    <button
                        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => navigate(`/editTask/${task.id_task}`)}
                    >
                        <CiEdit size={18} />
                    </button>
                </div>
            </div>
        </>
    )
}
