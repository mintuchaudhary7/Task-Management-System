const TemplatesList = ({ templates }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-text-dark">
        All Templates
      </h2>

      {templates.length === 0 ? (
        <div className="bg-secondary border border-dashed border-border rounded-2xl p-6 text-center text-text-muted">
          No templates found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <div
              key={template._id}
              className="bg-card-bg p-6 rounded-2xl shadow-md border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-text-dark">
                  {template.name}
                </h3>
                {template.description && (
                  <p className="text-sm text-text-muted mt-1">
                    {template.description}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-border my-4" />

              {/* Tasks */}
              <div>
                <p className="text-sm font-medium text-text-dark mb-2">
                  Tasks ({template.tasks?.length || 0})
                </p>

                <ol className="space-y-2 text-sm">
                  {[...(template.tasks || [])]
                    .sort((a, b) => a.order - b.order)
                    .map((task) => (
                      <li
                        key={task._id}
                        className="flex items-center gap-3 bg-secondary px-3 py-2 rounded-lg hover:bg-card-hover transition-colors"
                      >
                        <span className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-primary bg-primary/10 rounded-full">
                          {task.order}
                        </span>
                        <span className="text-text-dark">{task.name}</span>
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesList;
