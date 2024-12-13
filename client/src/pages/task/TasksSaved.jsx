import { Form, Formik } from 'formik'
import { createTask } from '../../api/tasks.api'
export const TasksSaved = () => {
    return (
        <>
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
                {({ handleChange, handleSubmit }) => (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <label>Titulo</label>
                            <input
                                type="text"
                                name='title'
                                placeholder='Dale un texto a la tarea'
                                onChange={handleChange}
                            />

                            <label>Descripción</label>
                            <textarea
                                name='description'
                                placeholder='Dale una descripción'
                                rows='3'
                                onChange={handleChange}
                            />

                            <button type='submit'>
                                Guardar
                            </button>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    )
}
