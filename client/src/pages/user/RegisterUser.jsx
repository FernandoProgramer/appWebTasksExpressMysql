import { Formik, Form } from 'formik'
import { registerUser } from '../../api/users.api.jsx'
export const RegisterUser = () => {
    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    // confirm_email: '',
                    // confirm_password: '',
                }}

                onSubmit={async (values) => {
                    // const { confirm_email, confirm_password, ...CopyValues } = values;
                    // const response = await registerUser(CopyValues);
                    const response = await registerUser(values);
                    console.log('respuestadelservidor', response);
                }}

            >
                {({ handleChange, handleSubmit }) => (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <label>
                                Nombre de usuario
                            </label>
                            <input
                                type="text"
                                name='username'
                                onChange={handleChange}
                            />

                            <label>
                                Correo electronico
                            </label>
                            <input
                                type="text"
                                name='email'
                                onChange={handleChange}

                            />
                            {/* <label>
                                Confirmar correo electronico
                            </label>
                            <input
                                type="text"
                                name='confirm_email'
                                onChange={handleChange}
                            /> */}

                            <label>
                                Contraseña
                            </label>
                            <input
                                type="text"
                                name='password'
                                onChange={handleChange}

                            />

                            {/* <label>
                                Confirmar Contraseña
                            </label>
                            <input
                                type="text"
                                name='confirm_password'
                                onChange={handleChange}
                            /> */}

                            <button type='submit'>
                                Registrar
                            </button>
                        </Form>
                    </>
                )}
            </Formik >
        </>
    )
}
