import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('El correo electrónico no es válido')
        .required('El correo electrónico es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('La confirmación de la contraseña es obligatoria')
});

export default validationSchema;
