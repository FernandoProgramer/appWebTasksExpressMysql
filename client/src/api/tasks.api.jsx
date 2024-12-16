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

export const deleteTaskRequest = async (id) => {
    return await axios.delete(`http://localhost:4000/api/v1/tasks/delete/${id}`, {
        withCredentials: true
    });
}

export const showTaskById = async (id) => {
    return await axios.get(`http://localhost:4000/api/v1/tasks/show/task/${id}`, {
        withCredentials: true
    })
}

export const updateTaskRequest = async (newData, id) => {
    return await axios.patch(`http://localhost:4000/api/v1/tasks/update/${id}`, newData, {
        withCredentials: true
    })
}