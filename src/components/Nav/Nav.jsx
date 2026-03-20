import './Nav.css';

const Nav = () => {
    return (
        <div className="nav-body">
            <button className="hamburger-btn" aria-label="Toggle menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <div className="nav-content">
                <a href="/#profile">Profile</a>
                <a href="/#travels">Travels</a>
                <a href="/contact">Contact</a>
            </div>
        </div>
    );
}

export default Nav;