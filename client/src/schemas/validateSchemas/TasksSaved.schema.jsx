import * as Yup from 'yup';

export const schemaSavedTask = Yup.object().shape({
  title_task: Yup.string()
    .required('El título es obligatorio')
    .min(1, 'El título no puede estar vacío'),
  description_task: Yup.string(),
});
