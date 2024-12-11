import { Router } from "express"
import { controller_change_state_task, controller_delete_task, controller_patch_task, controller_saved_task, controller_show_my_tasks, controller_show_task } from "../controllers/tasks.controllers.js"
import { validate_token } from "../middlewares/validate.JWT.js"

const router = Router()

router.get('/show/all', validate_token, controller_show_task) // Obtener registros - GET
router.get('/show/myTasks', validate_token, controller_show_my_tasks) // Obtener registro por id - GET

router.post('/create', validate_token, controller_saved_task) // CREAR REGISTRO - POST

router.patch('/update/:id', validate_token, controller_patch_task) // ACTUALIZAR REGISTRO - PATCH - UPDATE
router.patch('/update/isCompleted/:id', validate_token, controller_change_state_task)

router.delete('/delete/:id', validate_token, controller_delete_task) // ACTUALIZAR REGISTRO - PATCH - UPDATE


export default router