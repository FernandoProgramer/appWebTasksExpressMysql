import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'El correo electrónico no tiene un formato válido.',
        'any.required': 'El correo electrónico es obligatorio.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'La contraseña debe tener al menos 6 caracteres.',
        'any.required': 'La contraseña es obligatoria.',
    }),
})