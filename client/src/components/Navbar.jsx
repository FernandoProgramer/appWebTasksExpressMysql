import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <>
            <h1>React MySQL ExpressJs</h1>

            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/newTask'}>Crear tarea</Link>
                </li>
                <li>
                    <Link to={'/register'}>Registrarme</Link>
                </li>
            </ul>

        </>
    )
}
