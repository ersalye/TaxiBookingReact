import L from "leaflet";

export const markerIcon = new L.Icon({
  iconUrl: require("../../../images/marker.png"),
  iconRetinaUrl: require("../../../images/marker.png"),
  iconSize: [28, 28],
  iconAnchor: [13, 27],
  popupAnchor: [0, -24],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
  //iconSize: new L.Point(60, 75)
  //className: "leaflet-div-icon"
});
