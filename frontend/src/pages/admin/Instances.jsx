import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../../components/Table";
import { getAllInstances } from "../../api/instances.api";
import InstanceModal from "../../components/admin/InstanceModal";

const Instances = () => {
  const navigate = useNavigate();
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchInstances = async () => {
    try {
      const res = await getAllInstances();
      setInstances(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstances();
  }, []);

  const columns = [
    { header: "#", render: (_, index) => index + 1 },
    { header: "Name", key: "name" },
    {
      header: "Template",
      render: (row) => row.templateId?.name || "—",
    },
    {
      header: "Assigned User",
      render: (row) => row.assignedUserId?.name || "—",
    },
    {
      header: "Created At",
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Instances</h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
          >
            + Create Instance
          </button>
        </div>

        {loading ? (
          <p>Loading instances...</p>
        ) : (
          <Table
            columns={columns}
            data={instances}
            emptyMessage="No instances found."
            onRowClick={(row) =>
              navigate(`/admin/instances/${row._id}`)
            }
          />
        )}
      </div>

      {showModal && (
        <InstanceModal
          onClose={() => setShowModal(false)}
          onInstanceCreated={fetchInstances}
        />
      )}
    </>
  );
};

export default Instances;
