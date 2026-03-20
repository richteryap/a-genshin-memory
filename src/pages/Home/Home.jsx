import { useState } from 'react';
import { useGenshinProfile } from '../../hooks/useGenshinProfile.js'
import { useFavorites } from '../../hooks/useFavorites.js';
import Profiles from '../../components/Profiles/Profiles.jsx';
import Characters from '../../components/Characters/Characters.jsx';
import Namecards from '../../components/Namecards/Namecards.jsx';
import CharacterModal from '../../components/CharacterModal/CharacterModal.jsx';
import './Home.css';

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [targetUid, setTargetUid] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const { playerData, loading, error } = useGenshinProfile(targetUid);

  const { 
    sortedAccounts, 
    isCurrentFavorite, 
    saveCurrentAccount, 
    toggleFavorite, 
    deleteSavedAccount 
  } = useFavorites(targetUid, playerData);

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanInput = searchInput.trim();
    
    if (cleanInput.length > 0 && cleanInput.length <= 10) {
      setTargetUid(cleanInput);
    } else {
      alert("Please enter a valid Genshin Impact UID.");
    }
  };

  console.log("Player Data:", playerData);

  return (
    <div className="home-container">
      <form className="search-bar-container" onSubmit={handleSearch}>
        <input type="number" placeholder="Enter UID..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="uid-input"/>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="saved-accounts-container">
        {playerData && (
          <button onClick={saveCurrentAccount} className="save-btn">
            Save Account
          </button>
        )}
        <div className="favorites-list">
          {sortedAccounts.map((acc) => (
            <div key={acc.uid} className="favorite-badge" onClick={() => setTargetUid(acc.uid)}>
              <img src={acc.avatar || 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy.png'} alt="avatar" />
              <span style={{ color: acc.isFavorite ? '#ffd700' : 'inherit' }}>
                {acc.nickname}
              </span>
              <button className="delete-badge-btn" onClick={(e) => deleteSavedAccount(e, acc.uid)} title="Remove from history">
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      {loading && <div className="status-message glass-card">Loading...</div>}
      {error && <div className="status-message glass-card">Error: {error}</div>}
      {!loading && !error && playerData && (
        <>
          <section id="profiles">
            <Profiles playerData={playerData} isCurrentFavorite={isCurrentFavorite} toggleFavorite={toggleFavorite} />
          </section>
          <div className="showcases">
            <section id="characters">
              <Characters playerData={playerData} avatarList={playerData.showAvatarInfoList} equipmentList={playerData.equipmentList} onCharacterClick={setSelectedCharacter} />
            </section>
            <section id="namecards">
              <Namecards playerData={playerData} namecardList={playerData.showNameCardIdList} />
            </section>
          </div>
          {selectedCharacter && (
            <CharacterModal 
              character={selectedCharacter} 
              onClose={() => setSelectedCharacter(null)} 
            />
          )}
        </>
      )}
    </div>
  );
}

export default Home;