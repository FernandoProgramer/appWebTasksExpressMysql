import { Formik, Form, ErrorMessage } from 'formik'
import { LabelForm } from '../../components/ui/LabelForm.jsx'
import { InputField } from '../../components/ui/InputField.jsx'
import { ButtonForm } from '../../components/ui/ButtonForm.jsx'
import { loginUserSchema } from '../../schemas/User.schema.jsx'
import { AlertError } from '../../components/ui/Alerts.jsx'
import { Links } from '../../components/ui/Links.jsx'
import { userAuthentication } from '../../api/users.api.jsx'
import validationSchema from '../../schemas/validateSchemas/UserLogin.schame.jsx'
import { useNavigate } from 'react-router-dom'

export const LoginUser = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex items-center justify-center min-h-scree mb-11">
                <div className="w-full max-w-md p-6 bg-white border-2 border-indigo-600 shadow-lg rounded-lg">
                    <Formik
                        initialValues={loginUserSchema}

                        validationSchema={validationSchema}

                        onSubmit={async (values, action) => {
                            const { confirm_password, ...copyValues } = values
                            try {
                                const { status } = await userAuthentication(copyValues)
                                if (status === 200) {
                                    action.resetForm();
                                    navigate('/');
                                }

                            } catch { }
                        }}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form className="space-y-6">
                                <h2 className="text-center text-2xl font-bold text-gray-900">
                                    Iniciar Sesión
                                </h2>
                                <div>
                                    <LabelForm
                                        idName="email">Correo Electronico
                                    </LabelForm>
                                    <InputField name="email" placeholder="jhon@correo.com" />
                                    <span>
                                        <ErrorMessage name='email' component={() =>
                                        (<>
                                            <AlertError>
                                                {errors.email}
                                            </AlertError>
                                        </>)} />
                                    </span>
                                </div>
                                <div>
                                    <LabelForm
                                        idName="password">Contraseña
                                    </LabelForm>

                                    <InputField type='password' name="password" placeholder="******" />

                                    <span>
                                        <ErrorMessage name='password' component={() =>
                                        (<>
                                            <AlertError>
                                                {errors.password}
                                            </AlertError>
                                        </>)} />
                                    </span>
                                </div>
                                <div>
                                    <LabelForm
                                        idName="confirm_password">Confirmar Contraseña
                                    </LabelForm>

                                    <InputField type='password' name="confirm_password" placeholder="******" />

                                    <span>
                                        <ErrorMessage name='confirm_password' component={() =>
                                        (<>
                                            <AlertError>
                                                {errors.confirm_password}
                                            </AlertError>
                                        </>)} />
                                    </span>
                                </div>
                                <ButtonForm
                                    isSubmitting={isSubmitting}>
                                    Entrar
                                </ButtonForm>
                            </Form>
                        )}
                    </Formik>
                    <Links destination='/register'>
                        Crear cuenta
                    </Links>
                </div>
            </div>
        </>
    )
}
