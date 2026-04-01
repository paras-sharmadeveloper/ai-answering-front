import { useEffect, useState } from "react";
import Axios from "../../utils/Axios";

const Company = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    tone: "friendly",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch existing company
  const fetchCompany = async () => {
    try {
      const res = await Axios.get("/company");

      if (res.data) {
        setForm({
          name: res.data.name || "",
          description: res.data.description || "",
          tone: res.data.tone || "friendly",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await Axios.post("/company", form);

      alert("Company saved successfully!");
    } catch (error) {
      console.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Company Setup</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-sm mb-1">Company Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter company name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Describe your business"
          />
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm mb-1">AI Tone</label>
          <select
            name="tone"
            value={form.tone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Saving..." : "Save Company"}
        </button>
      </form>
    </div>
  );
};

export default Company;
