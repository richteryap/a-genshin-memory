import React from 'react';
import { useGenshinProfile } from '../../hooks/useGenshinProfile';
import './Home.css';

const Home = () => {
  const targetUid = "893213154";
  const { playerData, loading, error } = useGenshinProfile(targetUid);

  if (loading) return <div className="home-container">Loading Teyvat data...</div>;
  if (error) return <div className="home-container">Error: {error}</div>;
  if (!playerData) return null;

  return (
    <div className="home-container" style={{ backgroundImage: playerData.resolvedNamecardUrl ? `linear-gradient(to right, rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 0.6)), url('${playerData.resolvedNamecardUrl}')` : 'var(--bg-color)' }}>
      <div className="home-content split-layout glass-card">
        
        <div className="layout-left">
          <h1>{playerData.nickname}</h1>
          <p className="signature"><em>"{playerData.signature || "No signature set."}"</em></p>
          <div className="stats-box">
            <p><strong>Adventure Rank:</strong> {playerData.level}</p>
            <p><strong>World Level:</strong> {playerData.worldLevel}</p>
            <p><strong>Achievements:</strong> {playerData.finishAchievementNum}</p>
          </div>
        </div>

        <div className="layout-center home-image">
          <img className="profile-avatar" src={playerData.resolvedAvatarUrl} alt={`${playerData.nickname}'s Profile`} onError={(e) => { e.target.src = 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy.png' }}/>
        </div>

        <div className="layout-right">
          <h1>Endgame</h1>
          <p className="signature" style={{ color: 'transparent', userSelect: 'none' }}>Spacer</p>
          <div className="stats-box">
            {playerData.towerFloorIndex !== undefined && (
              <p><strong>Spiral Abyss:</strong> Floor {playerData.towerFloorIndex}-{playerData.towerLevelIndex} ({playerData.towerStarIndex || 0}☆)</p>
            )}
            
            {playerData.theaterActIndex !== undefined && (
              <p><strong>Imaginarium Theater:</strong> Act {playerData.theaterActIndex}</p>
            )}
            
            {playerData.stygianSeconds !== undefined && (
              <p><strong>Stygian Onslaught:</strong> {playerData.stygianSeconds}s</p>
            )}
          </div>
        </div>

      </div> 
    </div>
  );
}

export default Home;