import axios from 'axios';

const API_URL = 'http://localhost:8080/api/demo'; 

export const hello = async (token) => {
    return await axios.get(`${API_URL}/hello`, {
        headers: {
            'Authorization': `Bearer ${token}`, // Додаємо токен до заголовків
        },
    });
};
