import { useState } from 'react';
import './Liyue.css';

const Liyue = ({ isEditing }) => {
    const [description, setDescription] = useState(
        "Liyue Content Coming Soon!"
    );

    const [tempDescription, setTempDescription] = useState("");

    const [isEditingThis, setIsEditingThis] = useState(false);

    const startEditing = () => {
        setTempDescription(description);
        setIsEditingThis(true);
    };

    const handleCancel = () => {
        setIsEditingThis(false);
    };

    const handleSave = () => {
        setDescription(tempDescription);
        setIsEditingThis(false);
    };

    return (
        <div className="liyue-container">
            <div className="liyue-content">
                <div className="liyue-image">
                    < img src="https://static.wikia.nocookie.net/gensin-impact/images/0/0b/Item_Mondstadt_City_Icon.png/revision/latest?cb=20210121163452" alt="Liyue Icon" />
                </div>
                <div className="liyue-text">
                    <h1>Liyue</h1>
                    {isEditingThis ? (
                        <div className="edit-wrapper">
                            <textarea className="edit-description" value={tempDescription} onChange={(e) => setTempDescription(e.target.value)}/>
                            <div className="edit-actions">
                                <button className="btn-cancel" onClick={handleCancel}>
                                    Cancel
                                </button>
                                <button className="btn-save" onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="view-wrapper">
                            <p>{description}</p>
                            {isEditing && (
                                <button className="btn-edit" onClick={startEditing}>
                                    <i className="fas fa-pencil-alt"></i> Edit
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Liyue;