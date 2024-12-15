import axios from 'axios'

export const createTask = async (newTask) => {
    return await axios.post('http://localhost:4000/api/v1/tasks/create', newTask, {
        withCredentials: true
    });
}
export const showAllTasks = async () => {
    return await axios.get('http://localhost:4000/api/v1/tasks/show/myTasks', {
        withCredentials: true
    });
}