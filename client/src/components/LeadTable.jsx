import { useState } from "react";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";

export default function LeadTable({ leads, onDelete, onEdit }) {
  const [deleteLeadId, setDeleteLeadId] = useState(null);

  const badgeColor = (status) => {
    switch (status) {
      case "Won":
        return "bg-green-100 text-green-700";
      case "Lost":
        return "bg-red-100 text-red-700";
      case "Contacted":
        return "bg-blue-100 text-blue-700";
      case "Qualified":
        return "bg-purple-100 text-purple-700";
      case "Proposal":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">Company</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    No Leads Found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="p-4 font-medium">{lead.name}</td>
                    <td className="p-4">{lead.email}</td>
                    <td className="p-4">{lead.phone}</td>
                    <td className="p-4">{lead.company}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => onEdit(lead)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => setDeleteLeadId(lead._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {deleteLeadId && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl shadow-xl p-8 w-[400px]">

            <div className="flex justify-center mb-4">
              <AlertTriangle
                size={55}
                className="text-red-500"
              />
            </div>

            <h2 className="text-2xl font-bold text-center">
              Delete Lead?
            </h2>

            <p className="text-gray-500 text-center mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4 mt-8">

              <button
                onClick={() => setDeleteLeadId(null)}
                className="px-5 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDelete(deleteLeadId);
                  setDeleteLeadId(null);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}