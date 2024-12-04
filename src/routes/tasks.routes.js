import { Router } from "express"
import { controller_delete_task, controller_patch_task, controller_saved_task, controller_show_my_tasks, controller_show_task } from "../controllers/tasks.controllers.js"

const router = Router()

router.get('/show/all', controller_show_task) // Obtener registros - GET
router.get('/show/myTasks/:id', controller_show_my_tasks) // Obtener registro por id - GET
router.post('/create', controller_saved_task) // CREAR REGISTRO - POST
router.patch('/update/:id',controller_patch_task) // ACTUALIZAR REGISTRO - PATCH - UPDATE

router.delete('/delete/:id',controller_delete_task) // ACTUALIZAR REGISTRO - PATCH - UPDATE


export default router