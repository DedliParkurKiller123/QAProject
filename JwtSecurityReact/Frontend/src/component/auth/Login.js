import React, { useState } from 'react';
import { login } from '../../services/serviceAuth/authService';  

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = {
                phoneNumber,
                password,
            };
            const response = await login(loginData);

            localStorage.setItem('token', response.data.jwt);
            
            alert('Login successful!');
            setPhoneNumber('');
            setPassword('');
            setErrors({}); 

        } catch (error) {
            const validationErrors = error.response.data.errors;
            console.log(validationErrors);
            if (error.response && error.response.status === 400) {
                setErrors({ auth: validationErrors.auth });
            } else {
                alert('Login failed: ' + error.message);
            }
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
                {errors.auth && <p style={{ color: 'red' }}>{errors.auth}</p>}
                
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
