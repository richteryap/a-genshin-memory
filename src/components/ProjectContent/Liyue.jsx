import './Liyue.css';

const Liyue = ({ isEditing }) => {
    const handleSave = () => {
        console.log("Saving data...");
    };

    return (
        <div className="liyue-container">
            <div className="liyue-content">
                <div className="liyue-image">
                    < img src="https://static.wikia.nocookie.net/gensin-impact/images/0/0b/Item_Mondstadt_City_Icon.png/revision/latest?cb=20210121163452" alt="Liyue Icon" />
                </div>
                <div className="liyue-text">
                    <h1>Liyue</h1>
                    {isEditing ? (
                        <div className="edit-wrapper">
                            <textarea className="edit-description" defaultValue=""/>
                            <button className="save-btn" onClick={handleSave}>
                                <i className="fas fa-save"></i> Save
                            </button>
                        </div>
                    ) : ( 
                        <p>Liyue Content Coming Soon!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Liyue;