import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
    return (
        <div className="projects-body" id="projects">
            <h2>My Travels</h2>
            <div className="project-list">
                <Link to="/teyvat#mondstadt" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h1>Mondstadt</h1>
                    </div>
                </Link>
                <Link to="/teyvat#liyue" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h1>Liyue</h1>
                    </div>
                </Link>
                <Link to="/teyvat#inazuma" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h1>Inazuma</h1>
                    </div>
                </Link>
                <Link to="/teyvat#sumeru" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h1>Sumeru</h1>
                    </div>
                </Link>
                <Link to="/teyvat#fontaine" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h1>Fontaine</h1>
                    </div>
                </Link>
                <Link to="/teyvat#natlan" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h1>Natlan</h1>
                    </div>
                </Link>
                <Link to="/teyvat#nod-krai" style={{ textDecoration: 'none' }}>
                    <div className="project-item">
                        <h1>Nod-krai</h1>
                    </div>
                </Link>
            </div> 
        </div>
    );
}

export default Projects;