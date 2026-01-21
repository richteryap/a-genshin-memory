import { useState } from 'react';
import './Fontaine.css';

const Fontaine = ({ isEditing }) => {
    const [description, setDescription] = useState(
        "Fontaine Content Coming Soon!"
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
        <div className="fontaine-container">
            <div className="fontaine-content">
                <div className="fontaine-image"></div>
                <div className="fontaine-text">
                    <h1>Fontaine</h1>
                    {isEditingThis ? (
                        <div className="edit-wrapper">
                            <textarea className="edit-description" placeholder="description" value={tempDescription} onChange={(e) => setTempDescription(e.target.value)}/>
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

export default Fontaine;