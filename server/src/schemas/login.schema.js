import Joi from "joi";

export const loginSchema = Joi.object({
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
