import { Router } from "express"
import { controller_change_state_task, controller_delete_task, controller_patch_task, controller_saved_task, controller_show_my_tasks, controller_show_task, controller_show_task_by_id } from "../controllers/tasks.controllers.js"
import { validate_token } from "../middlewares/validate.JWT.js"
import validate from "../middlewares/validate.joi.js"
import { create_task } from "../schemas/tasks.schemas.js"

const router = Router()

router.get('/show/all', validate_token, controller_show_task)
router.get('/show/myTasks', validate_token, controller_show_my_tasks)
router.get('/show/task/:id', validate_token, controller_show_task_by_id)

router.post('/create', validate_token, validate(create_task), controller_saved_task)

router.patch('/update/:id', validate_token, controller_patch_task)
router.patch('/update/isCompleted/:id', validate_token, controller_change_state_task)

router.delete('/delete/:id', validate_token, controller_delete_task)


export default router