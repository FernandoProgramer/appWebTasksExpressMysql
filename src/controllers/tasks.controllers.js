import moment from "moment"
import pool from "../database.js"
import { search_matches_by_table_name } from "../functions/search_matches.tasks.js"
import { validate_roles } from "../functions/validate.roles.js"
import { messages_system } from "../messages/error.message.js"

// Mostrar todas las tareas del sistema
export const controller_show_task = async (req, res) => {

    const isValidate = validate_roles(res, [2, 3], req.user.id_rol)
    if (isValidate) return

    try {
        const [response] = await pool.query(
            `
            SELECT
                t.id as id_task,
                t.id_user as id_user,
                u.username as username_user,
                u.email as email_user,
                t.title_task,
                t.description_task,
                t.creation_date,
                t.update_date,
                (SELECT COUNT(*) FROM tasks WHERE id_user = t.id_user) AS count_tasks
            FROM
                tasks t
                INNER JOIN users u ON t.id_user = u.id
            ORDER BY
                creation_date DESC;
            `
        )

        const result = response.reduce((acc, task) => {
            const userId = task.id_user

            // Si el usuario ya existe en el acumulador, agregamos la tarea
            if (!acc[userId]) {
                acc[userId] = {
                    id: userId,
                    name: task.username_user,
                    email: task.email_user,
                    tasks: [],
                    total_tasks: task.count_tasks
                }
            }

            // Agregar la tarea al usuario correspondiente
            acc[userId].tasks.push({
                id_task: task.id_task,
                title: task.title_task,
                description: task.description_task
            })

            return acc
        }, {})

        // Convertir el objeto acumulado en un array
        const finalResult = Object.values(result)

        res.status(200).json(finalResult)
    } catch (error) {

    }
}

// Registrar nueva tarea
export const controller_saved_task = async (req, res) => {
    const { title_task, description_task } = req.body;
    const id_user = req.user.id;

    const isValidate = validate_roles(res, [1, 2, 3], req.user.id_rol);
    if (isValidate) return;

    try {

        const [response] = await pool.query('INSERT INTO tasks (id_user, title_task, description_task) VALUES (?,?,?)',
            [
                id_user,
                title_task,
                description_task
            ])

        if (response.affectedRows === 0) {
            res.status(500).json({
                error: "No se logro crear la tarea"
            })
        }

        res.status(201).json({
            messague: "Tarea creada con exito",
            newTask: {
                id: response.insertId,
                associated_user_id: id_user,
                title_task,
                description_task
            }
        })

    } catch {
        res.status(500).json({ error: messages_system[500] })
    }
}

export const controller_show_my_tasks = async (req, res) => {
    const id_user = req.user.id;

    const isValidate = validate_roles(res, [1, 2, 3], req.user.id_rol);
    if (isValidate) return;

    try {

        const count_matches = await search_matches_by_table_name('users', 'id', id_user)
        if (count_matches === 0) {
            return res.status(404).json({
                error: `Usuario no encontrado por id - ${id}`
            })
        }

        const sql = `
        SELECT
            t.id as id_task,
            t.id_user as id_user,
            u.username as username_user,
            u.email as email_user,
            t.title_task,
            t.description_task,
            t.creation_date,
            t.update_date,
            (SELECT COUNT(*) FROM tasks WHERE id_user = t.id_user) AS count_tasks
        FROM
            tasks t
        INNER JOIN users u ON t.id_user = u.id
        WHERE
            u.id = ?
        ORDER BY creation_date DESC;
    `

        const [response] = await pool.query(sql, [id_user])
        if (response.length === 0) {

            return res
                .status(200)
                .json(response)
        }

        response.forEach(task => {
            task.creation_date = moment(task.creation_date).format('YYYY-MM-DD HH:mm:ss')   // Formato personalizable
            task.update_date = moment(task.update_date).format('YYYY-MM-DD HH:mm:ss')
        })

        const user = {
            id: id_user,
            username: response[0].username_user,
            email: response[0].email_user
        }

        const tasks = response.map((task2) => ({
            id_task: task2.id_task,
            title: task2.title_task,
            description_task: task2.description_task,
            creation_date: task2.creation_date,
            update_date: task2.update_date
        }))

        res.status(200).json({
            user,
            tasks,
            total_tasks: response[0].count_tasks
        })

    } catch {
        res.status(500).json({ error: messages_system[500] })
    }
}



export const controller_patch_task = async (req, res) => {
    const { title_task, description_task } = req.body;
    const { id } = req.params;
    const id_user = req.user.id;

    const isValidate = validate_roles(res, [1, 2, 3], req.user.id_rol);
    if (isValidate) return;

    try {

        const [[{ c_t_u }]] = await pool.query('SELECT COUNT(*) AS c_t_u FROM tasks WHERE id = ? AND id_user = ?;',
            [id, id_user])
        if (c_t_u === 0) {
            return res
                .status(401)
                .json({
                    error: messages_system[401]
                });
        }

        const count_matches = await search_matches_by_table_name('tasks', 'id', id)
        if (count_matches === 0) {
            return res.status(404).json({
                error: `Tarea no encontrada por id - ${id}`
            })
        }

        const [rows] = await pool.query(
            `
            UPDATE
                tasks
            SET
                title_task = IFNULL(?, title_task),
                description_task = IFNULL(?, title_task)
            WHERE
                id = ? AND id_user = ?;
            `
            ,
            [title_task, description_task, id, id_user])

        if (rows.affectedRows === 0) {
            return res.status(500).json({
                error: "No se logro actualizar la tarea"
            })
        }

        const [[tasks]] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id])

        res.status(200).json({
            messague: "Se actulizo la terea",
            newData: tasks
        })

    } catch {
        res.status(500).json({ error: messages_system[500] })

    }
}


export const controller_delete_task = async (req, res) => {
    const { id } = req.params
    const isValidate = validate_roles(res, [1, 2, 3], req.user.id_rol)
    if (isValidate) return

    try {

        const [[{ c_t_u }]] = await pool.query('SELECT COUNT(*) AS c_t_u FROM tasks WHERE id = ? AND id_user = ?;',
            [id, req.user.id])

        if (c_t_u === 0) {
            return res
                .status(401)
                .json({
                    error: messages_system[401]
                });
        }

        const count_matches = await search_matches_by_table_name('tasks', 'id', id)
        if (count_matches === 0) {
            return res.status(404).json({
                error: `Tarea no encontrada por id - ${id}`
            })
        }

        const [rows] = await pool.query(`DELETE FROM tasks WHERE id = ?`, [id])

        if (rows.affectedRows === 0) {
            return res.status(500).json({
                error: "No se logro borrar la tarea"
            })
        }

        res.status(204)

    } catch {
        res.status(500).json({ error: messages_system[500] });
    }
}


export const controller_change_state_task = async (req, res) => {
    const { id } = req.params
    const id_user = req.user.id;
    const role_user = req.user.id_rol;

    const isValidate = validate_roles(res, [1, 2, 3], role_user)
    if (isValidate) return


    try {
        const count_matches = await search_matches_by_table_name('tasks', 'id', id)
        if (count_matches === 0) {
            return res.status(404).json({
                error: `Tarea no encontrada por id - ${id}`
            })
        }

        const [[{ c_t_u }]] = await pool.query('SELECT COUNT(*) AS c_t_u FROM tasks WHERE id = ? AND id_user = ?;',
            [id, id_user])

        if (c_t_u === 0) {
            return res
                .status(401)
                .json({
                    error: messages_system[401]
                });
        }

        const [[task]] = await pool.query('SELECT * FROM tasks WHERE id = ? AND id_user = ?', [id, id_user])
        const newState = task.isCompleted == 0 ? 1 : 0;
        const [response] = await pool.query(
            `
            UPDATE
                tasks
            SET
                isCompleted = ?
            WHERE
                id = ?
                AND id_user = ?;
            `, [newState, id, id_user]);

        if (response.affectedRows === 0) {
            return res.status(500).json({
                error: "No se logro cambiar el estado de la tarea"
            })
        }

        const [[tasks]] = await pool.query('SELECT * FROM tasks WHERE id = ? AND id_user = ?;', [id, id_user])

        res.status(200).json({
            message: "Estado actualizado correctamnete",
            task_updated: tasks
        })

    } catch {
        res.status(500).json({ error: messages_system[500] });
    }
}