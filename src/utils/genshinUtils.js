export const getTravelerElement = (skillDepotId) => {
  const depotMap = {
    504: "Wind", 704: "Wind",
    506: "Rock", 706: "Rock", 
    507: "Electric", 707: "Electric", 
    508: "Grass", 708: "Grass", 
    503: "Water", 703: "Water",
    502: "Fire", 702: "Fire",
  };
  return depotMap[skillDepotId] || "None";
};

export const getStatName = (propId) => {
  const map = {
    FIGHT_PROP_HP: "HP", FIGHT_PROP_HP_PERCENT: "HP%",
    FIGHT_PROP_ATTACK: "ATK", FIGHT_PROP_ATTACK_PERCENT: "ATK%",
    FIGHT_PROP_DEFENSE: "DEF", FIGHT_PROP_DEFENSE_PERCENT: "DEF%",
    FIGHT_PROP_CRITICAL: "CRIT Rate", FIGHT_PROP_CRITICAL_HURT: "CRIT DMG",
    FIGHT_PROP_CHARGE_EFFICIENCY: "Energy Recharge", FIGHT_PROP_ELEMENT_MASTERY: "Elemental Mastery",
    FIGHT_PROP_HEAL_ADD: "Healing Bonus", FIGHT_PROP_PHYSICAL_ADD_HURT: "Physical DMG",
    FIGHT_PROP_FIRE_ADD_HURT: "Pyro DMG", FIGHT_PROP_ELEC_ADD_HURT: "Electro DMG",
    FIGHT_PROP_WATER_ADD_HURT: "Hydro DMG", FIGHT_PROP_GRASS_ADD_HURT: "Dendro DMG",
    FIGHT_PROP_WIND_ADD_HURT: "Anemo DMG", FIGHT_PROP_ROCK_ADD_HURT: "Geo DMG", FIGHT_PROP_ICE_ADD_HURT: "Cryo DMG"
  };
  return map[propId] || propId;
};

export const formatStat = (propId, value) => {
  if (!propId) return value;
  if (propId.includes("PERCENT") || propId.includes("CRITICAL") || propId.includes("CHARGE_EFFICIENCY") || propId.includes("ADD_HURT")) {
    return `${value}%`;
  }
  return Math.round(value).toLocaleString(); // Adds commas to big numbers!
};