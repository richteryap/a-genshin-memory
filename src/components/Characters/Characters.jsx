import React from 'react';
import charactersData from '../../utils/characters.json';
import { getTravelerElement } from '../../utils/genshinUtils.js';
import './Characters.css';

const Characters = ({ playerData, avatarList, equipmentList, onCharacterClick }) => {
  if (!avatarList || avatarList.length === 0) return null;

  return (
    <div className="characters-container glass-card" style={{ backgroundImage: playerData.resolvedNamecardUrl ? `linear-gradient(to top, rgba(15, 15, 15, 1), rgba(15, 15, 15, 0.7)), url('${playerData.resolvedNamecardUrl}')` : 'var(--bg-color)' }}>
      <h2>Characters</h2>
      <div className="characters-grid">
        {avatarList.map((avatar, index) => {
          const charInfo = charactersData[avatar.avatarId];
          if (!charInfo) return null;

          const detailedCharacter = equipmentList?.find(c => c.avatarId === avatar.avatarId);

          const iconPath = charInfo.SideIconName.replace('_Side', '');
          const imageUrl = `https://enka.network${iconPath}`;
          
          const is5Star = charInfo.QualityType === "QUALITY_ORANGE" || charInfo.QualityType === "QUALITY_ORANGE_SP";
          const borderClass = is5Star ? "border-5star" : "border-4star";

          // Check if it's the Traveler and apply the true element
          const isTraveler = charInfo.SideIconName.includes('PlayerBoy') || charInfo.SideIconName.includes('PlayerGirl');

          // Grab the ID from either the detailed list OR the basic list
          const travelerSkillId = detailedCharacter?.skillDepotId || avatar.skillDepotId;
          const trueElement = (isTraveler && travelerSkillId) 
            ? getTravelerElement(travelerSkillId) 
            : charInfo.Element;

          const elementClass = `element-${trueElement}`;

          return (
            <div key={index} className={`character-card ${borderClass} ${elementClass}`} onClick={() => onCharacterClick(detailedCharacter || avatar)}>
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