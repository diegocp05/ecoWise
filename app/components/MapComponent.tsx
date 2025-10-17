'use client'; 

import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importa o CSS obrigatório do Leaflet
import L from 'leaflet';

// --- Correção do Ícone Padrão ---
// O Leaflet tem um problema conhecido com bundlers como o Webpack (usado pelo Next.js)
// onde o ícone do marcador não aparece. Esta é a correção oficial.
const defaultIcon = L.icon({
  iconUrl: '/marker-icon.png', 
  iconRetinaUrl: '/marker-icon-2x.png', // Opcional, para telas de alta resolução
  shadowUrl: '/marker-shadow.png', // Sombra do ícone
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;
// --- Fim da Correção ---

// Definindo as propriedades que nosso mapa vai receber
interface MapProps {
  coordinates: {
    lat: number;
    lon: number;
  };
  cityName: string;
}

export const MapComponent = ({ coordinates, cityName }: MapProps) => {
  const mapKey = `${coordinates.lat}-${coordinates.lon}`;

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg h-full flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-300">Localização no Mapa</h3>
      
      <MapContainer
        key={mapKey} // Força a recriação do mapa
        center={[coordinates.lat, coordinates.lon]}
        zoom={13}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
        scrollWheelZoom={false} // Desativa o zoom com a roda do mouse para não atrapalhar a rolagem da página
      >
        {/* A camada do mapa (a imagem do mapa em si) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* O marcador (pin) no mapa */}
        <Marker position={[coordinates.lat, coordinates.lon]}>
          <Tooltip>
            {cityName}
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};