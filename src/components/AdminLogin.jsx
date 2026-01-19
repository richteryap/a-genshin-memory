import { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
    };

    return (
        <div className='login-container'>
            <div className='login-content'>
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className='login-input'>
                        <input type='email' className='email-input' required placeholder=' ' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <label>Email</label>
                    </div>
                    <div className='login-input'>
                        <input type='password' className='password-input' required placeholder=' ' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <label>Password</label>
                    </div>
                    <button type='submit' className='login-botton'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin;