import './Mondstadt.css';

const Mondstadt = ({ isEditing }) => {
    return (
        <div className="mondstadt-container">
            <div className="mondstadt-content">
                <div className="mondstadt-image">
                    < img src="https://static.wikia.nocookie.net/gensin-impact/images/0/0b/Item_Mondstadt_City_Icon.png/revision/latest?cb=20210121163452" alt="Mondstadt Icon" />
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