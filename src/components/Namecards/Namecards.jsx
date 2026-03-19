import React from 'react';
import namecardsData from '../../utils/namecards.json';
import './Namecards.css';

const Namecards = ({ playerData, namecardList }) => {
  if (!namecardList || namecardList.length === 0) return null;

  return (
    <div className="namecards-container glass-card" style={{ backgroundImage: playerData.resolvedNamecardUrl ? `linear-gradient(to top, rgba(15, 15, 15, 1), rgba(15, 15, 15, 0.6)), url('${playerData.resolvedNamecardUrl}')` : 'var(--bg-color)' }}>
      <h2>Namecards</h2>
      <div className="namecards-grid">
        {namecardList.map((id, index) => {
          const cardInfo = namecardsData[id];
          if (!cardInfo) return null;

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