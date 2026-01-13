import './Mondstadt.css';

const Mondstadt = ({ isEditing }) => {
    return (
        <div className="mondstadt-container">
            <div className="mondstadt-content">
                <div className="mondstadt-image">
                </div>
                <div className="mondstadt-text">
                    <h1>Mondstadt</h1>
                    {isEditing ? ( <textarea className="edit-description" defaultValue=""/>
                    ) : ( <p>Mondstadt Content Coming Soon!</p> )}
                </div>
            </div>
        </div>
    );
}

export default Mondstadt;