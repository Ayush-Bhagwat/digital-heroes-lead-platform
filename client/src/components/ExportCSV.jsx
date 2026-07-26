export default function ExportCSV({ leads }) {
  const exportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Company",
      "Status",
    ];

    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.status,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "leads.csv";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCSV}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold"
    >
      📥 Export CSV
    </button>
  );
}