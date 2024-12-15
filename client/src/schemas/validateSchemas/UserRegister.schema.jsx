import * as Yup from 'yup';

const validateRegisterUserSchema = Yup.object({
    username: Yup.string()
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
        .required('El nombre de usuario es obligatorio'),

    email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es obligatorio'),

    confirm_email: Yup.string()
        .oneOf([Yup.ref('email'), null], 'Los correos electrónicos deben coincidir')
        .required('Debes confirmar tu correo electrónico'),

    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),

    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Debes confirmar tu contraseña')
});

export default validateRegisterUserSchema;