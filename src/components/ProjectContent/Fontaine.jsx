import './Fontaine.css';

const Fontaine = ({ isEditing }) => {
    const handleSave = () => {
        console.log("Saving data...");
    };

    return (
        <div className="fontaine-container">
            <div className="fontaine-content">
                <div className="fontaine-image">
                    < img src="https://static.wikia.nocookie.net/gensin-impact/images/0/0b/Item_Mondstadt_City_Icon.png/revision/latest?cb=20210121163452" alt="Fontaine Icon" />
                </div>
                <div className="fontaine-text">
                    <h1>Fontaine</h1>
                    {isEditing ? (
                        <div className="edit-wrapper">
                            <textarea className="edit-description" defaultValue=""/>
                            <button className="save-btn" onClick={handleSave}>
                                <i className="fas fa-save"></i> Save
                            </button>
                        </div>
                    ) : ( 
                        <p>Fontaine Content Coming Soon!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Fontaine;