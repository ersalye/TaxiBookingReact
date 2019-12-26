import L from "leaflet";

export const taxiIcon = new L.Icon({
  iconUrl: require("../../../images/2.png"),
  iconRetinaUrl: require("../../../images/2.png"),
  iconSize: [48, 78],
  iconAnchor: [13, 27],
  popupAnchor: [10, 5],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
  //iconSize: new L.Point(60, 75)
  //className: "leaflet-div-icon"
});
