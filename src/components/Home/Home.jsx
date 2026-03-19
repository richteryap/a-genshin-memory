import React, { useState, useEffect } from 'react';
import { useGenshinProfile } from '../../hooks/useGenshinProfile'
import { useFavorites } from '../../hooks/useFavorites';
import { ABYSS_STARS, THEATER_ACTS } from '../../utils/constants';
import './Home.css';

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [targetUid, setTargetUid] = useState("");

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
      {loading && <div className="status-message glass-card">Loading Teyvat data...</div>}
      {error && <div className="status-message glass-card">Error: {error}</div>}
      {!loading && !error && playerData && (
        <div className="home-content split-layout glass-card" style={{ backgroundImage: playerData.resolvedNamecardUrl ? `linear-gradient(to right, rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 0.6)), url('${playerData.resolvedNamecardUrl}')` : 'var(--bg-color)' }}>
          <button className={`favorite-star-toggle ${isCurrentFavorite ? 'active' : ''}`} onClick={toggleFavorite} title={isCurrentFavorite ? "Remove from Favorites" : "Add to Favorites"}>
            {isCurrentFavorite ? '★' : '☆'}
          </button>
          <div className="layout-left">
            <h1>{playerData.nickname}</h1>
            <p className="signature"><em>"{playerData.signature || "No signature set."}"</em></p>
            <div className="stats-box left-side">
              <p><strong>Adventure Rank:</strong> {playerData.level}</p>
              <p><strong>World Level:</strong> {playerData.worldLevel}</p>
              <p><strong>Achievements:</strong> {playerData.finishAchievementNum}</p>
              <p><strong>Maximum Friendship Count:</strong> {playerData.fetterCount}</p>
            </div>
          </div>
          <img className="profile-avatar" src={playerData.resolvedAvatarUrl} alt={`${playerData.nickname}'s Profile`} onError={(e) => { e.target.src = 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy.png' }}/>
          <div className="layout-right">
            <h1>Endgames</h1>
            <p className="signature" style={{ color: 'transparent', userSelect: 'none' }}>Spacer</p>
            <div className="stats-box right-side">
              {playerData.towerFloorIndex !== undefined && (
                <p>
                  <strong>Spiral Abyss:</strong>
                  <img src={ABYSS_STARS} alt="Abyss Stars" />
                  <strong>{playerData.towerStarIndex || 0}</strong>
                </p>
              )}
              {playerData.theaterActIndex !== undefined && (
                <p>
                  <strong>Imaginarium Theater:</strong>
                  <img src={THEATER_ACTS} alt="Theater Acts"/>
                  <strong>{playerData.theaterStarIndex}/{playerData.theaterActIndex}</strong>
                </p>
              )}
              {playerData.stygianSeconds !== undefined && (
                <p>
                  <strong>Stygian Onslaught:</strong>
                  <img src={`https://enka.network/ui/UI_LeyLineChallenge_Medal_${playerData.stygianIndex}.png`} alt={`Difficulty Tier ${playerData.stygianIndex}`}/>
                  <strong>{playerData.stygianSeconds}s</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;