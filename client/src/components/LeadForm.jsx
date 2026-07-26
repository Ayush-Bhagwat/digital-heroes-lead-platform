import { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "New",
};

export default function LeadForm({
  onSubmit,
  editingLead,
  cancelEdit,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingLead) {
      setForm({
        ...editingLead,
      });
    } else {
      setForm(initialState);
    }
  }, [editingLead]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);

    if (!editingLead) {
      setForm(initialState);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-slate-800">
          {editingLead ? "✏ Edit Lead" : "➕ Add New Lead"}
        </h2>

        {editingLead && (
          <button
            onClick={cancelEdit}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        )}

      </div>

      <form
        onSubmit={submit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Proposal</option>
          <option>Won</option>
          <option>Lost</option>
        </select>

        <div className="flex items-end">

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition"
          >
            {editingLead ? "Update Lead" : "Add Lead"}
          </button>

        </div>

      </form>

    </div>
  );
}