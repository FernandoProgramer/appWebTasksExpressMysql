import { Router } from 'express'
import { controller_show_users, controller_update_status_active, controller_update_users } from '../controllers/users.controller.js'
import { validate_token } from '../middlewares/validate.JWT.js'

const router = Router()

router.get('/show/all', validate_token, controller_show_users) // Obtener registros - GET
router.patch('/update/:id', validate_token, controller_update_users) // ACTUALIZAR REGISTRO - PATCH - UPDATE
router.patch('/update_status_active/:id', controller_update_status_active) // ACTUALZIAR ESTADO DE ACTIVIDAD - "DELETE"

export default router   