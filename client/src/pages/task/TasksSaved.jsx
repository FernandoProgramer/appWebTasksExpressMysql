import { ErrorMessage, Form, Formik } from 'formik'
import { ButtonForm } from '../../components/ui/ButtonForm';
import { LabelForm } from '../../components/ui/LabelForm';
import { InputField } from '../../components/ui/InputField';
import { savedTask } from '../../schemas/Task.schema';
import { useTasksContext } from '../../contexts/Tasks.context';
import { toast, Toaster } from 'sonner';
import { schemaSavedTask } from '../../schemas/validateSchemas/TasksSaved.schema';
import { AlertError } from '../../components/ui/Alerts';
import { Links } from '../../components/ui/Links';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const TasksSaved = () => {
    const { createTasks, loadTask, updateTask } = useTasksContext()
    const [schemaTask, setSchemaTask] = useState(savedTask)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchApi = async () => {
            if (id) {
                const task = await loadTask(id)
                setSchemaTask({
                    title_task: task.title_task,
                    description_task: task.description_task
                })
            }
        }

        fetchApi();
    }, [id])

    return (
        <>
            <div className="flex items-center justify-center min-h-scree mb-11">
                <div className="w-full max-w-md p-6 bg-white border-2 border-indigo-600 shadow-lg rounded-lg">

                    <h1
                        className='text-xl font-bold my-4'
                    >{id ? 'ACTUALIZAR' : 'REGISTRAR'} TAREA</h1>

                    <Formik
                        initialValues={schemaTask}
                        enableReinitialize={true}

                        validationSchema={schemaSavedTask}

                        onSubmit={async (values, action) => {
                            const statusResponse = id ? await updateTask(values, id) : await createTasks(values)
                            if (statusResponse === 201) {
                                action.resetForm();
                                toast.success(`Tarea Registrada Correctamente`, {
                                    style: { border: "1px solid black" },
                                    action:
                                        <Links destination='/'>
                                            Ver tarea
                                        </Links>
                                });

                            }

                            if (id && statusResponse === 200) {
                                navigate('/');
                            }
                        }}
                    >
                        {({ isSubmitting, errors }) => (
                            <>
                                <Form className="space-y-6">
                                    <div>
                                        <LabelForm idName='title_task'>
                                            Titulo
                                        </LabelForm>
                                        <InputField
                                            name='title_task'
                                            placeholder='Guardar la basura'
                                        />
                                        <span>
                                            <ErrorMessage name='title_task' component={() => (<> <AlertError>
                                                {errors.title_task}
                                            </AlertError> </>)} />
                                        </span>
                                    </div>
                                    <div>
                                        <LabelForm idName='description_task'>
                                            Descripción (opcional)
                                        </LabelForm>
                                        <InputField
                                            as='textarea'
                                            name='description_task'
                                            placeholder='Sacar la basura a las 2 de la tarde, antes de que llege el camion de basura'
                                        />
                                        <span>
                                            <ErrorMessage name='description_task' component={() => (<> <AlertError>
                                                {errors.description_task}
                                            </AlertError> </>)} />
                                        </span>
                                    </div>

                                    <ButtonForm isSubmitting={isSubmitting}>
                                        {id ? 'Actualizar' : 'Guardar'} Tarea
                                    </ButtonForm>
                                </Form>
                            </>
                        )}
                    </Formik>
                </div>
                <Toaster />
            </div>
        </>
    )
}
