import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/'; 

export const register = async (registerData) => {
    try {
        const response = await axios.post(`${API_URL}register`, registerData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw { errors: error.response.data };
        }
        throw error;
    }
};

export const login = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}authentication`, loginData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw { errors: error.response.data };
        }
        throw error;
    }
};
