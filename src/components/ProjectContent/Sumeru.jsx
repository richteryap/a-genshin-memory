import './Sumeru.css';

const Sumeru = ({ isEditing }) => {
    return (
        <div className="sumeru-container">
            <div className="sumeru-content">
                <div className="sumeru-image">
                    < img src="https://static.wikia.nocookie.net/gensin-impact/images/0/0b/Item_Mondstadt_City_Icon.png/revision/latest?cb=20210121163452" alt="Sumeru Icon" />
                </div>
                <div className="sumeru-text">
                    <h1>Sumeru</h1>
                    {isEditing ? ( <textarea className="edit-description" defaultValue=""/>
                    ) : ( <p>Sumeru Content Coming Soon!</p> )}
                </div>
            </div>
        </div>
    );
}

export default Sumeru;