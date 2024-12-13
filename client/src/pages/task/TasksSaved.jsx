import { Form, Formik } from 'formik'
import { createTask } from '../../api/tasks.api'
import { ButtonForm } from '../../components/ui/ButtonForm';
import { LabelForm } from '../../components/ui/LabelForm';
import { InputField } from '../../components/ui/InputField';
export const TasksSaved = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-scree mb-11">
                <div className="w-full max-w-md p-6 bg-white border-2 border-indigo-600 shadow-lg rounded-lg">
                    <Formik
                        initialValues={{
                            title: '',
                            description: ''
                        }}

                        onSubmit={async (values) => {
                            try {
                                const response = await createTask(values);
                                console.log(response);
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <>
                                <Form>
                                    <div>
                                        <LabelForm idName='title' >
                                            Titulo
                                        </LabelForm>
                                        <InputField
                                            name='title'
                                            placeholder='Guardar la basura'
                                        />
                                    </div>
                                    <div>
                                        <LabelForm idName='description' >
                                            Titulo
                                        </LabelForm>
                                        <InputField
                                            as='textarea'
                                            name='description'
                                            placeholder='Sacar la basura a las 2 de la tarde, antes de que llege el camion de basura'
                                        />
                                    </div>

                                    <ButtonForm isSubmitting={isSubmitting}>
                                        Guardar Tarea
                                    </ButtonForm>
                                </Form>
                            </>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
