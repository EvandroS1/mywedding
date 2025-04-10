import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ícone personalizado para o marcador
const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png", // Substitua pelo ícone desejado
  iconSize: [32, 32],
});

const MapComponent = () => {
  const position: [number, number] = [-23.4365, -46.4733]; // Coordenadas do endereço

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "200px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={customIcon}>
        <Popup>Rancho Papaloosa</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
