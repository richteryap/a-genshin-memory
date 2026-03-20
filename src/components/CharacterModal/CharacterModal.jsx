import React, { useEffect } from 'react';
import charactersData from '../../utils/characters.json';
import masterLocales from '../../utils/locales.json';
import './CharacterModal.css';

const locales = masterLocales.en;

const getStatName = (propId) => {
  const map = {
    FIGHT_PROP_HP: "HP", FIGHT_PROP_HP_PERCENT: "HP%",
    FIGHT_PROP_ATTACK: "ATK", FIGHT_PROP_ATTACK_PERCENT: "ATK%",
    FIGHT_PROP_DEFENSE: "DEF", FIGHT_PROP_DEFENSE_PERCENT: "DEF%",
    FIGHT_PROP_CRITICAL: "CRIT Rate", FIGHT_PROP_CRITICAL_HURT: "CRIT DMG",
    FIGHT_PROP_CHARGE_EFFICIENCY: "Energy Recharge", FIGHT_PROP_ELEMENT_MASTERY: "Elemental Mastery",
    FIGHT_PROP_HEAL_ADD: "Healing Bonus", FIGHT_PROP_PHYSICAL_ADD_HURT: "Physical DMG",
    FIGHT_PROP_FIRE_ADD_HURT: "Pyro DMG", FIGHT_PROP_ELEC_ADD_HURT: "Electro DMG",
    FIGHT_PROP_WATER_ADD_HURT: "Hydro DMG", FIGHT_PROP_GRASS_ADD_HURT: "Dendro DMG",
    FIGHT_PROP_WIND_ADD_HURT: "Anemo DMG", FIGHT_PROP_ROCK_ADD_HURT: "Geo DMG", FIGHT_PROP_ICE_ADD_HURT: "Cryo DMG"
  };
  return map[propId] || propId;
};

const formatStat = (propId, value) => {
  if (!propId) return value;
  if (propId.includes("PERCENT") || propId.includes("CRITICAL") || propId.includes("CHARGE_EFFICIENCY") || propId.includes("ADD_HURT")) {
    return `${value}%`;
  }
  return Math.round(value).toLocaleString(); // Adds commas to big numbers!
};

const CharacterModal = ({ character, onClose }) => {
  if (!character) return null;

  const charInfo = charactersData[character.avatarId];
  if (!charInfo) return null;

  const internalName = charInfo.SideIconName.replace('/ui/UI_AvatarIcon_Side_', '').replace('.png', '');
  const splashArtUrl = (internalName === 'PlayerBoy' || internalName === 'PlayerGirl')
    ? `https://enka.network/ui/UI_AvatarIcon_${internalName}.png`
    : `https://enka.network/ui/UI_Gacha_AvatarImg_${internalName}.png`;

  const namecardUrl = (internalName === 'PlayerBoy' || internalName === 'PlayerGirl')
    ? null
    : `https://enka.network/ui/UI_NameCardPic_${internalName}_P.png`;

  const weapon = character.equipList?.find(equip => equip.flat.itemType === "ITEM_WEAPON");
  const artifacts = character.equipList?.filter(equip => equip.flat.itemType === "ITEM_RELIQUARY") || [];

  const setCounts = {};
  artifacts.forEach(art => {
    const setHash = art.flat.setNameTextMapHash;
    if (setHash) {
      setCounts[setHash] = (setCounts[setHash] || 0) + 1;
    }
  });

  const activeSets = [];
  Object.entries(setCounts).forEach(([hash, count]) => {
    if (count >= 4) activeSets.push({ name: locales[hash] || "Loading...", count: 4 });
    else if (count >= 2) activeSets.push({ name: locales[hash] || "Loading...", count: 2 });
  });

  let setText = "";
  if (activeSets.length === 1 && activeSets[0].count === 4) {
    setText = `${activeSets[0].name} (4)`;
  } else if (activeSets.length >= 2) {
    setText = `${activeSets[0].name} (2) / ${activeSets[1].name} (2)`;
  } else if (activeSets.length === 1 && activeSets[0].count === 2) {
    setText = `${activeSets[0].name} (2)`;
  }

  const dmgProperties = {
    30: "Physical DMG Bonus",
    40: "Pyro DMG Bonus",
    41: "Electro DMG Bonus",
    42: "Hydro DMG Bonus",
    43: "Dendro DMG Bonus",
    44: "Anemo DMG Bonus",
    45: "Geo DMG Bonus",
    46: "Cryo DMG Bonus"
  };

  // Calculate Highest DMG Bonus
  let highestDmg = { label: "DMG Bonus", value: 0 };
  Object.keys(dmgProperties).forEach(id => {
    const val = character.fightPropMap[id] || 0;
    if (val > highestDmg.value) {
      highestDmg = { label: dmgProperties[id], value: val };
    }
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-background" style={{ backgroundImage: `url(${namecardUrl})` }}/>
        <div className="modal-background-image" style={{ backgroundImage: `url(${splashArtUrl})` }}/>
        <div className="modal-ui">
          <div className="modal-body">
            <button className="close-modal-btn" onClick={onClose}>&times;</button>
            <div className="modal-left">
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
                    <h3>{locales[weapon.flat.nameTextMapHash] || "Loading Weapon..."}</h3>
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
                    <div className="artifacts-header">
                      <h3>Artifacts</h3>
                      {setText && <span className="set-bonus-text">{setText}</span>}
                    </div>
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
            <div className="modal-right">
              <div className="detail-panel stats-panel glass-panel">
                <div className="stat-row">
                  <span className="stat-label">Max HP</span>
                  <span className="stat-val">{Math.round(character.fightPropMap[2000]).toLocaleString()}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">ATK</span>
                  <span className="stat-val">{Math.round(character.fightPropMap[2001]).toLocaleString()}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">DEF</span>
                  <span className="stat-val">{Math.round(character.fightPropMap[2002]).toLocaleString()}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Elemental Mastery</span>
                  <span className="stat-val">{Math.round(character.fightPropMap[28])}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">CRIT Rate</span>
                  <span className="stat-val">{(character.fightPropMap[20] * 100).toFixed(1)}%</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">CRIT DMG</span>
                  <span className="stat-val">{(character.fightPropMap[22] * 100).toFixed(1)}%</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Energy Recharge</span>
                  <span className="stat-val">{(character.fightPropMap[23] * 100).toFixed(1)}%</span>
                </div>
                {highestDmg.value > 0 && (
                  <div className="stat-row">
                    <span className="stat-label">{highestDmg.label}</span> 
                    <span className="stat-val">{(highestDmg.value * 100).toFixed(1)}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;