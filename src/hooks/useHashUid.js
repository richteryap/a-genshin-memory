import { useState } from 'react';

export const useHashUid = () => {
  const [uid, setUid] = useState(() => {
    const match = window.location.hash.match(/[?&]uid=([^&]+)/);
    return match ? match[1] : "";
  });

  const setHashUid = (newUid) => {
    setUid(newUid);
    const currentHash = window.location.hash;
    
    const baseHash = currentHash.split('?')[0] || '#profile';

    if (newUid) {
      window.history.replaceState(null, null, `${baseHash}?uid=${newUid}`);
    }
  };

  return [uid, setHashUid];
};