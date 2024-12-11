import pool from "../database.js"

export const search_matches = async (id) => {
    try {
        const [[{ matches }]] = await pool.query('SELECT COUNT(*) AS matches FROM tasks WHERE id_user = ?;', [id])
        return matches || 0
    } catch (error) {

    }
}

export const search_matches_by_table_name = async (table_name, identifier_name, id) => {
    try {
        const [[{ matches }]] = await pool.query(`SELECT COUNT(*) AS matches FROM ${table_name} WHERE ${identifier_name} = ?;`, [id])
        return matches || 0
    } catch (error) {

    }
}