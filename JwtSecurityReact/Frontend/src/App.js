import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import DemoComponent from './component/hello/DemoComponent';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/hello" element={<DemoComponent/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
