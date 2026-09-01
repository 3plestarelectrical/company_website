import { query } from "@/lib/db";
import InquiryList from "@/components/admin/InquiryList";

type InquiryRow = {
  id: string;
  name: string;
  contact: string;
  type: string;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

export default async function AdminInquiriesPage() {
  const inquiries = await query<InquiryRow>(
    `select * from inquiries order by
       case status when 'new' then 0 when 'contacted' then 1 else 2 end,
       created_at desc`
  );

  return (
    <div className="admin-inquiries">
      <h1>Inquiries</h1>
      <InquiryList initialInquiries={inquiries} />
    </div>
  );
}
