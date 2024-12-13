import bcrypt from 'bcryptjs'
import pool from '../database.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY_JWT } from '../key.js'


export const controller_register = async (req, res) => {
    const { username, email, password } = req.body
    const password_hash = await bcrypt.hash(password, 10)

    try {
        // Validar que no exista el email en la base de datos
        const [[{ match_email }]] = await pool.query('SELECT COUNT(*) as match_email FROM users WHERE email = ?', [email])
        if (match_email >= 1) return res.status(500).json({ message: "Ya existe un usuario creado con ese email" })

        // Validar que no exista el username en la base de datos
        const [[{ match_username }]] = await pool.query('SELECT COUNT(*) as match_username FROM users WHERE username = ?', [username])
        if (match_username >= 1) return res.status(500).json({ message: "Ya existe un usuario creado con ese apodo" })

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
        res.status(500).json({
            error: 'Ocurrió un error en el servidor. Por favor, intenta más tarde.',
        });
    }
}


export const controller_login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Consulta para obtener la contraseña hash
        const [[user]] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (!user) {
            // Respuesta genérica para evitar filtrado de usuarios existentes
            return res.status(400).json({
                error: 'Credenciales incorrectas.',
            });
        }

        const password_hash = user.password;

        // Comparar contraseña ingresada con el hash
        const isPasswordValid = await bcrypt.compare(password, password_hash);

        if (!isPasswordValid) {
            return res.status(400).json({
                error: 'Credenciales incorrectas.',
            });
        }

        const jwt_token = jwt.sign(
            {
                id: user.id,
                email,
                id_rol: user.id_rol,
                isActive: user.isActive,
                username: user.username
            },
            SECRET_KEY_JWT,
            { expiresIn: '1h' }
        )

        // Respuesta exitosa
        res
            .status(200).json({
                message: 'Usuario logueado con éxito.',
                jwt_token
            });

    } catch (error) {
        // Manejo de errores
        res.status(500).json({
            error: 'Ocurrió un error en el servidor. Por favor, intenta más tarde.',
        });
    }
}