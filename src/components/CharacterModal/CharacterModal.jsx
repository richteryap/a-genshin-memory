import React from 'react';
import charactersData from '../../utils/characters.json';
import './CharacterModal.css';

const CharacterModal = ({ character, onClose }) => {
  if (!character) return null;

  const charInfo = charactersData[character.avatarId];
  if (!charInfo) return null;

  const internalName = charInfo.SideIconName.replace('/ui/UI_AvatarIcon_Side_', '').replace('.png', '');
  
  const splashArtUrl = (internalName === 'PlayerBoy' || internalName === 'PlayerGirl')
    ? `https://enka.network/ui/UI_AvatarIcon_${internalName}.png`
    : `https://enka.network/ui/UI_Gacha_AvatarImg_${internalName}.png`;

  const weapon = character.equipList?.find(equip => equip.flat.itemType === "ITEM_WEAPON");
  const artifacts = character.equipList?.filter(equip => equip.flat.itemType === "ITEM_RELIQUARY") || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div 
          className="modal-background" 
          style={{ backgroundImage: `url(${splashArtUrl})` }}
        />
        <div className="modal-ui">
          <button className="close-modal-btn" onClick={onClose}>&times;</button>
          
          <div className="modal-header">
            <h1>{internalName}</h1>
            <span className="char-level-badge">
              Lv. {character.propMap?.[4001]?.val || character.level || "Unknown"}
            </span>
          </div>

          <div className="equipment-showcase">

            {!character.equipList && (
              <div className="hidden-details-warning">
                <p>This player has hidden their character details in-game.</p>
              </div>
            )}

            {/* Render Weapon */}
            {weapon && (
              <div className="equipment-section">
                <h3>Weapon</h3>
                <div className={`equip-card rarity-${weapon.flat.rankLevel}`}>
                  <img src={`https://enka.network/ui/${weapon.flat.icon}.png`} alt="Weapon" />
                  <div className="equip-stats">
                    <span className="equip-level">Lv. {weapon.weapon.level}</span>
                    <span className="refinement">R{weapon.weapon.affixMap ? Object.values(weapon.weapon.affixMap)[0] + 1 : 1}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Render Artifacts */}
            {artifacts.length > 0 && (
              <div className="equipment-section">
                <h3>Artifacts</h3>
                <div className="artifacts-row">
                  {artifacts.map((art, i) => (
                    <div key={i} className={`equip-card rarity-${art.flat.rankLevel}`}>
                      <img src={`https://enka.network/ui/${art.flat.icon}.png`} alt="Artifact" />
                      <div className="equip-stats">
                        <span className="equip-level">+{art.reliquary.level - 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;