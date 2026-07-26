import ExportCSV from "../components/ExportCSV";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import LeadAnalytics from "../components/LeadAnalytics";
import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";

import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../services/leadService";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [editingLead, setEditingLead] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch {
      toast.error("Failed to load leads");
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleCreate = async (lead) => {
    try {
      if (editingLead) {
        await updateLead(editingLead._id, lead);
        toast.success("Lead Updated");
        setEditingLead(null);
      } else {
        await createLead(lead);
        toast.success("Lead Added");
      }

      loadLeads();
    } catch {
      toast.error("Operation Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLead(id);
      toast.success("Lead Deleted");
      loadLeads();
    } catch {
      toast.error("Delete Failed");
    }
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const wonLeads = leads.filter((l) => l.status === "Won").length;
  const lostLeads = leads.filter((l) => l.status === "Lost").length;

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar logout={logout} />

      <main className="flex-1 p-8 overflow-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-1">
              Welcome back 👋
            </p>
          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Total Leads</p>
            <h2 className="text-4xl font-bold mt-2">
              {totalLeads}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">New</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {newLeads}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Won</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {wonLeads}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Lost</p>
            <h2 className="text-4xl font-bold text-red-600 mt-2">
              {lostLeads}
            </h2>
          </div>

        </div>

        <LeadAnalytics leads={leads} />

        {/* Search + Filter + Export */}

        <div className="bg-white rounded-xl shadow p-5 mb-8 flex flex-col lg:flex-row gap-4 items-center">

          <input
            type="text"
            placeholder="🔍 Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 w-full border rounded-lg p-3"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg p-3 w-full lg:w-52"
          >
            <option>All</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Proposal</option>
            <option>Won</option>
            <option>Lost</option>
          </select>

          <ExportCSV leads={filteredLeads} />

        </div>

        <LeadForm
          onSubmit={handleCreate}
          editingLead={editingLead}
          cancelEdit={() => setEditingLead(null)}
        />

        <LeadTable
          leads={filteredLeads}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

      </main>

    </div>
  );
}