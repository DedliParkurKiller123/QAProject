import React, { useState } from 'react';
import { register } from '../../services/serviceAuth/authService';

const Register = () => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const registerData = {
                name,
                dateOfBirth,
                phoneNumber,
                email,
                password,
            };

            const data = await register(registerData);
            
            alert('Registration successful');
            localStorage.setItem('token', data.jwt);
        } catch (error) {
            alert('Registration failed' + error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={dateOfBirth} 
                    onChange={(e) => setDateOfBirth(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
