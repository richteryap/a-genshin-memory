import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
    return (
        <div className="projects-body" id="projects">
            <h2>My Travels</h2>
            <div className="project-list">
                <Link to="/teyvat#mondstadt" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h3>Mondstadt</h3>
                        <p>Project One Content</p>
                    </div>
                </Link>
                <Link to="/teyvat#liyue" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h3>Liyue</h3>
                        <p>Project Two Content</p>
                    </div>
                </Link>
                <Link to="/teyvat#inazuma" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h3>Inazuma</h3>
                        <p>Project Three Content</p>
                    </div>
                </Link>
                <Link to="/teyvat#sumeru" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h3>Sumeru</h3>
                        <p>Project Four Content</p>
                    </div>
                </Link>
                <Link to="/teyvat#fontaine" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h3>Fontaine</h3>
                        <p>Project Five Content</p>
                    </div>
                </Link>
                <Link to="/teyvat#natlan" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h3>Natlan</h3>
                        <p>Project Six Content</p>
                    </div>
                </Link>
                <Link to="/teyvat#snezhnaya" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h3>Snezhnaya</h3>
                        <p>Project Seven Content</p>
                    </div>
                </Link>
            </div> 
        </div>
    );
}

export default Projects;