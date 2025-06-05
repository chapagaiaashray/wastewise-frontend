import { useState } from "react";
import useBins from "../hooks/useBins";
import useBinUpdates from "../hooks/useBinUpdates";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Heatmap from "../components/Heatmap"; 

export default function Dashboard() {
  const { bins, loading, error } = useBins();
  const [liveBins, setLiveBins] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showHeatmap, setShowHeatmap] = useState(false); 

  useBinUpdates((updatedBin) => {
    setLiveBins((prev) => {
      const others = prev.filter((bin) => bin.id !== updatedBin.id);
      return [...others, updatedBin];
    });
  });

  const combinedBins = [...bins, ...liveBins].reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  let filteredBins = Object.values(combinedBins);

  // 🔍 Apply filter
  filteredBins = filteredBins.filter((bin) => {
    if (filter === "ok") return bin.fillLevel < 85;
    if (filter === "full") return bin.fillLevel >= 85;
    return true;
  });

  // 🔍 Apply search
  filteredBins = filteredBins.filter((bin) =>
    bin.locationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ⬆⬇ Sort by fill level
  filteredBins.sort((a, b) =>
    sortOrder === "asc"
      ? a.fillLevel - b.fillLevel
      : b.fillLevel - a.fillLevel
  );

  if (loading) return <p className="text-white p-4">Loading bins...</p>;
  if (error) return <p className="text-red-500 p-4">Failed to load bins 😓</p>;

  return (
    <div className="p-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-white">♻️ Smart Bins in Sewanee</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search location..."
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600"
          >
            <option value="all">Show All Bins</option>
            <option value="ok">Only OK</option>
            <option value="full">Only FULL/OVERFLOW</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600"
          >
            <option value="desc">Sort: Fill % ↓</option>
            <option value="asc">Sort: Fill % ↑</option>
          </select>

          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showHeatmap ? "🔁 Switch to Grid View" : "🌍 View as Heatmap"}
          </button>
        </div>
      </div>

      {/* Conditional View */}
      {showHeatmap ? (
        <Heatmap bins={filteredBins} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBins.map((bin) => {
            let icon = "🟢";
            let status = "OK";
            let color = "#4ade80";

            if (bin.fillLevel >= 95) {
              icon = "🔴";
              status = "OVERFLOW";
              color = "#ef4444";
            } else if (bin.fillLevel >= 85) {
              icon = "🟡";
              status = "FULL";
              color = "#facc15";
            }

            return (
              <div
                key={bin.id}
                className="bg-gray-800 p-5 rounded-xl shadow-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20">
                    <CircularProgressbar
                      value={bin.fillLevel}
                      text={`${bin.fillLevel.toFixed(0)}%`}
                      styles={buildStyles({
                        pathColor: color,
                        textColor: "#fff",
                        trailColor: "#374151",
                        textSize: "16px",
                      })}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{bin.locationName}</h2>
                    <p>Type: {bin.type}</p>
                    <p>Status: {icon} {status}</p>
                    <p>Coords: ({bin.latitude}, {bin.longitude})</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
