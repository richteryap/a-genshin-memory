import React from 'react'; 
import { ABYSS_STARS, THEATER_ACTS } from '../../utils/constants'; 

const Profiles = ({ playerData, isCurrentFavorite, toggleFavorite }) => {   
  if (!playerData) return null;   

  return (     
    <div 
      className="relative rounded-[10px] bg-[#141414]/40 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] bg-cover bg-center flex flex-row items-center justify-between gap-8 w-full max-w-[1300px] transition-all duration-300 text-[#f0f0f0]" 
      style={{ backgroundImage: playerData.resolvedNamecardUrl ? `linear-gradient(to right, rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 0.6)), url('${playerData.resolvedNamecardUrl}')` : 'var(--bg-color)' }}
    >       
      <button 
        className={`absolute top-[25px] left-[30px] bg-transparent border-none text-white/40 text-[2.2rem] cursor-pointer transition-all duration-200 z-10 p-0 leading-none hover:scale-110 hover:text-[#ffd700] ${isCurrentFavorite ? 'text-[#ffd700] drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]' : ''}`} 
        onClick={toggleFavorite} 
        title={isCurrentFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >         
        {isCurrentFavorite ? '★' : '☆'}       
      </button>       

      <div className="flex-1 text-right flex flex-col justify-center">         
        <h1 className="text-[2.5rem] m-0 mb-2 text-white">{playerData.nickname}</h1>         
        <p className="text-[#d1d5db] m-0 mb-6 text-[1.1rem]"><em>"{playerData.signature || "No signature set."}"</em></p>         
        <div className="flex flex-col">           
          <p className="m-0 my-2 text-[1.1rem] text-white"><strong>Adventure Rank:</strong> {playerData.level}</p>           
          <p className="m-0 my-2 text-[1.1rem] text-white"><strong>World Level:</strong> {playerData.worldLevel}</p>           
          <p className="m-0 my-2 text-[1.1rem] text-white"><strong>Achievements:</strong> {playerData.finishAchievementNum}</p>           
          <p className="m-0 my-2 text-[1.1rem] text-white"><strong>Maximum Friendship Count:</strong> {playerData.fetterCount}</p>         
        </div>       
      </div>       

      <img 
        className="h-[350px] flex justify-center items-center object-cover flex-none" 
        src={playerData.resolvedAvatarUrl} 
        alt={`${playerData.nickname}'s Profile`} 
        onError={(e) => { e.target.src = 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy.png' }}
      />       

      <div className="flex-1 text-left flex flex-col justify-center">         
        <h1 className="text-[2.5rem] m-0 mb-2 text-white">Endgames</h1>         
        <p className="text-transparent select-none m-0 mb-6 text-[1.1rem]">Spacer</p>         
        <div className="flex flex-col">           
          {playerData.towerFloorIndex !== undefined && (             
            <p className="m-0 my-2 text-[1.1rem] text-white flex items-center">               
              <strong>Spiral Abyss:</strong>               
              <img src={ABYSS_STARS} alt="Abyss Stars" className="w-[25px] h-[25px] align-middle mx-[6px] my-0" />               
              <strong>{playerData.towerStarIndex || 0}</strong>             
            </p>           
          )}           
          {playerData.theaterActIndex !== undefined && (             
            <p className="m-0 my-2 text-[1.1rem] text-white flex items-center">               
              <strong>Imaginarium Theater:</strong>               
              <img src={THEATER_ACTS} alt="Theater Acts" className="w-[25px] h-[25px] align-middle mx-[6px] my-0"/>               
              <strong>{playerData.theaterStarIndex}/{playerData.theaterActIndex}</strong>             
            </p>           
          )}           
          {playerData.stygianSeconds !== undefined && (             
            <p className="m-0 my-2 text-[1.1rem] text-white flex items-center">               
              <strong>Stygian Onslaught:</strong>               
              <img src={`https://enka.network/ui/UI_LeyLineChallenge_Medal_${playerData.stygianIndex}.png`} alt={`Difficulty Tier ${playerData.stygianIndex}`} className="w-[25px] h-[25px] align-middle mx-[6px] my-0"/>               
              <strong>{playerData.stygianSeconds}s</strong>             
            </p>           
          )}         
        </div>       
      </div>     
    </div>   
  );
};

export default Profiles;