import { useEffect, useState } from "react";
import Axios from "../../../utils/Axios";
import toast from "react-hot-toast";
const AgentForm = ({ agent, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    goal: "lead",
    tone: "friendly",
    questions: [""],
    faqs: [""],
  });

  useEffect(() => {
    if (agent) {
      setForm(agent);
    }
  }, [agent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (agent) {
      const res = await Axios.put(`/agent/${agent.id}`, form);
      toast.success("Agent updated successfully!");
    } else {
      await Axios.post("/agent", form);
      toast.success("Agent added successfully!");
    }

    onClose();
  };
  const handleArrayChange = (index, field, value) => {
    const updated = [...form[field]];
    updated[index] = value;

    setForm({
      ...form,
      [field]: updated,
    });
  };

  const addField = (field) => {
    setForm({
      ...form,
      [field]: [...form[field], ""],
    });
  };

  const removeField = (index, field) => {
    const updated = [...form[field]];
    updated.splice(index, 1);

    setForm({
      ...form,
      [field]: updated,
    });
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[500px]">
        <h2 className="text-lg mb-4">{agent ? "Edit Agent" : "Add Agent"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Agent Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <select
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="lead">Lead</option>
            <option value="support">Support</option>
            <option value="complaint">Complaint</option>
          </select>

          <select
            value={form.tone}
            onChange={(e) => setForm({ ...form, tone: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
          </select>

          <div>
            <label className="block mb-2">Questions</label>

            {form.questions.map((q, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={q}
                  onChange={(e) =>
                    handleArrayChange(i, "questions", e.target.value)
                  }
                  className="flex-1 border p-2 rounded"
                  placeholder="Enter question"
                />
                <button
                  type="button"
                  onClick={() => removeField(i, "questions")}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  X
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addField("questions")}
              className="text-blue-600"
            >
              + Add Question
            </button>
          </div>

          <div>
            <label className="block mb-2">FAQs</label>

            {form.faqs.map((f, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={f}
                  onChange={(e) => handleArrayChange(i, "faqs", e.target.value)}
                  className="flex-1 border p-2 rounded"
                  placeholder="Enter FAQ"
                />
                <button
                  type="button"
                  onClick={() => removeField(i, "faqs")}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  X
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addField("faqs")}
              className="text-blue-600"
            >
              + Add FAQ
            </button>
          </div>

          <button className="bg-black text-white w-full py-2 rounded">
            Save
          </button>
        </form>

        <button onClick={onClose} className="mt-3 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default AgentForm;
