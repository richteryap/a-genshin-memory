import React from 'react';
import charactersData from '../../utils/characters.json';
import './Characters.css';

const Characters = ({ playerData, avatarList }) => {
  if (!avatarList || avatarList.length === 0) return null;

  return (
    <div className="characters-container glass-card" style={{ backgroundImage: playerData.resolvedNamecardUrl ? `linear-gradient(to top, rgba(15, 15, 15, 1), rgba(15, 15, 15, 0.7)), url('${playerData.resolvedNamecardUrl}')` : 'var(--bg-color)' }}>
      <h2>Characters</h2>
      <div className="characters-grid">
        {avatarList.map((avatar, index) => {
          const charInfo = charactersData[avatar.avatarId];
          if (!charInfo) return null;

          const iconPath = charInfo.SideIconName.replace('_Side', '');
          const imageUrl = `https://enka.network${iconPath}`;
          
          const is5Star = charInfo.QualityType === "QUALITY_ORANGE" || charInfo.QualityType === "QUALITY_ORANGE_SP";
          const borderClass = is5Star ? "border-5star" : "border-4star";

          const elementClass = `element-${charInfo.Element}`;

          return (
            <div key={index} className={`character-card ${borderClass} ${elementClass}`}>
              <img src={imageUrl} alt="Character Portrait" />
              <div className="level-badge">Lv. {avatar.level}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;