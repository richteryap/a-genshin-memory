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