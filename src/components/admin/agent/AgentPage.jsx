import { useEffect, useState } from "react";

import AgentForm from "./AgentForm";
import Axios from "../../../utils/Axios";

const AgentPage = () => {
  const [agents, setAgents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const fetchAgents = async () => {
    const res = await Axios.get("/agent");
    setAgents(res.data);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleEdit = (agent) => {
    setSelectedAgent(agent);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this agent?")) return;

    await Axios.delete(`/agent/${id}`);
    fetchAgents();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Agents</h1>

        <button
          onClick={() => {
            setSelectedAgent(null);
            setShowForm(true);
          }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Agent
        </button>
      </div>

      {/* Agent List */}
      <div className="space-y-2">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-medium">{agent.name}</p>
              <p className="text-sm text-gray-500">
                {agent.goal} | {agent.tone}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(agent)}
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(agent.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <AgentForm
          agent={selectedAgent}
          onClose={() => {
            setShowForm(false);
            fetchAgents();
          }}
        />
      )}
    </div>
  );
};

export default AgentPage;
