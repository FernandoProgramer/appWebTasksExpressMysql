import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(5).max(20).required().not('').messages({
        'string.min': 'El nombre de usuario debe tener al menos 5 caracteres.',
        'string.max': 'El nombre de usuario no puede tener más de 20 caracteres.',
        'any.required': 'El nombre de usuario es obligatorio.',
        'string.empty': 'El nombre de usuario no puede estar vacío.'
    }),
    email: Joi.string().email().required().not('').messages({
        'string.email': 'El correo electrónico no tiene un formato válido.',
        'any.required': 'El correo electrónico es obligatorio.',
        'string.empty': 'El correo electrónico no puede estar vacío.'
    }),
    password: Joi.string().min(6).required().not('').messages({
        'string.min': 'La contraseña debe tener al menos 6 caracteres.',
        'any.required': 'La contraseña es obligatoria.',
        'string.empty': 'La contraseña no puede estar vacía.'
    }),
});
