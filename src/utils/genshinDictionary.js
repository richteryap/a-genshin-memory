import namecards from './namecards.json';
import profilepics from './profilepics.json';

export const getAvatarUrl = (profilePicObj) => {
    if (!profilePicObj) return null;

    // Look for the special 'id' first, then fallback to 'avatarId'
    const activeId = profilePicObj.id || profilePicObj.avatarId;

    // Check our local JSON for the exact match
    if (profilepics[activeId]) {
        let path = profilepics[activeId].IconPath;
        // Only strip '_Circle' for standard characters (IDs under 90000)
        // Event icons and pets ONLY exist as circles, so we leave their path alone!
        if (activeId < 90000) {
            path = path.replace('_Circle', '');
        }

        return `https://enka.network${path}`;z
    }

    return null;
};

export const getNamecardUrl = (namecardId) => {
    if (!namecardId || !namecards[namecardId]) return '';
    
    const imagePath = namecards[namecardId].Icon.replace('.jpg', '.png');
    return `https://enka.network${imagePath}`;
};