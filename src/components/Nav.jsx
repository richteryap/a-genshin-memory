import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Nav.css';

const Nav = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.reload(); 
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="nav-body">
            <div className='nav-content'>
                <a href="/#home">Home</a>
                <a href="/#titles">Titles</a>
                <a href="/#travels">Travels</a>
                <a href="/contact">Contact</a>
            </div>
            <div className='admin-auth'>
                {user ? (
                    <button className="auth-btn" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <a href="/admin-login" className="auth-link">
                        Login
                    </a>
                )}
            </div>
        </div>
    );
}

export default Nav;