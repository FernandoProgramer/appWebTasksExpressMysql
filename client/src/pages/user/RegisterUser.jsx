import { Formik, Form, ErrorMessage } from 'formik'
import { registerUser } from '../../api/users.api.jsx'
import { InputField } from '../../components/ui/InputField.jsx';
import { registerUserSchema } from '../../schemas/User.schema.jsx';
import { LabelForm } from '../../components/ui/LabelForm.jsx';
import { ButtonForm } from '../../components/ui/ButtonForm.jsx';
import { validateRegisterUserSchema } from '../../schemas/validateSchemas/UserRegister.schema.jsx';
import { AlertError } from '../../components/ui/Alerts.jsx';
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'

export const RegisterUser = () => {
    const nav = useNavigate();
    return (
        <>
            <div className="flex items-center justify-center min-h-scree mb-11">
                <div className="w-full max-w-md p-6 bg-white border-2 border-indigo-600 shadow-lg rounded-lg">
                    <Formik
                        initialValues={registerUserSchema}

                        validationSchema={validateRegisterUserSchema}

                        onSubmit={async (values, action) => {
                            const { confirm_email, confirm_password, ...CopyValues } = values;
                            try {
                                const { status } = await registerUser(CopyValues);
                                if (status === 201) {
                                    action.resetForm();
                                    toast.success('¡Registrado exitosamente!', {
                                        style: { border: "1px solid black" },
                                        action:
                                            <button
                                                style={{
                                                    padding: '0.5em 1em',
                                                    backgroundColor: 'rgb(79, 70, 229)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold'
                                                }}
                                                onClick={() => nav('/')}
                                            >
                                                Iniciar Sesión
                                            </button>
                                    });

                                }
                            } catch {
                                console.error('Error del cliente');
                            }
                        }}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form className="space-y-6">
                                <h2 className="text-center text-2xl font-bold text-gray-900">
                                    Registro de Usuario
                                </h2>

                                <div>
                                    <LabelForm
                                        idName="username">Nombre de usuario
                                    </LabelForm>
                                    <InputField name="username" placeholder="JhonDoe12!" />
                                    <span>
                                        <ErrorMessage name='username' component={() => (<> <AlertError>
                                            {errors.username}
                                        </AlertError> </>)} />
                                    </span>
                                </div>

                                <div>
                                    <LabelForm idName="email">Correo electrónico</LabelForm>
                                    <InputField name="email" placeholder="correo@example.com" />
                                    <span>
                                        <ErrorMessage name='email' component={() => (<> <AlertError>
                                            {errors.email}
                                        </AlertError> </>)} />
                                    </span>
                                </div>

                                <div>
                                    <LabelForm idName="confirm_email">
                                        Confirmar correo electrónico
                                    </LabelForm>
                                    <InputField
                                        name="confirm_email"
                                        placeholder="correo@example.com"
                                    />
                                    <span>
                                        <ErrorMessage name='confirm_email' component={() => (<> <AlertError>
                                            {errors.confirm_email}
                                        </AlertError> </>)} />
                                    </span>
                                </div>

                                <div>
                                    <LabelForm idName="password">Contraseña</LabelForm>
                                    <InputField
                                        name="password"
                                        type="password"
                                        placeholder="********"
                                    />
                                    <span>
                                        <ErrorMessage name='password' component={() => (<> <AlertError>
                                            {errors.password}
                                        </AlertError> </>)} />
                                    </span>
                                </div>

                                <div>
                                    <LabelForm idName="confirm_password">
                                        Confirmar contraseña
                                    </LabelForm>
                                    <InputField
                                        name="confirm_password"
                                        type="password"
                                        placeholder="********"
                                    />
                                    <span>
                                        <ErrorMessage name='confirm_password' component={() => (<> <AlertError>
                                            {errors.confirm_password}
                                        </AlertError> </>)} />
                                    </span>
                                </div>

                                <ButtonForm
                                    isSubmitting={isSubmitting}>
                                    Registrar
                                </ButtonForm>
                            </Form>
                        )}
                    </Formik>
                </div>
                <Toaster />
            </div>
        </>
    )
}
