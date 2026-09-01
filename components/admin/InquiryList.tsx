"use client";

import { useState } from "react";
import { updateInquiryStatusAction } from "@/app/admin/(dashboard)/inquiries/actions";

type InquiryRow = {
  id: string;
  name: string;
  contact: string;
  type: string;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

export default function InquiryList({ initialInquiries }: { initialInquiries: InquiryRow[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "closed">("all");

  async function handleStatusChange(id: string, status: InquiryRow["status"]) {
    setInquiries(inquiries.map((i) => (i.id === id ? { ...i, status } : i)));
    await updateInquiryStatusAction(id, status);
  }

  const visible = inquiries.filter((i) => filter === "all" || i.status === filter);

  return (
    <div className="inquiry-list">
      <div className="filter-tabs">
        {(["all", "new", "contacted", "closed"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={filter === f ? "filter-tab active" : "filter-tab"}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="empty-state">No inquiries here.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Message</th>
              <th>Received</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((inq) => (
              <tr key={inq.id}>
                <td>{inq.name}</td>
                <td>{inq.contact}</td>
                <td>{inq.type}</td>
                <td className="message-cell">{inq.message || "—"}</td>
                <td>{new Date(inq.created_at).toLocaleDateString()}</td>
                <td>
                  <select
                    value={inq.status}
                    onChange={(e) =>
                      handleStatusChange(inq.id, e.target.value as InquiryRow["status"])
                    }
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
