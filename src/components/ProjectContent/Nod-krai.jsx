import './Nod-krai.css';

const Nod_krai = ({ isEditing }) => {
    const handleSave = () => {
        console.log("Saving data...");
    };

    return (
        <div className="nod-krai-container">
            <div className="nod-krai-content">
                <div className="nod-krai-image">
                    < img src="https://static.wikia.nocookie.net/gensin-impact/images/0/0b/Item_Mondstadt_City_Icon.png/revision/latest?cb=20210121163452" alt="Nod-krai Icon" />
                </div>
                <div className="nod-krai-text">
                    <h1>Nod-krai</h1>
                    {isEditing ? (
                        <div className="edit-wrapper">
                            <textarea className="edit-description" defaultValue=""/>
                            <button className="save-btn" onClick={handleSave}>
                                <i className="fas fa-save"></i> Save
                            </button>
                        </div>
                    ) : ( 
                        <p>Nod-krai Content Coming Soon!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Nod_krai;