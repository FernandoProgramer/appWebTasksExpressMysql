import { Router } from 'express'
import { controller_login, controller_register } from '../controllers/auth.controller.js'
import validate from '../middlewares/validate.joi.js'
import { loginSchema } from '../schemas/login.schema.js'
import { registerSchema } from '../schemas/register.schema.js'

const router = Router()

router.post('/register', validate(registerSchema), controller_register)
router.post('/login', validate(loginSchema), controller_login)

export default router