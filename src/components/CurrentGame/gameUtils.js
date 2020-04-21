export const getCardDisplayName = (cardType) => {
  switch (cardType) {
    case "VictoryPoint":
      return "Victory Point";
    case "YearOfPlenty":
      return "Year Of Plenty";
    case "RoadBuilding":
      return "Road Building";
    default:
      return cardType;
  }
};
