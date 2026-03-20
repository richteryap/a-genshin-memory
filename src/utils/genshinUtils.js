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