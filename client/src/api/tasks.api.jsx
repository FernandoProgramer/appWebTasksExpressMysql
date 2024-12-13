import axios from 'axios'

export const createTask = async (newTask) => {
    return await axios.post('http://localhost:4000/api/v1/tasks/create', newTask);
}