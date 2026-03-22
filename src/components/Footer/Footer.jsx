import { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <a href="">Characters</a>
                <a href="">Equipment</a>
                <a href="">Mobs</a>
                <a href="">Books</a>
            </div>
        </div>
    );
}

export default Footer;