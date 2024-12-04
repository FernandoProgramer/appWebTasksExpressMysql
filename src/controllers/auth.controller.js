import bcrypt from 'bcryptjs'
import pool from '../database.js'

export const controller_register = async (req, res) => {

    const { username, email, password } = req.body
    const password_hash = await bcrypt.hash(password, 10)

    if (!username || !email || !password) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios'
        })
    }

    try {
        const [response] = await pool.query(
            `INSERT INTO
                users (username, email, password)
            VALUES
                (?, ?, ?) `,
            [username, email, password_hash]
        )

        if (response.affectedRows <= 0) {
            return res.status(500).json({
                error: 'Ocurrio un error inesperado'
            })
        }

        return res.status(201).json({
            message: "Usuario Creado",
            newUser: {
                id: response.insertId,
                username,
                email
            }
        })

    } catch (error) {
        console.error('Error al crear un usuario', error);
        res.status(500).json({
            error: 'Ocurrió un error en el servidor. Por favor, intenta más tarde.',
        });
    }
}


export const controller_login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Consulta para obtener la contraseña hash
        const [rows] = await pool.query('SELECT password FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            // Respuesta genérica para evitar filtrado de usuarios existentes
            return res.status(400).json({
                error: 'Credenciales incorrectas.',
            });
        }

        const password_hash = rows[0].password;

        // Comparar contraseña ingresada con el hash
        const isPasswordValid = await bcrypt.compare(password, password_hash);

        if (!isPasswordValid) {
            return res.status(400).json({
                error: 'Credenciales incorrectas.',
            });
        }

        // Respuesta exitosa
        res.status(200).json({
            message: 'Usuario logueado con éxito.',
        });

    } catch (error) {
        // Manejo de errores
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({
            error: 'Ocurrió un error en el servidor. Por favor, intenta más tarde.',
        });
    }
}