import React, { useState } from 'react';
import { register } from '../../services/serviceAuth/authService';

const Register = () => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); 

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

            const response = await register(registerData);
            alert('Registration successful');
            localStorage.setItem('token', response.data.jwt);
            setName('');
            setDateOfBirth('');
            setPhoneNumber('');
            setEmail('');
            setPassword('');
            setErrors({}); 
        } catch (error) {
            const validationErrors = error.response.data.errors;
            console.log(validationErrors);
            if (error.response && error.response.status === 400) {
                setErrors(validationErrors);
            } else {
                alert('Registration failed: ' + error.message);
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <div>
                    <input 
                        type="date" 
                        value={dateOfBirth} 
                        onChange={(e) => setDateOfBirth(e.target.value)} 
                    />
                    {errors.dateOfBirth && <p style={{ color: 'red' }}>{errors.dateOfBirth}</p>}
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                    {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
                </div>
                <div>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
                <div>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
