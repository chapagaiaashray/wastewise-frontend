import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Heatmap({ bins }) {
  const center = [35.205, -85.92]; // Default map center (Sewanee)

  return (
    <div className="h-[75vh] rounded-xl overflow-hidden">
      <MapContainer center={center} zoom={15} scrollWheelZoom className="h-full w-full z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {bins.map((bin) => {
          let color = "#4ade80"; // green

          if (bin.fillLevel >= 95) {
            color = "#ef4444"; // red
          } else if (bin.fillLevel >= 85) {
            color = "#facc15"; // yellow
          }

          return (
            <CircleMarker
              key={bin.id}
              center={[bin.latitude, bin.longitude]}
              radius={12}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.8 }}
            >
              <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent>
                <div className="text-xs font-semibold">
                  {bin.locationName}<br />
                  {bin.fillLevel.toFixed(1)}%
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
