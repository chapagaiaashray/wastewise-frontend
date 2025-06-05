import { useState } from "react";

export default function Inquiry() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    interest: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: You could add form submission logic here (e.g., email service or backend)
    alert("Thanks for your inquiry! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "", interest: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-green-400">📩 Contact WasteWise</h1>
        <p className="text-gray-300 mb-8">
          Have questions about our project or want to join our mission? 
          <br></br>Fill out the form below or reach us directly at{" "}
          <a
            href="mailto:Aashray.Chapagai@sewanee.edu"
            className="text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aashray.Chapagai@sewanee.edu
          </a>
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">How can we help?</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your message..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Interested in Joining?</label>
            <select
              name="interest"
              value={form.interest}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">-- Select Role --</option>
              <option value="volunteer">Volunteer</option>
              <option value="developer">Developer</option>
              <option value="marketing">Outreach/Marketing</option>
              <option value="partnership">Partner/Collaborator</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded font-semibold"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
