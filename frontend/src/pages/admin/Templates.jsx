import { useEffect, useState } from "react";

import CreateTemplateModal from "../../components/admin/CreateTemplateModal";
import TemplatesList from "../../components/admin/TemplateList";

import { getAllTemplates } from "../../api/templates.api";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await getAllTemplates();
        setTemplates(res.data || []);
      } catch (err) {
        console.error("Failed to fetch templates", err);
        setTemplates([]);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateCreated = (newTemplate) => {
    setTemplates((prev) => [...prev, newTemplate]);
    setShowModal(false);
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Templates</h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
          >
            + Create Template
          </button>
        </div>

        <TemplatesList templates={templates} />
      </div>

      {showModal && (
        <CreateTemplateModal
          onClose={() => setShowModal(false)}
          onTemplateCreated={handleTemplateCreated}
        />
      )}
    </>
  );
};

export default Templates;
