import React, { useState } from 'react';
import { login } from '../../services/serviceAuth/authService';
import './Login.css'; 

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

            localStorage.setItem('token', response.jwt);
            
            alert('Login successful!');
            setPhoneNumber('');
            setPassword('');
            setErrors({}); 

        } catch (error) {
            if (error.errors) {
                console.log(error.errors.errors.auth); 
                setErrors(prevErrors => ({
                    ...prevErrors,
                    ...error.errors,
                    auth: error.errors.errors.auth 
                }));
            } else {
                alert('Registration failed: ' + error.message); 
            }
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                {errors.password && <p className="error">{errors.password}</p>}
                {errors.auth && <p className="error">{errors.auth}</p>}
                
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
