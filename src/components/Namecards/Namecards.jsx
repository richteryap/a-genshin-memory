import React from 'react'; 
import namecardsData from '../../utils/namecards.json'; 

const Namecards = ({ playerData, namecardList }) => {   
  if (!namecardList || namecardList.length === 0) return null;   

  return (     
    <div 
      className="mt-8 p-10 px-6 w-full max-w-[800px] rounded-[10px] bg-[#141414]/40 bg-bottom bg-cover border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-[10px] text-white" 
      style={{ backgroundImage: playerData.resolvedNamecardUrl ? `linear-gradient(to top, rgba(15, 15, 15, 1), rgba(15, 15, 15, 0.6)), url('${playerData.resolvedNamecardUrl}')` : 'var(--bg-color)' }}
    >       
      <h2 className="text-center mt-0 mb-8 text-[2rem] tracking-[2px] text-white">Namecards</h2>       
      <div className="flex flex-wrap gap-4 justify-center">         
        {namecardList.map((id, index) => {           
          const cardInfo = namecardsData[id];           
          if (!cardInfo) return null;           
          const iconPath = cardInfo.Icon.replace('.jpg', '.png');           
          const imageUrl = `https://enka.network${iconPath}`;           
          
          return (             
            <div key={index} className="w-[172px] h-auto rounded-md overflow-hidden transition-all duration-200 cursor-pointer border border-white/20 hover:-translate-y-[5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:border-white/60">               
              <img src={imageUrl} alt={`Namecard ${id}`} className="w-full h-full block object-cover" />             
            </div>           
          );         
        })}       
      </div>     
    </div>   
  );
};

export default Namecards;