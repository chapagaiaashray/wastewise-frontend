import { useEffect, useState } from "react";

export default function BinList() {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/bins")
      .then(res => res.json())
      .then(data => setBins(data))
      .catch(err => console.error("Failed to fetch bins:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Smart Bins in Sewanee, TN</h1>
      <div className="space-y-4">
        {bins.map(bin => (
          <div
            key={bin.id}
            className="p-4 rounded-xl shadow bg-white text-gray-800"
          >
            <h2 className="text-xl font-semibold">{bin.locationName}</h2>
            <p>Type: {bin.type}</p>
            <p>Fill Level: {bin.fillLevel}%</p>
            <p>Status: <span className={
              bin.status === "FULL"
                ? "text-red-600 font-semibold"
                : "text-green-600 font-semibold"
            }>
              {bin.status}
            </span></p>
            <p>Coordinates: ({bin.latitude}, {bin.longitude})</p>
          </div>
        ))}
      </div>
    </div>
  );
}
