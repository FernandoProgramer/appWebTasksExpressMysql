import { Router } from 'express'
import { controller_show_users, controller_update_status_active, controller_update_users } from '../controllers/users.controller.js'

const router = Router()

router.get('/show/all', controller_show_users) // Obtener registros - GET
// router.post('/create', controller_create_user) // CREAR REGISTRO - POST
router.patch('/update/:id', controller_update_users) // ACTUALIZAR REGISTRO - PATCH - UPDATE
router.patch('/update_status_active/:id', controller_update_status_active) // ACTUALZIAR ESTADO DE ACTIVIDAD - "DELETE"

export default router   