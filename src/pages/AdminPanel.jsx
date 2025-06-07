import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [bins, setBins] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [edited, setEdited] = useState({});
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    fetch(`${API_BASE}/api/bins`)
      .then((res) => res.json())
      .then((data) => setBins(data));
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEdited({ ...bins[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const response = await fetch(`${API_BASE}/api/bins/${edited.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...edited,
        fillLevel: parseFloat(edited.fillLevel),
      }),
    });

    if (response.ok) {
      const updated = [...bins];
      updated[editIndex] = edited;
      setBins(updated);
      setEditIndex(null);
    } else {
      alert("Failed to update bin.");
    }
  };

  return (
    <div className="p-6 text-black bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        🛠️ Admin Panel — Edit Smart Bins
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg text-sm sm:text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Fill Level (%)</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bins.map((bin, i) => (
              <tr key={bin.id} className="text-center">
                <td className="border px-4 py-2">
                  {editIndex === i ? (
                    <input
                      name="locationName"
                      value={edited.locationName}
                      onChange={handleChange}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    bin.locationName
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIndex === i ? (
                    <input
                      name="fillLevel"
                      value={edited.fillLevel}
                      onChange={handleChange}
                      className="p-1 border rounded w-full"
                      type="number"
                      step="0.1"
                    />
                  ) : (
                    `${bin.fillLevel.toFixed(1)}%`
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIndex === i ? (
                    <select
                      name="type"
                      value={edited.type}
                      onChange={handleChange}
                      className="p-1 border rounded w-full"
                    >
                      <option>Recyclable</option>
                      <option>Organic</option>
                      <option>Mixed</option>
                    </select>
                  ) : (
                    bin.type
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIndex === i ? (
                    <select
                      name="status"
                      value={edited.status}
                      onChange={handleChange}
                      className="p-1 border rounded w-full"
                    >
                      <option>OK</option>
                      <option>FULL</option>
                      <option>OVERFLOW</option>
                    </select>
                  ) : (
                    bin.status
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIndex === i ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(i)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
