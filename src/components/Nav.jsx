import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Nav.css';

const Nav = () => {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsMenuOpen(false);
            window.location.reload(); 
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="nav-body">
            <button className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
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