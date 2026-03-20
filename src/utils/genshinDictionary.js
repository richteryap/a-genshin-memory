import namecards from './namecards.json';
import profilepics from './profilepics.json';
import characters from './characters.json';

export const getAvatarUrl = (profilePicObj) => {
    if (!profilePicObj) return null;

    // Check our local JSON for the exact match
    if (profilePicObj.id && profilepics[profilePicObj.id]) {
        let path = profilepics[profilePicObj.id].IconPath;
        // Only strip '_Circle' for standard characters (IDs under 90000)
        // Event icons and pets ONLY exist as circles, so we leave their path alone!
        if (profilePicObj.id < 90000) {
            path = path.replace('_Circle', '');
        }

        return `https://enka.network${path}`;z
    }

    if (profilePicObj.avatarId && characters[profilePicObj.avatarId]) {
        const sidePath = characters[profilePicObj.avatarId].SideIconName;
        
        // Delete "_Side" to get the high-res square version!
        const cleanPath = sidePath.replace('_Side', '');
        return `https://enka.network${cleanPath}`;
    }

    return null;
};

export const getNamecardUrl = (namecardId) => {
    if (!namecardId || !namecards[namecardId]) return '';
    
    const imagePath = namecards[namecardId].Icon.replace('.jpg', '.png');
    return `https://enka.network${imagePath}`;
};

export const getSplashArtUrl = (charInfo) => {
    if (!charInfo) return null;

    // Grab their internal name from the SideIcon string
    const internalName = charInfo.SideIconName
        .replace('/ui/UI_AvatarIcon_Side_', '')
        .replace('.png', '');

    // The Traveler is the only character without a Gacha splash art
    if (internalName === 'PlayerBoy' || internalName === 'PlayerGirl') {
        return `https://enka.network/ui/UI_AvatarIcon_${internalName}.png`; 
    }

    // Return the massive high-res splash art!
    return `https://enka.network/ui/UI_Gacha_AvatarImg_${internalName}.png`;
};