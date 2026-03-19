import { useState, useEffect } from 'react';

export const useFavorites = (targetUid, playerData) => {
  const [savedAccounts, setSavedAccounts] = useState([]);

  // Initialize from local storage on first load
  useEffect(() => {
    const saved = localStorage.getItem('genshinFavorites');
    if (saved) {
      setSavedAccounts(JSON.parse(saved));
    }
  }, []);

  const saveCurrentAccount = () => {
    if (!playerData) return;
    
    const newSave = {
      uid: targetUid,
      nickname: playerData.nickname,
      avatar: playerData.resolvedAvatarUrl,
      isFavorite: false 
    };

    const isAlreadySaved = savedAccounts.some(acc => acc.uid === targetUid);
    
    if (!isAlreadySaved) {
      const updatedSaves = [...savedAccounts, newSave];
      setSavedAccounts(updatedSaves);
      localStorage.setItem('genshinFavorites', JSON.stringify(updatedSaves));
    }
  };

  const toggleFavorite = () => {
    if (!playerData) return;
    
    const existingAccIndex = savedAccounts.findIndex(acc => acc.uid === targetUid);
    let updatedSaves;

    if (existingAccIndex !== -1) {
      updatedSaves = [...savedAccounts];
      updatedSaves[existingAccIndex].isFavorite = !updatedSaves[existingAccIndex].isFavorite;
    } else {
      const newSave = {
        uid: targetUid,
        nickname: playerData.nickname,
        avatar: playerData.resolvedAvatarUrl,
        isFavorite: true
      };
      updatedSaves = [...savedAccounts, newSave];
    }

    setSavedAccounts(updatedSaves);
    localStorage.setItem('genshinFavorites', JSON.stringify(updatedSaves));
  };

  const deleteSavedAccount = (e, uidToDelete) => {
    e.stopPropagation(); 
    const updatedSaves = savedAccounts.filter(acc => acc.uid !== uidToDelete);
    setSavedAccounts(updatedSaves);
    localStorage.setItem('genshinFavorites', JSON.stringify(updatedSaves));
  };

  const isCurrentFavorite = savedAccounts.find(acc => acc.uid === targetUid)?.isFavorite || false;

  // Sort the accounts before returning them to the UI
  const sortedAccounts = [...savedAccounts].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  return {
    sortedAccounts,
    isCurrentFavorite,
    saveCurrentAccount,
    toggleFavorite,
    deleteSavedAccount
  };
};