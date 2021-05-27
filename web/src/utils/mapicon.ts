import Leaflet from 'leaflet';

import  mapMarkerImg from 'C:/projetos/nfl3/web/src/images/map-marker.svg';

import 'leaflet/dist/leaflet.css';

const mapIcon = Leaflet.icon({

  iconUrl: mapMarkerImg,
  iconSize:[58,68],
  iconAnchor:[29,68],
  popupAnchor:[0, -60]
});

export default mapIcon;