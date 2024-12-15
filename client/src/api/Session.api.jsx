import axios from 'axios'

export const SessionExp = async () => {
    return await axios.get('http://localhost:4000/api/v1/tasks/show/myTasks', {
        withCredentials: true
    })
}
