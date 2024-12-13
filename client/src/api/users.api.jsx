import axios from "axios"

export const registerUser = async (user) => {
    return await axios.post('http://localhost:4000/api/v1/register', user);
}