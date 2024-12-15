import { ErrorMessage, Form, Formik } from 'formik'
import { ButtonForm } from '../../components/ui/ButtonForm';
import { LabelForm } from '../../components/ui/LabelForm';
import { InputField } from '../../components/ui/InputField';
import { savedTask } from '../../schemas/Task.schema';
import { useTasksContext } from '../../contexts/Tasks.context';
import { toast, Toaster } from 'sonner';
import { schemaSavedTask } from '../../schemas/validateSchemas/TasksSaved.schema';
import { AlertError } from '../../components/ui/Alerts';

export const TasksSaved = () => {
    const { createTasks } = useTasksContext()
    return (
        <>
            <div className="flex items-center justify-center min-h-scree mb-11">
                <div className="w-full max-w-md p-6 bg-white border-2 border-indigo-600 shadow-lg rounded-lg">
                    <Formik
                        initialValues={savedTask}

                        validationSchema={schemaSavedTask}

                        onSubmit={async (values, action) => {
                            const statusResponse = await createTasks(values)
                            if (statusResponse === 201) {
                                action.resetForm();
                                toast.success('Tarea registrada correctamente', {
                                    style: { border: "1px solid black" }
                                });
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
                                            Titulo
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
                                        Guardar Tarea
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
