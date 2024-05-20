import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css'; 

const Login_Admin_Guest = () => {
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">وارد شوید</h2>
                <div className="button-group">
                    <Link to="/LogInAdmin" className="login-button">ورود ادمین</Link>
                    <Link to="/LogInGuest" className="login-button">ورود مستاجرین</Link>
                </div>
            </div>
        </div>
    );
};

export default Login_Admin_Guest;
