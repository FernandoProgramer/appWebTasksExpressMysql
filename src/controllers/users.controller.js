import pool from "../database.js"

// Controlador para CREAR usuarios
// export const controller_create_user = async (req, res) => {
//     const { username, email, password } = req.body
// }


// Controlador para VER usuarios
export const controller_show_users = async (req, res) => {
    const { id_rol } = req.user
    const ROLES_PERMITIDOS = [2, 3]

    if (!ROLES_PERMITIDOS.includes(id_rol)) {
        return res.status(403).json({
            error: 'No autorizado para acceder a este recurso.',
        });
    }
    try {
        const [response] = await pool.query('SELECT * FROM users ORDER BY id DESC;')
        res.status(200).json(response)
    } catch (error) {
        console.error('Error al traer lo usuarios', error)
        res.status(500).json({
            error: 'Error interno del servidor. Intente nuevamente más tarde.',
        });
    }
}

// Controlador para ACTUALIZAR usuarios
export const controller_update_users = async (req, res) => {
    const { username, email, password, id_rol } = req.body
    const { id } = req.params

    if (id_rol) {
        if (id_rol != 1 && id_rol != 2 && id_rol != 3) {
            return res.status(400).json({
                error: "El codigo de rol no es valido",
                code_roles: [
                    {
                        id: 1,
                        name: "INVITADO"
                    },
                    {
                        id: 2,
                        name: "ADMINISTRADOR"
                    },
                    {
                        id: 1,
                        name: "SUPERADMINISTRADOR"
                    },
                ]
            })
        }
    }

    try {
        const [response] = await pool.query(`
            UPDATE
                users
            SET
                username = IFNULL (?, username),
                email = IFNULL(?, email),
                password = IFNULL(?, password),
                id_rol = IFNULL(?, id_rol)
            WHERE
                id = ? 
            `, [username, email, password, id_rol, id])

        if (response.affectedRows === 0) {
            return res.status(404).json({
                error: `No se encontro el id: ${id}`
            })
        }

        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id])

        return res.status(200).json({
            message: "Usuario actualizado",
            data_user: user[0]
        })

    } catch (error) {
        console.error('Ocurrio algun error al actualizar el usuarios', error)
        res.status(500).json({
            error: 'Error interno del servidor. Intente nuevamente más tarde.',
        });
    }

}

// Cambiar estado actividad de un usuario
export const controller_update_status_active = async (req, res) => {
    const { id } = req.params

    try {
        const [[current_status]] = await pool.query('SELECT isActive FROM users WHERE id = ? ', [id])

        if (!current_status) {
            return res.status(404).json({
                error: `Usuario no encontrado por id: ${id}`
            })
        }
        const newState = current_status.isActive === 1 ? 0 : 1
        const [rows] = await pool.query('UPDATE users SET isActive = ? WHERE id = ? ', [newState, id])

        if (rows.affectedRows === 0) {
            return res.status(500).json({
                error: 'No se pudo actualizar el estado del usuario.',
            })
        }

        const [[user]] = await pool.query(
            'SELECT username, email, isActive FROM users WHERE id = ? ',
            [id]
        )
        res.status(200).json({
            message: "El estado se ha actualizado correctamente",
            details: {
                username: user.username,
                email: user.email,
                newState: user.isActive
            }
        })

    } catch (error) {
        console.error('Ocurrio un error al intentar cambiar el estado de actividad de un usuario', error)
        res.status(500).json({
            error: 'Error interno del servidor. Intente nuevamente más tarde.',
        });
    }
}