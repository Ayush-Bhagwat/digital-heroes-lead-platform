import { X } from "lucide-react";

export default function LeadDetailsModal({ lead, onClose }) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[500px] max-w-[95%]">

        <div className="flex justify-between items-center border-b p-5">
          <h2 className="text-2xl font-bold">Lead Details</h2>

          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-lg"
          >
            <X />
          </button>
        </div>

        <div className="p-6 space-y-4">

          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-semibold">{lead.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p>{lead.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p>{lead.phone}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Company</p>
            <p>{lead.company}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {lead.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Notes</p>
            <p>{lead.notes || "No notes available"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Created</p>
            <p>{new Date(lead.createdAt).toLocaleDateString()}</p>
          </div>

        </div>
      </div>
    </div>
  );
}