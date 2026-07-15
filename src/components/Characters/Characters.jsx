import React from 'react'; 
import charactersData from '../../utils/characters.json'; 
import { getTravelerElement } from '../../utils/genshinUtils.js'; 

const elementGradients = {
  Fire: "bg-gradient-to-r from-[#6b1b17] to-[#a8322c]",
  Water: "bg-gradient-to-r from-[#1a406e] to-[#3a6ba8]",
  Wind: "bg-gradient-to-r from-[#206351] to-[#43967f]",
  Electric: "bg-gradient-to-r from-[#41215e] to-[#7345a3]",
  Grass: "bg-gradient-to-r from-[#395c12] to-[#6b9e28]",
  Ice: "bg-gradient-to-r from-[#367382] to-[#68b4c7]",
  Rock: "bg-gradient-to-r from-[#705814] to-[#b5922f]",
  None: "bg-gradient-to-r from-[#404040] to-[#737373]"
};

const Characters = ({ playerData, avatarList, equipmentList, onCharacterClick }) => {   
  if (!avatarList || avatarList.length === 0) return null;   

  return (     
    <div 
      className="mt-8 p-10 w-full max-w-[600px] rounded-[10px] bg-[#141414]/40 bg-bottom right bg-cover border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-[10px] text-white" 
      style={{ backgroundImage: playerData.resolvedNamecardUrl ? `linear-gradient(to top, rgba(15, 15, 15, 1), rgba(15, 15, 15, 0.7)), url('${playerData.resolvedNamecardUrl}')` : 'var(--bg-color)' }}
    >       
      <h2 className="text-center mt-0 mb-8 text-[2rem] tracking-[2px] text-white">Characters</h2>       
      <div className="flex flex-wrap gap-6 justify-center">         
        {avatarList.map((avatar, index) => {           
          const charInfo = charactersData[avatar.avatarId];           
          if (!charInfo) return null;           
          
          const detailedCharacter = equipmentList?.find(c => c.avatarId === avatar.avatarId);           
          const iconPath = charInfo.SideIconName.replace('_Side', '');           
          const imageUrl = `https://enka.network${iconPath}`;                      
          
          const is5Star = charInfo.QualityType === "QUALITY_ORANGE" || charInfo.QualityType === "QUALITY_ORANGE_SP";           
          const borderClass = is5Star 
            ? "!border-[#e6b876] shadow-[0_0_8px_rgba(230,184,118,0.3)]" 
            : "!border-[#a882d2] shadow-[0_0_8px_rgba(168,130,210,0.3)]";           
          
          const isTraveler = charInfo.SideIconName.includes('PlayerBoy') || charInfo.SideIconName.includes('PlayerGirl');           
          const travelerSkillId = detailedCharacter?.skillDepotId || avatar.skillDepotId;           
          const trueElement = (isTraveler && travelerSkillId)              
            ? getTravelerElement(travelerSkillId)              
            : charInfo.Element;           
            
          const elementClass = elementGradients[trueElement] || elementGradients.None;           

          return (             
            <div 
              key={index} 
              className={`relative w-[110px] h-[110px] rounded-[10px] overflow-hidden transition-all duration-200 cursor-pointer border-2 border-white/20 hover:-translate-y-[5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:!border-white/50 ${borderClass} ${elementClass}`} 
              onClick={() => onCharacterClick(detailedCharacter || avatar)}
            >               
              <img src={imageUrl} alt="Character Portrait" className="w-full h-full object-cover object-[center_10%]" />               
              <div className="absolute bottom-0 left-0 w-full bg-black/70 py-1 px-0 text-center text-[0.85rem] font-bold backdrop-blur-[4px]">
                Lv. {avatar.level}
              </div>             
            </div>           
          );         
        })}       
      </div>     
    </div>   
  );
};

export default Characters;