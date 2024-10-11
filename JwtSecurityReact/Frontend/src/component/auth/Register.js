import React, { useState } from 'react';
import { register } from '../../services/serviceAuth/authService';
import './Register.css';

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
            localStorage.setItem('token', response.jwt);
            setName('');
            setDateOfBirth('');
            setPhoneNumber('');
            setEmail('');
            setPassword('');
            setErrors({});
        } catch (error) {
            if (error.errors) {
                console.log(error.errors);
                setErrors(error.errors); 
            } else {
                alert('Registration failed: ' + error.message); 
            }
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <input 
                    type="date" 
                    value={dateOfBirth} 
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
                {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}

                <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

                <input 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
