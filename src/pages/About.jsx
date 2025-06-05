export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-16 flex items-center justify-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-green-400">
          🌱 About WasteWise
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-300">
          <strong>WasteWise</strong> is a smart waste monitoring system developed to serve the campus of Sewanee. 
          It tracks real-time fill levels of bins spread across different campus locations, ensuring timely collection 
          and efficient waste management. Our goal is to make sustainability smarter, cleaner, and more data-driven.
        </p>
        <div className="mt-10">
          <p className="text-sm text-gray-400">
            Built with 💚 by Aashray Chapagai (student of Sewanee) — because a cleaner future starts with smarter systems.
          </p>
        </div>
      </div>
    </div>
  );
}
