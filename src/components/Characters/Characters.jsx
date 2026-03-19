import React from 'react';
import charactersData from '../../utils/characters.json'; // Adjust path if needed!
import './Characters.css';

const Characters = ({ avatarList }) => {
  // If the user hides their character details in-game, this array will be empty/undefined
  if (!avatarList || avatarList.length === 0) return null;

  return (
    <div className="characters-container glass-card">
      <h2>Showcased Characters</h2>
      <div className="characters-grid">
        {avatarList.map((avatar, index) => {
          // 1. Look up the character in our local database using their ID
          const charInfo = charactersData[avatar.avatarId];
          if (!charInfo) return null; // Skip if we somehow don't have the character

          // 2. Grab the Side Icon and format it to be the high-res square portrait
          const iconPath = charInfo.SideIconName.replace('_Side', '');
          const imageUrl = `https://enka.network${iconPath}`;
          
          // 3. Determine if they are 5-star or 4-star to color-code their background
          const is5Star = charInfo.QualityType === "QUALITY_ORANGE" || charInfo.QualityType === "QUALITY_ORANGE_SP";
          const rarityClass = is5Star ? "star-5" : "star-4";

          return (
            <div key={index} className={`character-card ${rarityClass}`}>
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