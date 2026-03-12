import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet'; 
import { usePassport } from '../../context/PassportContext'; 
import StampButton from '../passport/StampButton';
import MarkerClusterGroup from 'react-leaflet-cluster';

import './Map.css'; 

export default function Map({ parks }) {
  const { visitedParks, stampPark } = usePassport();
  
  const centerPosition = [39.8283, -98.5795];
  const defaultZoom = 4;

  return (
    <MapContainer
      center={centerPosition}
      zoom={defaultZoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MarkerClusterGroup
        chunkedLoading={true} 
        maxClusterRadius={35} 
      >
        {parks.map((park) => {
          if (!park.latitude || !park.longitude) return null;

          const lat = parseFloat(park.latitude);
          const lng = parseFloat(park.longitude);

          const isStamped = visitedParks.some((p) => p.id === park.id);

          const parkIcon = divIcon({
            className: `custom-marker ${isStamped ? 'stamped-marker' : ''}`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          });

          return (
            <Marker
              key={park.id}
              position={[lat, lng]}
              icon={parkIcon}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <span style={{ fontWeight: 'bold' }}>{park.fullName}</span>
              </Tooltip>

              <Popup>
                <strong>{park.fullName}</strong>
                <br />
                Location: {park.states}
                <br />
                <Link to={`/park/${park.parkCode}`} className="popup-details-link">
                  View Park Details &rarr;
                </Link>
                <StampButton park={park} />
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}