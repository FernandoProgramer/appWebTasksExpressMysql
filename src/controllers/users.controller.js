import pool from "../database.js"
import { validate_roles } from "../functions/validate.roles.js";

// Controlador para VER usuarios
export const controller_show_users = async (req, res) => {
    // Inicializacion de variables y toda esa vuelta
    const id_rol_user = req.user.id_rol;

    const isValidate = validate_roles(res, [1, 2, 3], id_rol_user);
    if (isValidate) return isValidate;

    try {

        let query = 'SELECT * FROM users';

        if (id_rol_user === 1) {
            query += ' WHERE id_rol != 2 AND id_rol != 3';
        } else if (id_rol_user === 2) {
            query += ' WHERE id_rol != 3';
        }

        query += ' ORDER BY id DESC';

        const [response] = await pool.query(query); res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor. Intente nuevamente más tarde.',
        });
    }
}

// Controlador para ACTUALIZAR usuarios
export const controller_update_users = async (req, res) => {
    const { username, email, password, id_rol } = req.body
    const { id } = req.params
    const id_rol_user = req.user.id_rol;
    const allowed_roles = {
        1: [1], // Invitado solo puede asignar invitado
        2: [1, 2], // Admin puede asignar admin e invitado
        3: [1, 2, 3] // Superusuario puede asignar super, admin e invitado
    };

    validate_roles(res, [1, 2, 3], id_rol_user)


    if (id_rol) {
        if (!allowed_roles[id_rol_user]?.includes(id_rol)) {
            return res.status(401).json({ error: "Rol no permitido o código de rol desconocido" });
        }
    }

    try {
        const [response] = await pool.query(`
    UPDATE
    users
    SET
    username = IFNULL(?, username),
        email = IFNULL(?, email),
        password = IFNULL(?, password),
        id_rol = IFNULL(?, id_rol)
    WHERE
    id = ?
        `, [username, email, password, id_rol, id])

        if (response.affectedRows === 0) {
            return res.status(404).json({
                error: `No se encontro el id: ${id} `
            })
        }

        const [[user]] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
        return res.status(200).json({
            message: "Usuario actualizado",
            data_user: {
                id: user.id,
                username: user.username,
                email: user.email,
                isActive: user.isActive,
                id_rol: user.id_rol
            }
        })

    } catch (error) {
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
                error: `Usuario no encontrado por id: ${id} `
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
        res.status(500).json({
            error: 'Error interno del servidor. Intente nuevamente más tarde.',
        });
    }
}