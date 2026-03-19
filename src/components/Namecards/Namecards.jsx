import React from 'react';
import namecardsData from '../../utils/namecards.json'; // Adjust path if needed!
import './Namecards.css';

const Namecards = ({ namecardList }) => {
  // If they don't have any namecards showcased, render nothing
  if (!namecardList || namecardList.length === 0) return null;

  return (
    <div className="namecards-container glass-card">
      <h2>Showcased Namecards</h2>
      <div className="namecards-grid">
        {namecardList.map((id, index) => {
          // 1. Look up the namecard in our local JSON
          const cardInfo = namecardsData[id];
          if (!cardInfo) return null;

          // 2. Grab the icon path (we replace .jpg with .png just to be safe with Enka's CDN)
          const iconPath = cardInfo.Icon.replace('.jpg', '.png');
          const imageUrl = `https://enka.network${iconPath}`;

          return (
            <div key={index} className="namecard-item">
              <img src={imageUrl} alt={`Namecard ${id}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Namecards;