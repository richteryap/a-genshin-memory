import { Link } from 'react-router-dom';
import './Travels.css';

const Travels = () => {
    return (
        <div className="travels-body" id="travels">
            <h2>My Travels</h2>
            <div className="travel-list">
                <Link to="/teyvat#mondstadt" style={{ textDecoration: 'none' }}>
                    <div className="travel-item">
                        <h1>Mondstadt</h1>
                    </div>
                </Link>
                <Link to="/teyvat#liyue" style={{ textDecoration: 'none' }}>
                    <div className="travel-item">
                        <h1>Liyue</h1>
                    </div>
                </Link>
                <Link to="/teyvat#inazuma" style={{ textDecoration: 'none' }}>
                    <div className="travel-item">
                        <h1>Inazuma</h1>
                    </div>
                </Link>
                <Link to="/teyvat#sumeru" style={{ textDecoration: 'none' }}>
                    <div className="travel-item">
                        <h1>Sumeru</h1>
                    </div>
                </Link>
                <Link to="/teyvat#fontaine" style={{ textDecoration: 'none' }}>
                    <div className="travel-item">
                        <h1>Fontaine</h1>
                    </div>
                </Link>
                <Link to="/teyvat#natlan" style={{ textDecoration: 'none' }}>
                    <div className="travel-item">
                        <h1>Natlan</h1>
                    </div>
                </Link>
                <Link to="/teyvat#nod-krai" style={{ textDecoration: 'none' }}>
                    <div className="travel-item">
                        <h1>Nod-Krai</h1>
                    </div>
                </Link>
            </div> 
        </div>
    );
}

export default Travels;