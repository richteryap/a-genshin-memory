import { useState, useEffect } from 'react';
import { getAvatarUrl, getNamecardUrl } from '../utils/genshinDictionary';

export const useGenshinProfile = (uid) => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        // fetch the player profile
        const fetchUrl = import.meta.env.DEV 
          ? `/api/enka/uid/${uid}`               // Local dev: Hit Vite's local proxy!
          : `/api/getGenshinData?uid=${uid}`;    // Production: Hit Vercel's Serverless Function!

        const response = await fetch(fetchUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile. Is the UID correct?');
        }
        
        const data = await response.json();
        const profile = data.playerInfo;

        // Use local dictionaries
        profile.resolvedAvatarUrl = getAvatarUrl(profile.profilePicture);
        profile.resolvedNamecardUrl = getNamecardUrl(profile.nameCardId);

        setPlayerData({...profile, equipmentList: data.avatarInfoList});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [uid]);

  return { playerData, loading, error };
};