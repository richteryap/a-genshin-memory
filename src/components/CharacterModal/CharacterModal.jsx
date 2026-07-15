import React from 'react'; 
import charactersData from '../../utils/characters.json'; 
import masterLocales from '../../utils/locales.json'; 
import { getTravelerElement } from '../../utils/genshinUtils'; 

const locales = masterLocales.en; 

const rarityBorders = {
  5: "border-[#e6b876]",
  4: "border-[#a882d2]",
  3: "border-[#5180cc]",
  2: "border-[#499a6c]",
  1: "border-[#787d85]"
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
    ? `https://enka.network/ui/UI_NameCardPic_Ysxf4_P.png`     
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

  let highestDmg = { label: "DMG Bonus", value: 0 };   
  if (character.fightPropMap) {     
    Object.keys(dmgProperties).forEach(id => {       
      const val = character.fightPropMap[id] || 0;       
      if (val > highestDmg.value) {         
        highestDmg = { label: dmgProperties[id], value: val };       
      }     
    });   
  }

  const isTraveler = internalName === 'PlayerBoy' || internalName === 'PlayerGirl';   
  const trueElement = (isTraveler && character.skillDepotId)      
    ? getTravelerElement(character.skillDepotId)      
    : charInfo.Element;   

  let displayName = internalName;   
  if (internalName === 'PlayerBoy') displayName = 'Aether';   
  if (internalName === 'PlayerGirl') displayName = 'Lumine';   

  const elementDisplayNames = {     
    "Wind": "Anemo", "Rock": "Geo", "Electric": "Electro",      
    "Grass": "Dendro", "Water": "Hydro", "Fire": "Pyro", "Ice": "Cryo"   
  };   

  const travelerElementText = (isTraveler && trueElement !== "None")      
    ? `${elementDisplayNames[trueElement]} `      
    : "";   

  return (     
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-[1px] flex justify-center items-center z-[1000]" onClick={onClose}>       
      <div className="relative w-[90%] max-w-[1200px] h-[80vh] rounded-[20px] bg-[#111] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.8)] border border-white/10" onClick={(e) => e.stopPropagation()}>         
        
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-top opacity-20 z-[1] [mask-image:linear-gradient(to_left,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_left,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)]" 
          style={{ backgroundImage: `url(${namecardUrl})` }}
        />         
        
        <div 
          className={`absolute top-0 left-0 w-full h-full bg-top z-[3] opacity-90 [mask-image:linear-gradient(to_left,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_left,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] ${isTraveler ? 'bg-contain bg-no-repeat bg-center' : 'bg-cover'}`} 
          style={{ backgroundImage: `url(${splashArtUrl})` }}
        />         
        
        <div className="relative z-[5] p-12 w-full h-full flex flex-col text-white">           
          <div className="flex justify-between w-full h-full">             
            <button className="absolute top-[20px] right-[30px] bg-black/50 border border-white/20 text-white text-[2rem] w-[40px] h-[40px] rounded-full cursor-pointer flex justify-center items-center transition-all duration-200 hover:bg-[#ff4d4f]/80 hover:scale-110" onClick={onClose}>&times;</button>             
            
            <div className="flex flex-col h-full max-w-[65%]">               
              <div className="flex items-center gap-[15px] mb-8">                 
                <h1 className="m-0 text-[3.5rem] capitalize drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{travelerElementText} {displayName}</h1>                 
                <span className="bg-black/60 py-[5px] px-[12px] rounded-[20px] border border-white/20 font-bold text-[1.2rem]">                   
                  Lv. {character.propMap?.[4001]?.val || character.level || "Unknown"}                 
                </span>               
              </div>               
              
              <div className="flex flex-col gap-8 mt-auto pb-8">                 
                {!character.equipList && (                   
                  <div className="p-8 bg-red-500/10 border border-dashed border-red-500/30 rounded-[10px] text-[#ff4d4f] text-center font-bold">                     
                    <p>This player has hidden their character details in-game.</p>                   
                  </div>                 
                )}                 
                
                {/* Render Weapon */}                 
                {weapon && (                   
                  <div className="flex flex-col">                     
                    <h3 className="m-0 ml-[5px] mb-[10px] text-[1.2rem] text-white/70 uppercase tracking-[1px]">{locales[weapon.flat.nameTextMapHash] || "Loading Weapon..."}</h3>                     
                    <div className={`relative w-[100px] h-[100px] rounded-[10px] overflow-hidden border-2 shadow-[0_5px_15px_rgba(0,0,0,0.5)] bg-[#141414]/60 ${rarityBorders[weapon.flat.rankLevel] || 'border-white/20'}`}>                       
                      <img className="w-full h-full object-cover scale-110" src={`https://enka.network/ui/${weapon.flat.icon}.png`} alt="Weapon" />                       
                      <div className="absolute bottom-0 left-0 w-full flex justify-end items-center gap-[5px] px-[5px] py-[2px] text-[0.8rem] font-bold">                         
                        <span>Lv. {weapon.weapon.level}</span>                         
                        <span className="text-[#ffd700]">R{weapon.weapon.affixMap ? Object.values(weapon.weapon.affixMap)[0] + 1 : 1}</span>                       
                      </div>                     
                    </div>                   
                  </div>                 
                )}                 
                
                {/* Render Artifacts */}                 
                {artifacts.length > 0 && (                   
                  <div className="flex flex-col">                     
                    <div className="flex items-center gap-[15px] mb-[10px]">                       
                      <h3 className="m-0 ml-[5px] text-[1.2rem] text-white/70 uppercase tracking-[1px]">Artifacts</h3>                       
                      {setText && <span className="text-[#8cc441] text-base font-bold bg-[#8cc441]/10 py-1 px-2.5 rounded-lg border border-[#8cc441]/30">{setText}</span>}                     
                    </div>                     
                    <div className="flex gap-[15px] flex-wrap">                       
                      {artifacts.map((art, i) => (                         
                        <div key={i} className={`relative w-[100px] h-[100px] rounded-[10px] overflow-hidden border-2 shadow-[0_5px_15px_rgba(0,0,0,0.5)] bg-[#141414]/60 ${rarityBorders[art.flat.rankLevel] || 'border-white/20'}`}>                           
                          <img className="w-full h-full object-cover scale-110" src={`https://enka.network/ui/${art.flat.icon}.png`} alt="Artifact" />                           
                          <div className="absolute bottom-0 left-0 w-full flex justify-end items-center gap-[5px] px-[5px] py-[2px] text-[0.8rem] font-bold">                             
                            <span>+{art.reliquary.level - 1}</span>                           
                          </div>                         
                        </div>                       
                      ))}                     
                    </div>                   
                  </div>                 
                )}               
              </div>             
            </div>             

            <div className="flex flex-col justify-center w-[320px] z-[5]">               
              {character.fightPropMap && (                 
                <div className="bg-[#0f0f0f]/20 backdrop-blur-sm rounded-xl p-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-[15px]">                   
                  <div className="flex justify-between items-center text-[1.1rem] font-bold border-b border-white/10 pb-2 last:border-b-0 last:pb-0">                     
                    <span>Max HP</span>                     
                    <span>{Math.round(character.fightPropMap[2000]).toLocaleString()}</span>                   
                  </div>                   
                  <div className="flex justify-between items-center text-[1.1rem] font-bold border-b border-white/10 pb-2 last:border-b-0 last:pb-0">                     
                    <span>ATK</span>                     
                    <span>{Math.round(character.fightPropMap[2001]).toLocaleString()}</span>                   
                  </div>                   
                  <div className="flex justify-between items-center text-[1.1rem] font-bold border-b border-white/10 pb-2 last:border-b-0 last:pb-0">                     
                    <span>DEF</span>                     
                    <span>{Math.round(character.fightPropMap[2002]).toLocaleString()}</span>                   
                  </div>                   
                  <div className="flex justify-between items-center text-[1.1rem] font-bold border-b border-white/10 pb-2 last:border-b-0 last:pb-0">                     
                    <span>Elemental Mastery</span>                     
                    <span>{Math.round(character.fightPropMap[28])}</span>                   
                  </div>                   
                  <div className="flex justify-between items-center text-[1.1rem] font-bold border-b border-white/10 pb-2 last:border-b-0 last:pb-0">                     
                    <span>CRIT Rate</span>                     
                    <span>{(character.fightPropMap[20] * 100).toFixed(1)}%</span>                   
                  </div>                   
                  <div className="flex justify-between items-center text-[1.1rem] font-bold border-b border-white/10 pb-2 last:border-b-0 last:pb-0">                     
                    <span>CRIT DMG</span>                     
                    <span>{(character.fightPropMap[22] * 100).toFixed(1)}%</span>                   
                  </div>                   
                  <div className="flex justify-between items-center text-[1.1rem] font-bold border-b border-white/10 pb-2 last:border-b-0 last:pb-0">                     
                    <span>Energy Recharge</span>                     
                    <span>{(character.fightPropMap[23] * 100).toFixed(1)}%</span>                   
                  </div>                   
                  {highestDmg.value > 0 && (                     
                    <div className="flex justify-between items-center text-[1.1rem] font-bold border-b border-white/10 pb-2 last:border-b-0 last:pb-0">                       
                      <span>{highestDmg.label}</span>                        
                      <span>{(highestDmg.value * 100).toFixed(1)}%</span>                     
                    </div>                   
                  )}                 
                </div>               
              )}             
            </div>           
          </div>         
        </div>       
      </div>     
    </div>   
  );
};

export default CharacterModal;