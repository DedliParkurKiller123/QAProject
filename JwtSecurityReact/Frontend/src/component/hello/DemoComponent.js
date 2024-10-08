import React, { useEffect, useState } from 'react';
import { hello } from '../../services/service/service';

const DemoComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            const token = localStorage.getItem('token'); 
            console.log('Token:', token); 
        
            try {
                const response = await hello(token); 

                setMessage(response.data);  // Повідомлення з контролера
            } catch (error) {
                console.error(error); // Лог для перевірки помилок
                if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                    setMessage('Unauthorized - Invalid Token');
                } else {
                    setMessage('Something went wrong');
                }
            }
        };
        
        fetchProtectedData();
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default DemoComponent;
