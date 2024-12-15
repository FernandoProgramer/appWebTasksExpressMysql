import axios from "axios"

export const registerUser = async (user) => {
    return await axios.post('http://localhost:4000/api/v1/register', user);
}

export const userAuthentication = async (data) => {
    return await axios.post('http://localhost:4000/api/v1/login', data, {
        withCredentials: true
    });
}
