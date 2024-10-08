import React, { useState } from 'react';
import { login } from '../../services/serviceAuth/authService';  

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ phoneNumber, password });

            localStorage.setItem('token', response.data.jwt);
            
            alert('Login successful!');

        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
