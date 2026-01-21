import { useState, useEffect } from 'react';
import useRegionData from '../PageAssist/useRegionData';
import './Sumeru.css';

const Sumeru = ({ isEditing }) => {
    const { description, saveDescription, isSaving } = useRegionData("sumeru");

    const [tempDescription, setTempDescription] = useState("");
    const [isEditingThis, setIsEditingThis] = useState(false);

    const startEditing = () => {
        setTempDescription(description);
        setIsEditingThis(true);
    };

    const handleCancel = () => {
        setIsEditingThis(false);
    };

    const handleSave = async () => {
        const success = await saveDescription(tempDescription);
        
        if (success) {
            setIsEditingThis(false);
        }
    };

    return (
        <div className="sumeru-container">
            <div className="sumeru-content">
                <div className="sumeru-image"></div>
                <div className="sumeru-text">
                    <h1>Sumeru</h1>
                    {isEditingThis ? (
                        <div className="edit-wrapper">
                            <textarea className="edit-description" placeholder="description" value={tempDescription} onChange={(e) => setTempDescription(e.target.value)}/>
                            <div className="edit-actions">
                                <button className="btn-cancel" onClick={handleCancel} disabled={isSaving}>
                                    Cancel
                                </button>
                                <button className="btn-save" onClick={handleSave} disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Save"}
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

export default Sumeru;