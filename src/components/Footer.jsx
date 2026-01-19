import { useState, useEffect } from 'react';
import useAutoClose from './PageAssist/useAutoClose';
import './Footer.css';

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.documentElement.classList.contains('dark-mode');
    })

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useAutoClose(isOpen, () => setIsOpen(false), 4000);

    return (
        <div className="footer-container">
            <div className="footer-content">
                <p>© 2026. All rights reserved.</p>
                <div className="settings-dropdown">
                    <button className="setting-button" aria-label="Open Settings" onClick={() => setIsOpen(!isOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.389c-.42.18-.81.406-1.174.673l-1.943-.842a1.875 1.875 0 00-2.382 1.074l-.948 2.45a1.875 1.875 0 00.702 2.227l1.794 1.157a8.553 8.553 0 000 1.744l-1.794 1.157a1.875 1.875 0 00-.702 2.227l.948 2.45c.42 1.086 1.624 1.59 2.382 1.074l1.943-.842c.364.267.754.493 1.174.673l.178 1.572c.15.904.933 1.567 1.85 1.567h2.544c.917 0 1.699-.663 1.85-1.567l.178-1.572c.42-.18.81-.406 1.174-.673l1.943.842a1.875 1.875 0 002.382-1.074l.948-2.45a1.875 1.875 0 00-.702-2.227l-1.794-1.157a8.555 8.555 0 000-1.744l1.794-1.157a1.875 1.875 0 00.702-2.227l-.948-2.45a1.875 1.875 0 00-2.382-1.074l-1.943.842c-.364-.267-.754-.493-1.174-.673l-.178-1.572a1.875 1.875 0 00-1.85-1.567h-2.544zm-2.07 9.75a4.32 4.32 0 118.64 0 4.32 4.32 0 01-8.64 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {isOpen && (
                        <div className="setting-content">
                            <div className="theme-toggle">
                                <span>Theme Mode: </span>
                                <div className="toggle-track">
                                    <input type="checkbox" id="dark-mode-toggle" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)}/>
                                    <label htmlFor="dark-mode-toggle"></label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Footer;