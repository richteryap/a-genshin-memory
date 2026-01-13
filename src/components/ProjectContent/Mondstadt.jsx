import './Teyvat.css';

const Mondstadt = ({ isEditing }) => {
    const handleSave = () => {
        console.log("Saving data...");
    };

    return (
        <div className="mondstadt-container">
            <div className="mondstadt-content">
                <div className="mondstadt-image">
                    < img src="https://static.wikia.nocookie.net/gensin-impact/images/0/0b/Item_Mondstadt_City_Icon.png/revision/latest?cb=20210121163452" alt="Mondstadt Icon" />
                </div>
                <div className="mondstadt-text">
                    <h1>Mondstadt</h1>
                    {isEditing ? (
                        <div className="edit-wrapper">
                            <textarea className="edit-description" defaultValue=""/>
                            <button className="save-btn" onClick={handleSave}>
                                <i className="fas fa-save"></i> Save
                            </button>
                        </div>
                    ) : ( 
                        <p>Mondstadt Content Coming Soon!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Mondstadt;