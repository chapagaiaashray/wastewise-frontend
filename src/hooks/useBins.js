import { useState, useEffect } from "react";

export default function useBins() {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBins() {
      try {
        const res = await fetch("https://wastewise-backend-uf1h.onrender.com/api/bins");
        if (!res.ok) throw new Error("Failed to fetch bins");
        const data = await res.json();
        setBins(data);
      } catch (err) {
        console.error("[Bins API] ❌", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBins();
  }, []);

  return { bins, loading, error };
}
