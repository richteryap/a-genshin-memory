import { useState, useEffect } from 'react';
import { useHashUid } from '../../hooks/useHashUid.js';
import { useGenshinProfile } from '../../hooks/useGenshinProfile.js';
import { useFavorites } from '../../hooks/useFavorites.js';
import Profiles from '../../components/Profiles/Profiles.jsx';
import Characters from '../../components/Characters/Characters.jsx';
import Namecards from '../../components/Namecards/Namecards.jsx';
import CharacterModal from '../../components/CharacterModal/CharacterModal.jsx';

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [targetUid, setTargetUid] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [urlUid, setUrlUid] = useHashUid();

  const { playerData, loading, error } = useGenshinProfile(targetUid);
  const { 
    sortedAccounts, 
    isCurrentFavorite, 
    saveCurrentAccount, 
    toggleFavorite, 
    deleteSavedAccount 
  } = useFavorites(targetUid, playerData);

  // Auto-fetch if the URL has a UID
  useEffect(() => {
    if (urlUid && urlUid !== targetUid) {
      setTargetUid(urlUid);
      setSearchInput(urlUid);
    }
  }, [urlUid, targetUid]);

  const updateUidAndUrl = (newUid) => {
    setTargetUid(newUid);
    setUrlUid(newUid);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanInput = searchInput.trim();
    
    if (cleanInput.length > 0 && cleanInput.length <= 10) {
      updateUidAndUrl(cleanInput);
      setSearchInput("");
    } else if (cleanInput.length === 0) {
      return;
    } else {
      alert("Please enter a valid Genshin Impact UID.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col justify-center items-center gap-8 py-8 px-4 overflow-x-hidden">
      
      <form className="flex gap-[10px] w-full max-w-[500px] z-10" onSubmit={handleSearch}>
        <input 
          type="number" 
          placeholder="Enter UID..." 
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)} 
          className="flex-1 py-[15px] px-[20px] rounded-[30px] border border-white/20 bg-[#141414]/60 backdrop-blur-[10px] text-white text-[1.1rem] outline-none transition-all duration-300 ease-in-out placeholder:text-white/50 focus:border-white/80 focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
        />
        <button 
          type="submit" 
          className="py-[15px] px-[30px] rounded-[30px] border border-white/20 bg-white/10 backdrop-blur-[10px] text-white text-[1.1rem] cursor-pointer font-bold transition-all duration-300 ease-in-out hover:bg-white/20 hover:-translate-y-[2px]"
        >
          Search
        </button>
      </form>

      <div className="flex flex-col items-center gap-[15px] -mt-[10px] z-10">
        {playerData && (
          <button 
            onClick={saveCurrentAccount} 
            className="bg-[#ffd700]/20 border border-[#ffd700]/50 text-[#ffd700] py-2 px-[10px] rounded-[15px] cursor-pointer font-bold transition-all duration-200 hover:bg-[#ffd700]/40"
          >
            Save Account
          </button>
        )}
        
        <div className="flex gap-[5px] flex-wrap justify-center">
          {sortedAccounts.map((acc) => (
            <div 
              key={acc.uid} 
              className="flex items-center gap-2 bg-[#141414]/60 border border-white/20 py-[3px] pr-[9px] pl-[3px] rounded-[25px] cursor-pointer transition-all duration-200 text-white hover:bg-white/20" 
              onClick={() => updateUidAndUrl(acc.uid)}
            >
              <img 
                src={acc.avatar || 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy.png'} 
                alt="avatar" 
                className="w-[30px] h-[30px] rounded-full object-cover" 
              />
              <span style={{ color: acc.isFavorite ? '#ffd700' : 'inherit' }}>
                {acc.nickname}
              </span>
              <button 
                className="bg-transparent border-none text-white/50 text-[1.2rem] cursor-pointer p-0 leading-none transition-colors duration-200 ease-in-out flex items-center justify-center hover:text-[#ff4d4f]" 
                onClick={(e) => deleteSavedAccount(e, acc.uid)} 
                title="Remove from history"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex flex-col gap-8 w-full max-w-[1300px] mx-auto py-4">
          <div className="flex flex-row items-center justify-between gap-8 p-8 min-h-[350px] bg-[#141414]/40 glass-card">
            
            <div className="flex-1 flex flex-col justify-center items-end">
              <div className="w-[60%] h-[40px] mb-6 rounded-lg animate-pulse bg-white/10"></div>
              <div className="w-[80%] h-[20px] mb-8 rounded-lg animate-pulse bg-white/10"></div>
              <div className="w-[90%] h-[24px] mb-[12px] rounded-lg animate-pulse bg-white/10"></div>
              <div className="w-[90%] h-[24px] mb-[12px] rounded-lg animate-pulse bg-white/10"></div>
              <div className="w-[90%] h-[24px] mb-[12px] rounded-lg animate-pulse bg-white/10"></div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-[250px] h-[300px] rounded-[10px] animate-pulse bg-white/10"></div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-start">
              <div className="w-[60%] h-[40px] mb-6 rounded-lg animate-pulse bg-white/10"></div>
              <div className="w-[80%] h-[20px] mb-8 rounded-lg animate-pulse bg-white/10"></div>
              <div className="w-[90%] h-[24px] mb-[12px] rounded-lg animate-pulse bg-white/10"></div>
              <div className="w-[90%] h-[24px] mb-[12px] rounded-lg animate-pulse bg-white/10"></div>
              <div className="w-[90%] h-[24px] mb-[12px] rounded-lg animate-pulse bg-white/10"></div>
            </div>

          </div>
          
          <div className="flex flex-row gap-6 justify-center flex-wrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="w-[600px] h-[500px] rounded-[10px] animate-pulse bg-white/10 glass-card"></div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="py-8 px-16 text-[1.5rem] font-bold glass-card">Error: {error}</div>}

      {!loading && !error && playerData && (
        <>
          <section id="profiles" className="w-full flex justify-center">
            <Profiles 
              playerData={playerData} 
              isCurrentFavorite={isCurrentFavorite} 
              toggleFavorite={toggleFavorite} 
            />
          </section>
          
          <div className="flex flex-row gap-4">
            <section id="characters">
              <Characters 
                playerData={playerData} 
                avatarList={playerData.showAvatarInfoList} 
                equipmentList={playerData.equipmentList} 
                onCharacterClick={setSelectedCharacter} 
              />
            </section>
            
            <section id="namecards">
              <Namecards 
                playerData={playerData} 
                namecardList={playerData.showNameCardIdList} 
              />
            </section>
          </div>

          {selectedCharacter && (
            <CharacterModal 
              character={selectedCharacter} 
              onClose={() => setSelectedCharacter(null)} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;