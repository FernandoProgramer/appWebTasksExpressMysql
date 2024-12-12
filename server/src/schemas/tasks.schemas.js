import Joi from "joi";

export const create_task = Joi.object({
    title_task: Joi.string().required().messages({
        "string.empty": "El título no puede estar vacío.",
        "any.required": "El título es requerido."
    }),
    description_task: Joi.string().allow("").optional().messages({
        "string.base": "La descripción debe ser un texto."
    })
});

